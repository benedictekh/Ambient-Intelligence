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

/*
export const getAllTrashcans = async () => {
  console.log("trying to get trashcans");
  return api
    .get(`trashcan/`)
    .then((response) => {
      return response.data;
    })
    .catch(() => console.log("hello"));
};

export const getAllShops = async () => {
  return api.get(`shop/`).then((response) => {
    return response.data;
  });
};


export const getHistoryShops = async () => {
  //If more users, the user id could be sent as a variable
  return api.get(`user/1/shopTransactions`).then((response) => {
    return response.data;
  });
};


export const getHistoryTrashcans = async () => {
  //If more users, the user id could be sent as a variable
  return api.get(`user/1/trashCanTransactions`).then((response) => {
    return response.data;
  });
};*/
