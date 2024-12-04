import axios from "axios";
import base64 from "base-64"; // Use base-64 for encoding

const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const token = base64.encode(`${username}:${password}`);

export const appAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 1000,
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  },
});
