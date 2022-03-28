import axios from "axios";

export const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: "http://localhost:5000/",
});
