import { IResponseType } from "@/interfaces";
import { notify } from "@kyvg/vue3-notification";

export const successAlert = (response: IResponseType) =>
  notify({
    type: "success",
    title: response?.message,
  });

export const errorAlert = (message: any) =>
  notify({
    type: "error",
    title: message,
  });
