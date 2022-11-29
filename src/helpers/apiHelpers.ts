import { IPatient, IResponseType } from "@/interfaces";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
const baseURL: string = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const responseBody = (response: AxiosResponse): IResponseType => {
  return response.data;
};

const errorBody = (response: AxiosError) => {
  console.log(response);
  let errorMessage = "Unknown error occured.";
  if (response && response.response && response.response.data) {
    errorMessage = (response.response as AxiosResponse).data["message"];
  }
  throw new Error(errorMessage);
};

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url?.startsWith("/auth")) return config;

    config.headers = config.headers ?? {};
    const accessToken = JSON.parse(
      localStorage.getItem("token") || JSON.stringify("")
    );
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string) => apiClient.get(url).then(responseBody).catch(errorBody),
  post: (url: string, body: {}, headers?: {}) =>
    apiClient.post(url, body, { headers }).then(responseBody).catch(errorBody),
  put: (url: string, body: any) => apiClient.put(url, body).then(responseBody),
  delete: (url: string) =>
    apiClient.delete(url).then(responseBody).catch(errorBody),
};

export const Uploads = {
  uploadImage: (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    const headers = { "Content-Type": "multipart/form-data" };
    return requests.post("/uploads/image", formData, headers);
  },
};

export const Patient = {
  getPatients: (): Promise<IResponseType> => requests.get("/patients"),
  getStats: (): Promise<IResponseType> => requests.get("/patients/info/stats"),
  getPatient: (id: number): Promise<IResponseType> =>
    requests.get(`patients/${id}`),
  createPatient: (data: Partial<IPatient>): Promise<IResponseType> =>
    requests.post("patients", data),
  updatePatient: (
    id: number,
    data: Partial<IPatient>
  ): Promise<IResponseType> => requests.put(`patients/${id}`, data),
  deletePatient: (id: number): Promise<IResponseType> =>
    requests.delete(`patients/${id}`),
};

export const Auth = {
  login: (email: string, password: string): Promise<IResponseType> =>
    requests.post("auth/login", { email, password }),
  signup: (email: string, password: string): Promise<IResponseType> =>
    requests.post(`auth/signup`, { email, password }),
};
