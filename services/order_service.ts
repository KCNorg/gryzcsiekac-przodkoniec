import { Order } from "@/types/order";
import { API_URL } from "@/constants/Api";
import { apiCall } from "./utils";

export const get_orders = async () => {
  const orders: Order[] = await apiCall(`${API_URL}/orders`);
  return orders;
};

export const get_order = async (id: number) => {
  const order: Order = await apiCall(`${API_URL}/orders/${id}`);
  return order;
};

export const create_order = async (order: Order) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const created_order: Order = await response.json();
  return created_order;
};

export const update_order = async (id: number, order: Order) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const updated_order: Order = await response.json();
  return updated_order;
};

export const delete_order = async (id: number) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });
  const deleted_order: Order = await response.json();
  return deleted_order;
};
