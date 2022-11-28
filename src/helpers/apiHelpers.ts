import { IPatient, IResponseType, IUser } from "@/interfaces";
import axios, { AxiosResponse, AxiosError } from "axios";
const baseURL: string = import.meta.env.VITE_API_URL;
import { useAuthStore } from "@/store";
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
function authHeader() {
  const token = JSON.parse(localStorage.getItem("token")!);
  const user = JSON.parse(localStorage.getItem("user")!);

  let isLoggedIn = user && token;
  if (isLoggedIn) {
    return `Bearer ${token}`;
  } else {
    return "";
  }
}

apiClient.defaults.headers.common["Authorization"] = authHeader();

// apiClient.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem("user") || "");
//   let token = user?.token;
//   alert(token);

//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     let res = error.response;
//     if (res.status == 401) {
//       window.location.href = baseURL + "/login";
//     }
//     return Promise.reject(error);
//   }
// );

const responseBody = (response: AxiosResponse): IResponseType => {
  return response.data;
};

const errorBody = (response: AxiosError) => {
  let errorMessage =
    (response.response as AxiosResponse).data["message"] ??
    "Unknown error occured.";
  throw new Error(errorMessage);
};
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
