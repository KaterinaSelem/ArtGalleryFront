export interface EditFormValues {
    name: string;
    email: string;
    bornCity: string;
    liveCity: string;
    description: string;
    image: string;

}

export enum EDIT_FIELD_NAMES {
    NAME = 'name',
    EMAIL = 'email',
    BORNCITY = 'bornCity',
    LIVECITY = 'liveCity',
    DESCRIPTION = 'description',
    IMAGE = 'image'
}