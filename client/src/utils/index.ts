import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export const upload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/upload", formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
