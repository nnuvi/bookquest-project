import { api } from "../utils/api";

export const getUser = async () => {
  const res = await api.get("auth/me");
  return res.data;
};