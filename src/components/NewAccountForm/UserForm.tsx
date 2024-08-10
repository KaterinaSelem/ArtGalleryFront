
import * as Yup from 'yup';
import axios from 'axios';
import { USER_FIELD_NAMES, UserFormValues } from './types';
import { useFormik } from 'formik';
import Input from '../Input/Input';
import { LoginWrap, StyledHeader, UserFormComponent } from './styles';
import Button from '../Button/Button';
import { LoginName, StyledLinkLikeBtn } from '../LoginForm/styles';
import RadioGroup from '../radioBtns/RadioGroup';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function UserForm() {
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|\\:;'<>,.?/]+$/;

  const validationSchema = Yup.object().shape({
    [USER_FIELD_NAMES.NAME]: Yup.string()
      .required('Required field')
      .min(2, 'Min 2 symbols')
      .max(150, 'Max 150 symbols'),
    [USER_FIELD_NAMES.EMAIL]: Yup.string()
      .required('Field email required!')
      .email('Field type email'),
    [USER_FIELD_NAMES.PASSWORD]: Yup.string()
      .required('Field password required!')
      .max(15, 'Max 15 symbols')
      .min(8, 'Min 8 symbols')
      .matches(passwordRegex, 'The password must contain only Latin letters, numbers, and special characters.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref(USER_FIELD_NAMES.PASSWORD), undefined], 'Must match "password" field value')
      .required('Confirm Password is required'),
    [USER_FIELD_NAMES.ROLE_ID]: Yup.string()
      .required('Role is required')
      .oneOf(['1', '2']),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      [USER_FIELD_NAMES.NAME]: '',
      [USER_FIELD_NAMES.EMAIL]: '',
      [USER_FIELD_NAMES.PASSWORD]: '',
      confirmPassword: '',
      [USER_FIELD_NAMES.ROLE_ID]: '2',
    } as UserFormValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values: UserFormValues, { resetForm }) => {
      try {
        const response = await axios.post('/api/register', values);
        console.log(response.data);
        resetForm();
        if (response.status === 201) {
          navigate('/login');
        }
      } catch (error) {
        console.error('There was something wrong!', error);
      }
    }
  });

  return (
    <LoginWrap>
      <UserFormComponent onSubmit={formik.handleSubmit}>
        <LoginName>Create account</LoginName>
        <Input
          name={USER_FIELD_NAMES.NAME}
          label="Name*"
          placeholder=" "
          onInputChange={formik.handleChange}
          value={formik.values[USER_FIELD_NAMES.NAME]}
          error={formik.errors[USER_FIELD_NAMES.NAME]}
        />
        <Input
          name={USER_FIELD_NAMES.EMAIL}
          label="E-mail*"
          placeholder=" "
          onInputChange={formik.handleChange}
          value={formik.values[USER_FIELD_NAMES.EMAIL]}
          error={formik.errors[USER_FIELD_NAMES.EMAIL]}
        />
        <Input
          name={USER_FIELD_NAMES.PASSWORD}
          label="Password*"
          placeholder=" "
          onInputChange={formik.handleChange}
          value={formik.values[USER_FIELD_NAMES.PASSWORD]}
          error={formik.errors[USER_FIELD_NAMES.PASSWORD]}
        />
        <Input
          name="confirmPassword"
          label="Confirm Password*"
          placeholder=" "
          onInputChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        <RadioGroup
          options={[
            { value: '1', label: 'I`m an Artist' },
            { value: '2', label: 'I`m a Visitor' }
          ]}
          onChange={(value) => formik.setFieldValue(USER_FIELD_NAMES.ROLE_ID, value)}
        />
        <Button type="submit" name="CREATE ACCOUNT" />
        <StyledHeader>Already have an account?</StyledHeader>
        <StyledLinkLikeBtn to={`/login`} className='likeBtn'>Sign in</StyledLinkLikeBtn>
      </UserFormComponent>
    </LoginWrap>
  );
}

export default UserForm;