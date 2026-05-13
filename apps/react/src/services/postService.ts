import type { Post } from "../types/posts";
import API from "./api";

export const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

export const createPost = (data: FormData) =>
  API.post("/posts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updatePost = (id: string, data: FormData) =>
  API.put(`/posts/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getPostById = async (id: string) => {
  const res = await API.get(`/posts`);
  return res.data.find((p: Post) => p.id === Number(id));
};

export const deletePost = async (id: number) => {
  return API.delete(`/posts/${id}`);
};