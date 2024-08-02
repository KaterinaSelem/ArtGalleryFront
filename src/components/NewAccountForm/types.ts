export interface UserFormValues {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }
  
  export enum USER_FIELD_NAMES {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
    ROLE_ID = 'roleId'
  }