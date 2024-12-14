interface Order {
  id: number | null
  category: string | null
  description: JSON | null
  created_at: Date | null
  valid_since: Date | null
  valid_until: Date | null
  status: string | null
  senior_id: number | null
  volunteer_id: number | null
}