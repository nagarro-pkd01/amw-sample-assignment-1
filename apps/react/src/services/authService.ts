import API from "./api";

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const signup = async (data: {
  username: string;
  password: string;
}) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};