export interface UserFormValues {
    confirmPassword: string;
    name: string;
    email: string;
    password: string;
    roleId: number;
  }
  
  export enum USER_FIELD_NAMES {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
    ROLE_ID = 'roleId'
  }