import axios from "axios";
export const api = axios.create({
  baseURL: "https://hiring-test-task.vercel.app/api/",
});
