import { LoginFormComponent, LoginInputContainer, LoginName, LoginWrap, StyledHeader, StyledLinkLikeBtn } from './styles';
import { useFormik } from 'formik';
import { LoginFormValues, LOGIN_FIELD_NAMES } from './types';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import './styles.css';
import { login } from '../../redux/AuthSlice';
import { useDispatch } from 'react-redux';

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|\\:;'<>,.?/]+$/;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
    
  const scheme = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required('Field email required!')
      .email('Field type email'),
    [LOGIN_FIELD_NAMES.PASSWORD]: Yup.string()
      .required('Field password required!')
      .max(15, 'Max 15 symbols')
      .min(3, 'Min 3 symbols')
      .matches(passwordRegex, 'The password must contain only Latin letters, numbers, and special characters.'),
  });

  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: '',
      [LOGIN_FIELD_NAMES.PASSWORD]: '',
    } as LoginFormValues,
    validationSchema: scheme,
    validateOnChange: false,
    onSubmit: async (values: LoginFormValues, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post('/api/auth/login', values);
        console.log(response.data);
        localStorage.setItem('accessToken', response.data.accessToken);
        resetForm();
        if (response.status === 200) {
          dispatch(login(response.data.accessToken))
          navigate('/');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            setErrorMessage('Server error, please try again later.');
          } else {
            setErrorMessage(error.response.data.message || 'Login failed, please try again.');
          }
        } else {
          setErrorMessage('There was something wrong with the request, please check your network connection.');
        }
      }
    },
  });

  // Clear error message when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    setErrorMessage(null);
  };

  return (
    <LoginWrap>
      <LoginFormComponent onSubmit={formik.handleSubmit}>
        <LoginName>Sign in</LoginName>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <LoginInputContainer>
          <Input
            name={LOGIN_FIELD_NAMES.EMAIL}
            placeholder='Enter your email'
            label='Email*'
            onInputChange={handleInputChange}
            value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
            error={formik.errors[LOGIN_FIELD_NAMES.EMAIL]}
          />
          <Input
            name={LOGIN_FIELD_NAMES.PASSWORD}
            type='password'
            placeholder='Enter your password'
            label='Password*'
            onInputChange={handleInputChange}
            value={formik.values[LOGIN_FIELD_NAMES.PASSWORD]}
            error={formik.errors[LOGIN_FIELD_NAMES.PASSWORD]}
          />
        </LoginInputContainer>
        <Button type='submit' name='SIGN IN' />
        
        <StyledHeader>Don’t have an account?</StyledHeader>
        <StyledLinkLikeBtn to={`/register`} className='likeBtn'>Create Account</StyledLinkLikeBtn> 
      </LoginFormComponent>
    </LoginWrap>
  );
}

export default LoginForm;