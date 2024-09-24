const API_BASE_URL = "https://artgallery-production.up.railway.app/api";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  UPDATE_USER_IMAGE: `${API_BASE_URL}/users/updateUserImage`,
    UPDATE_USER: `${API_BASE_URL}/users/updateUser`,
    GET_USER: `${API_BASE_URL}/users`,
    GET_USER_BY_ID: `${API_BASE_URL}/users`,
    GET_USERPROFILE: `${API_BASE_URL}/users/profile`,
  GET_ARTISTS: `${API_BASE_URL}/users/artists`,
  GET_ARTWORKS: `${API_BASE_URL}/works`,
  GET_CATEGORY: (categoryId:number) => `${API_BASE_URL}/categories/${categoryId}`,

};