import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

/// authorization api
export const singInApi = async (userData) => {
  const { data } = await $host.post("/api/auth/singin", userData);
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", jwt_decode(data.token).email);
  return jwt_decode(data.token);
};
export const logInApi = async (userData) => {
  const { data } = await $host.post("/api/auth/login", userData);
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", jwt_decode(data.token).email);
  return jwt_decode(data.token);
};
export const check = async () => {
  const { data } = await $authHost.get("/api/auth/check");
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", jwt_decode(data.token).email);

  const user = jwt_decode(data.token);
  delete user["iat"];
  delete user["exp"];
  return user;
};

/// event api
export const getEvents = async () => {
  const response = await $authHost.get("/api/event");
  return response;
};

export const createEvent = async (event) => {
  const response = await $authHost.post("/api/event", event);
  return response;
};

export const deleteEvent = async (id) => {
  const response = await $authHost.delete(`/api/event/${id}`);
  return response;
};

export const getEvent = async (id) => {
  const response = await $authHost.get(`/api/event/${id}`);
  return response;
};

export const editEvent = async (id, event) => {
  const response = await $authHost.put(`/api/event/${id}`, event);
  return response;
};


/// photo api
export const getEventPhotos = async (id) => {
  const response = await $authHost.get(`/api/photo/${id}`);
  return response;
};

export const createPhoto = async (photo) => {
  const response = await $authHost.post("/api/photo", photo);
  return response;
};

export const deletePhoto = async (id) => {
  const response = await $authHost.delete(`/api/photo/${id}`);
  return response;
};

export const getPhoto = async (id) => {
  const response = await $authHost.post(`/api/photo/${id}`);
  return response;
};

export const editPhoto = async (id, photo) => {
  const response = await $authHost.put(`/api/photo/${id}`, photo);
  return response;
};
