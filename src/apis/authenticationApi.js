import { api } from "./config/apiConfig";

async function loginUser(username, password) {
  try {
    const { data } = await api.post("login", {
      username,
      password,
    });
    localStorage.setItem("ccript_user", JSON.stringify(data?.token));
    return data;
  } catch (error) {
    alert("Error while login, please try again");
  }
}

async function logoutUser(username, password) {
  localStorage.removeItem("ccript_user");
}

async function refreshToken() {
  try {
    const token = JSON.parse(localStorage.getItem("ccript_user"));

    if (!token) {
      return;
    }

    const { data } = await api.post(
      "/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("ccript_user", JSON.stringify(data?.newToken));
  } catch (error) {
    console.log("Error refreshing token:", error);
  }
}

export const authentication = { loginUser, logoutUser, refreshToken };
