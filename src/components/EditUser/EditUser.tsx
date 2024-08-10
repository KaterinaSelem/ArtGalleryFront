import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EDIT_FIELD_NAMES, EditFormValues } from './types';
import Button from '../Button/Button';

interface User extends EditFormValues {
  id: number;
  password: string;
  userRole: { id: number; title: string };
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const validationSchema = Yup.object({
    [EDIT_FIELD_NAMES.NAME]: Yup.string()
      .required('Field name required!')
      .max(50, 'Max 50 symbols')
      .min(2, 'Min 2 symbols'),
    [EDIT_FIELD_NAMES.EMAIL]: Yup.string()
      .required('Field email required!')
      .email('Field type email'),
    [EDIT_FIELD_NAMES.BORNCITY]: Yup.string()
      .max(50, 'Max 50 symbols')
      .min(2, 'Min 2 symbols'),
    [EDIT_FIELD_NAMES.LIVECITY]: Yup.string()
      .max(50, 'Max 50 symbols')
      .min(2, 'Min 2 symbols'),
    [EDIT_FIELD_NAMES.EXHIBITION]: Yup.array().of(Yup.string().max(50, 'Max 50 symbols')),
    [EDIT_FIELD_NAMES.DESCRIPTION]: Yup.string()
      .max(200, 'Max 200 symbols'),
    [EDIT_FIELD_NAMES.IMAGE]: Yup.string().url('Invalid URL'),
  });

  const handleSubmit = async (values: EditFormValues) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append(key, (values as any)[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: formData,
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
    <div>
      <h1>Edit User</h1>
      <Formik
        initialValues={{
          [EDIT_FIELD_NAMES.NAME]: user.name,
          [EDIT_FIELD_NAMES.EMAIL]: user.email,
          [EDIT_FIELD_NAMES.BORNCITY]: user.bornCity,
          [EDIT_FIELD_NAMES.LIVECITY]: user.liveCity,
          [EDIT_FIELD_NAMES.EXHIBITION]: user.exhibition,
          [EDIT_FIELD_NAMES.DESCRIPTION]: user.description,
          [EDIT_FIELD_NAMES.IMAGE]: user.image,
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor={EDIT_FIELD_NAMES.NAME}>Name</label>
              <Field name={EDIT_FIELD_NAMES.NAME} type="text" />
              <ErrorMessage name={EDIT_FIELD_NAMES.NAME} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.EMAIL}>Email</label>
              <Field name={EDIT_FIELD_NAMES.EMAIL} type="email" />
              <ErrorMessage name={EDIT_FIELD_NAMES.EMAIL} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.BORNCITY}>Born City</label>
              <Field name={EDIT_FIELD_NAMES.BORNCITY} type="text" />
              <ErrorMessage name={EDIT_FIELD_NAMES.BORNCITY} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.LIVECITY}>Live City</label>
              <Field name={EDIT_FIELD_NAMES.LIVECITY} type="text" />
              <ErrorMessage name={EDIT_FIELD_NAMES.LIVECITY} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.EXHIBITION}>Exhibition</label>
              <Field name={EDIT_FIELD_NAMES.EXHIBITION} type="text" />
              <ErrorMessage name={EDIT_FIELD_NAMES.EXHIBITION} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.DESCRIPTION}>Description</label>
              <Field name={EDIT_FIELD_NAMES.DESCRIPTION} type="text" />
              <ErrorMessage name={EDIT_FIELD_NAMES.DESCRIPTION} component="div" />
            </div>

            <div>
              <label htmlFor={EDIT_FIELD_NAMES.IMAGE}>Image File</label>
              <input
                id={EDIT_FIELD_NAMES.IMAGE}
                name={EDIT_FIELD_NAMES.IMAGE}
                type="file"
                accept=".jpg"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  setImageFile(file || null);
                  setFieldValue(EDIT_FIELD_NAMES.IMAGE, file?.name || '');
                }}
              />
              <ErrorMessage name={EDIT_FIELD_NAMES.IMAGE} component="div" />
            </div>

            <Button type="submit" disabled={isSubmitting} name = 'SAVE'/>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;