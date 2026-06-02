// Local development API URL.
// Update this IP address if your computer's Wi-Fi address changes.
const API_BASE_URL = "http://192.168.1.184:8000/api";

export async function apiGet(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export { API_BASE_URL };