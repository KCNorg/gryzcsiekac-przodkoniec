import { API_URL } from '@/constants/Api';
import { apiCall, objectToQueryParams } from "@/services/utils";

export const get_users = async (params: Object = {}) => {
  const paramsString = objectToQueryParams(params);
  const users: User[] = await apiCall(`${API_URL}/users?${paramsString}`);
  return users;
}

export const get_user = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  const user: User = await response.json();
  return user;
}

export const create_user = async (user: User) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const created_user: User = await response.json();
  return created_user;
}

export const update_user = async (id: number, user: User) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const updated_user: User = await response.json();
  return updated_user;
}

export const delete_user = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  const deleted_user: User = await response.json();
  return deleted_user;
}