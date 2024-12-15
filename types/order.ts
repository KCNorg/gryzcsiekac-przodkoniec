export type Product = {
  id: number;
  text: string;
};

export type Order = {
  id?: number | null;
  category?: string | null;
  description?: {
    data: Product[];
  } | null;
  created_at?: string | null;
  valid_since?: string | null;
  valid_until?: string | null;
  status?: string | null;
  senior_id?: number | null;
  volunteer_id?: number | null;
};
