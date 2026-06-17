import { apiGet } from "./client";

export type ShotSession = {
  id: number;
  user: number | null;
  name: string;
  session_date: string;
  location: string;
  notes: string;
  shots_count: number;
  created_at: string;
  updated_at: string;
};

export async function getSessions(): Promise<ShotSession[]> {
  return apiGet("/sessions/");
}