import * as Yup from 'yup';
import axios from 'axios';
import { USER_FIELD_NAMES, UserFormValues } from './types';
import { useFormik } from 'formik';
import Input from '../Input/Input';
import { FormWrapper, UserFormComponent } from './styles';
import Button from '../Button/Button';
import { LoginName } from '../LoginForm/styles';
import RadioGroup from '../radioBtns/RadioGroup';

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
        .matches(passwordRegex, 'The password must contain only Latin letters, numbers and special characters.'),
        [USER_FIELD_NAMES.ROLE_ID]: Yup.string()
        .required('Role is required')
        .oneOf(['1', '2'])
        
    });

    const formik = useFormik({
        initialValues: {
            [USER_FIELD_NAMES.NAME]:'',
            [USER_FIELD_NAMES.EMAIL]:'',
            [USER_FIELD_NAMES.PASSWORD]:'',
            [USER_FIELD_NAMES.ROLE_ID]: '2',
        } as UserFormValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: async (values: UserFormValues, {resetForm}) => {
            try {
                const response = await axios.post('/api/users/register', values);
                console.log(response.data);
                resetForm();
            } catch (error) {
                console.error('There was something wrong!', error);
            }
        } 
    });
    console.log(formik);

    return (
        <FormWrapper>

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

         <RadioGroup
                    options={[
                        { value: '1', label: 'I`m an Artist' },
                        { value: '2', label: 'I`m a Visitor' }
                    ]}
                    onChange={(value) => formik.setFieldValue(USER_FIELD_NAMES.ROLE_ID, value)}
        />
        
         <Button type="submit" name="CREATE ACCOUNT" />
        </UserFormComponent>

         </FormWrapper>
        
        )




}

export default UserForm;