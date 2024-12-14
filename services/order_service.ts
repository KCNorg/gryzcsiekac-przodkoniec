import { API_URL } from '@/constants/Api';

export const get_orders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  const orders: Order[] = await response.json();
  return orders;
}

export const get_order = async (id: number) => {
  const response = await fetch(`${API_URL}/orders/${id}`);
  const order: Order = await response.json();
  return order;
}

export const create_order = async (order: Order) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  const created_order: Order = await response.json();
  return created_order;
}

export const update_order = async (id: number, order: Order) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  const updated_order: Order = await response.json();
  return updated_order;
}

export const delete_order = async (id: number) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
  });
  const deleted_order: Order = await response.json();
  return deleted_order;
}