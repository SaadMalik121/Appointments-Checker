import { authentication } from "./authenticationApi";
import { api } from "./config/apiConfig";

async function getAppointments() {
  try {
    const token = JSON.parse(localStorage.getItem("ccript_user"));

    if (!token) {
      throw new Error("Access token not available");
    }

    const response = await api.get("/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    authentication.refreshToken();
    throw error;
  }
}

export const appointmentsApi = { getAppointments };
