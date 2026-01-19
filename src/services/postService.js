import api from "./api";

export const createPost = async (postData, tutorEmail) => {

  const response = await api.post("/api/posts", postData);

  // const response = await api.post(
  //   `/api/posts/create?tutorEmail=${tutorEmail}`,
  //   postData
  // );
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get("/api/posts");
  return response.data;
};

export const deletePost = async (id) => {
  return api.delete(`/api/posts/delete/${id}`);
};
