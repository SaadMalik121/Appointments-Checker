import { api } from "./config/apiConfig";

async function loginUser(username, password) {
  console.log(username, password);
  try {
    const { data } = await api.post("login", {
      username,
      password,
    });
    localStorage.setItem("ccript_user", JSON.stringify(data?.token));
    return data;
  } catch (error) {
    alert("Error while login, please try again");
    console.log(error);
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

    console.log("token");
    console.log(token);
    const { data } = await api.post(
      "/refresh-token",
      {}, // Provide an empty object as the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data");
    console.log(data);

    localStorage.setItem("ccript_user", JSON.stringify(data?.newToken));
  } catch (error) {
    console.log("Error refreshing token:", error);
  }
}

export const authentication = { loginUser, logoutUser, refreshToken };
