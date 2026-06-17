import { apiGet, API_BASE_URL } from "./client";

export type Club = {
  id: number;
  user: number | null;
  name: string;
  club_type: string;
  club_type_display: string;
  average_distance: number | null;
  shortest_distance: number | null;
  longest_distance: number | null;
  shot_count: number;
  notes: string;
  created_at: string;
  updated_at: string;
};

export async function getClubs(): Promise<Club[]> {
  return apiGet("/clubs/");
}

export type ClubPayload = {
  name: string;
  club_type: string;
  notes?: string;
};

export async function createClub(payload: ClubPayload): Promise<Club> {
  const response = await fetch(`${API_BASE_URL}/clubs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Create club failed: ${response.status}`);
  }

  return response.json();
}

export async function updateClub(
  id: number,
  payload: Partial<ClubPayload>
): Promise<Club> {
  const response = await fetch(`${API_BASE_URL}/clubs/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Update club failed: ${response.status}`);
  }

  return response.json();
}

export async function deleteClub(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/clubs/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete club failed: ${response.status}`);
  }
}