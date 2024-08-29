import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { EDIT_FIELD_NAMES, EditFormValues } from './types';
import { Form, Formik } from 'formik';
import Button from '../Button/Button';
import {
  EditComponentContainer,
  EditLabel,
  EditWrap,
  LoadPhoto,
} from './styles';
import { LoginName } from '../LoginForm/styles';
import './styles.css';

interface User extends EditFormValues {
  id: number;
  password: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        let userData;

        if (contentType && contentType.includes('application/json')) {
          userData = await response.json();
        } else {
          const textResponse = await response.text();
          console.error('Expected JSON, got:', textResponse);
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const validationSchema = Yup.object({
    [EDIT_FIELD_NAMES.NAME]: Yup.string()
      .required('Field name required!')
      .max(50, 'Max 50 symbols')
      .min(2, 'Min 2 symbols'),
    [EDIT_FIELD_NAMES.EMAIL]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.BORNCITY]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.LIVECITY]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.DESCRIPTION]: Yup.string().max(200, 'Max 200 symbols'),
    [EDIT_FIELD_NAMES.IMAGE]: Yup.string().url('Invalid URL'),
  });

  const handleSubmit = async (values: EditFormValues) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, (values as never)[key]);
    });

    if (user && user.image) {
      formData.append('image', user.image);
    }

    try {
      const response = await fetch(`/api/users/${id}/updateFields`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <EditWrap>
      <LoginName>Edit User</LoginName>
      <Formik
        initialValues={{
          [EDIT_FIELD_NAMES.NAME]: user.name,
          [EDIT_FIELD_NAMES.EMAIL]: user.email,
          [EDIT_FIELD_NAMES.BORNCITY]: user.bornCity,
          [EDIT_FIELD_NAMES.LIVECITY]: user.liveCity,
          [EDIT_FIELD_NAMES.DESCRIPTION]: user.description,
          [EDIT_FIELD_NAMES.IMAGE]: user.image,
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.NAME}>
                Name
                <Field
                  name={EDIT_FIELD_NAMES.NAME}
                  type='text'
                  className='field'
                />
                <ErrorMessage
                  name={EDIT_FIELD_NAMES.NAME as string}
                  component='div'
                />
              </EditLabel>
            </EditComponentContainer>

            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.EMAIL}>
                Email
                <Field
                  name={EDIT_FIELD_NAMES.EMAIL}
                  type='email'
                  className='field'
                />
              </EditLabel>
            </EditComponentContainer>

            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.BORNCITY}>
                Born City
                <Field
                  name={EDIT_FIELD_NAMES.BORNCITY}
                  type='text'
                  className='field'
                />
              </EditLabel>
            </EditComponentContainer>

            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.LIVECITY}>
                Live City
                <Field
                  name={EDIT_FIELD_NAMES.LIVECITY}
                  type='text'
                  className='field'
                />
              </EditLabel>
            </EditComponentContainer>

            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.DESCRIPTION}>
                Description
                <Field
                  name={EDIT_FIELD_NAMES.DESCRIPTION}
                  as='textarea'
                  className='fieldDescript textField'
                />
              </EditLabel>
            </EditComponentContainer>

            <EditComponentContainer>
              <LoadPhoto>
                <EditLabel htmlFor={EDIT_FIELD_NAMES.IMAGE}>
                  Image File
                  <input
                    id={EDIT_FIELD_NAMES.IMAGE}
                    name={EDIT_FIELD_NAMES.IMAGE}
                    type='file'
                    accept='.jpg'
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue(EDIT_FIELD_NAMES.IMAGE, file?.name || '');
                    }}
                  />
                </EditLabel>
              </LoadPhoto>
            </EditComponentContainer>

            <Button type='submit' disabled={isSubmitting} name='SAVE' />
          </Form>
        )}
      </Formik>
    </EditWrap>
  );
};

export default EditUser;
