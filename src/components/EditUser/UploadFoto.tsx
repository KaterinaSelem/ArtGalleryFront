import { useRef, useState } from "react";
import './styles.css';
import { EditLabel, StyledButton, UploadButtonsWrap, UploadWrap } from "./styles";

const hostUrl = '/api/users/updateUserImage';  

const UploadFoto: React.FC = () => {
  const filePicker = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<{ fileName: string, filePath: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('File selected:', file);

    if (file) {
      setSelectedFile(file);
      setError(null); 
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('No file selected');
      console.error('No file selected');
      return;
    }
  
    const token = localStorage.getItem('accessToken'); 
  
    if (!token) {
      setError('You must be logged in to upload a photo.');
      console.error('No token found');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      setIsUploading(true);  
      const response = await fetch(hostUrl, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setUploading(data);  
        console.log('Upload successful:', data);
      } else {
        const text = await response.text();
        if (text === 'User updated successfully') {
          setUploading({ fileName: selectedFile.name, filePath: 'path/to/uploaded/file' });
          console.log('Upload successful: User updated successfully');
        } else {
          throw new Error(`Unexpected response format: ${text}`);
        }
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setError('File upload failed, please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  return (
    <UploadWrap>
      <EditLabel>Upload Profile Photo</EditLabel>
      <UploadButtonsWrap>
        <StyledButton onClick={handlePick}>Select Photo</StyledButton>
        <input
          className="hidden"
          type="file"
          ref={filePicker}
          onChange={handleFileChange}
          accept="image/*,.png,.jpeg,.jpg,.gif"
          style={{ display: 'none' }} 
        />

        <StyledButton onClick={handleUpload} disabled={!selectedFile || isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </StyledButton>
      </UploadButtonsWrap>

      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {uploading && (
        <div>
          <p>Uploaded file: {uploading.fileName}</p>
          <img alt="Uploaded" src={uploading.filePath} width="200" />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </UploadWrap>
  );

};

export default UploadFoto;