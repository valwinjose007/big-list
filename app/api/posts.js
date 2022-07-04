import apiClient from "./client";

const endpoint = "/posts";

const getPosts = () => apiClient.get(endpoint);

export default {
  getPosts,
};
