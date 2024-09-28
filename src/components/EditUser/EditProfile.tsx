import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { EDIT_FIELD_NAMES, EditFormValues } from './types';
import Button from '../Button/Button';
import {
  EditComponentContainer,
  EditLabel,
  EditWrap,
  SaveButtonsWrap,
} from './styles';
import { LoginName } from '../LoginForm/styles';
import './styles.css';
import { API_ENDPOINTS } from '../Config/apiConfig';

interface User extends EditFormValues {
  id: string;
  password: string;
}

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.UPDATE_USER, { //подумать как сделать запрос на сервер
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
        console.log('Fetched user:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const initialValues: EditFormValues = {
    [EDIT_FIELD_NAMES.NAME]: user?.name || '',
    [EDIT_FIELD_NAMES.EMAIL]: user?.email || '',
    [EDIT_FIELD_NAMES.BORNCITY]: user?.bornCity || '',
    [EDIT_FIELD_NAMES.LIVECITY]: user?.liveCity || '',
    [EDIT_FIELD_NAMES.DESCRIPTION]: user?.description || '',
  };

  console.log('Initial form values:', initialValues);

  const validationSchema = Yup.object({
    [EDIT_FIELD_NAMES.NAME]: Yup.string()
      .max(50, 'Max 50 symbols')
      .min(2, 'Min 2 symbols'),
    [EDIT_FIELD_NAMES.EMAIL]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.BORNCITY]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.LIVECITY]: Yup.string().max(50, 'Max 50 symbols'),
    [EDIT_FIELD_NAMES.DESCRIPTION]: Yup.string(),
  });

  const handleSubmit = async (
    values: EditFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log('Submitting form with values:', values);

    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_USER, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(values),
      });

      console.log('response:', response);

      const contentType = response.headers.get('content-type');
      let updatedUserData;

      if (contentType && contentType.includes('application/json')) {
        updatedUserData = await response.json();
      } else {
        const textResponse = await response.text();
        console.warn('Expected JSON, got:', textResponse);
        updatedUserData = { message: textResponse }; 
      }

      if (response.ok) {
        setUser(updatedUserData);
        resetForm();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <EditWrap>
      <LoginName>Edit User</LoginName>
      <Formik<EditFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <EditComponentContainer>
              <EditLabel htmlFor={EDIT_FIELD_NAMES.NAME}>
                Name
                <Field
                  id={EDIT_FIELD_NAMES.NAME}
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
                  id={EDIT_FIELD_NAMES.EMAIL}
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
                  id={EDIT_FIELD_NAMES.BORNCITY}
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
                  id={EDIT_FIELD_NAMES.LIVECITY}
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
                  id={EDIT_FIELD_NAMES.DESCRIPTION}
                  name={EDIT_FIELD_NAMES.DESCRIPTION}
                  as='textarea'
                  className='fieldDescript textField'
                />
              </EditLabel>
            </EditComponentContainer>
            <SaveButtonsWrap>
              <Button type='submit' disabled={isSubmitting} name='SAVE' />
            </SaveButtonsWrap>
          </Form>
        )}
      </Formik>
    </EditWrap>
  );
};

export default EditProfile;
