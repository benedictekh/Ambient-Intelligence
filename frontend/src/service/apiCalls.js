import { api } from "./api";

/* Get all users api call */
export const getAllUsers = async () => {
  console.log("Getting all users");
  return api
    .get("user/userDB/getAll")
    .then((response) => {
      return response.data;
    })
    .catch(() => console.log("ERROR GET ALL"));
};