import { apiGet, API_BASE_URL } from "./client";

export type Shot = {
  id: number;
  club: number;
  club_name: string;
  club_type: string;
  club_type_display: string;
  session: number;
  session_name: string;
  carry_distance: string;
  total_distance: string | null;
  ball_speed: string | null;
  club_speed: string | null;
  launch_angle: string | null;
  spin_rate: number | null;
  notes: string;
  created_at: string;
};

export async function getShots(): Promise<Shot[]> {
  return apiGet("/shots/");
}

export type ShotPayload = {
  club: number;
  session: number;
  carry_distance: number;
  total_distance?: number;
  ball_speed?: number;
  club_speed?: number;
  launch_angle?: number;
  spin_rate?: number;
  notes?: string;
};

export async function createShot(payload: ShotPayload) {
  const response = await fetch(`${API_BASE_URL}/shots/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Create shot failed: ${response.status}`);
  }

  return response.json();
}