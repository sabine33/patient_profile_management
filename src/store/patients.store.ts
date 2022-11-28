import { defineStore } from "pinia";
import { IPatient, IPatientStore, IResponseType } from "@/interfaces";
import { Patient, Uploads } from "@/helpers/apiHelpers";
import { errorAlert, successAlert } from "@/helpers";

export const usePatientsStore = defineStore({
  id: "patients",
  state: (): IPatientStore => {
    return {
      loading: false,
      patients: [],
      stats: {},
      patient: null,
      error: "",
      successResponse: null,
    };
  },
  actions: {
    async create(argPatient: Partial<IPatient>) {
      try {
        this.error = "";
        let response = await Patient.createPatient(argPatient);
        this.successResponse = response;
        this.patient = response.data;
        successAlert(response);
      } catch (ex) {
        this.error = ex;
        this.successResponse = null;
        errorAlert(ex);
      }
    },
    async fetchStats() {
      this.loading = true;
      try {
        let response = (await Patient.getStats()) || 0;
        this.successResponse = response;

        console.log(response);
        this.stats = response.data;
        successAlert(response);
      } catch (error) {
        this.error = error;
        this.successResponse = null;
        this.loading = false;
      }
    },
    async getAll() {
      this.loading = true;
      try {
        let response = (await Patient.getPatients()) || [];
        this.successResponse = response;

        this.patients = response.data;
        this.patients.map(
          (x) =>
            (x["full_name"] =
              x["full_name"] ?? "".length > 15
                ? x["full_name"]?.slice(0, 15)
                : x["full_name"])
        );
        successAlert(response);
      } catch (error) {
        this.error = error;
        this.loading = false;
        this.successResponse = null;
      }
    },
    async getById(id: number) {
      this.loading = true;
      try {
        let response = await Patient.getPatient(id);
        this.successResponse = response;
        this.patient = this.successResponse.data;
        successAlert(response);
      } catch (error) {
        this.error = error;
        this.loading = false;
        this.successResponse = null;

        errorAlert(error);
      }
    },
    async update(id: number, params: any) {
      try {
        this.successResponse = await Patient.updatePatient(id, params);
        successAlert(this.successResponse);
      } catch (error) {
        this.error = error;
        errorAlert(error);
        this.successResponse = null;
      }
    },
    async delete(id: number) {
      this.error = false;
      try {
        this.successResponse = await Patient.deletePatient(id);
        this.patients = this.patients?.filter((x) => x.id !== id);
        successAlert(this.successResponse);
      } catch (error: any) {
        this.error = error;
        this.successResponse = null;
        errorAlert(error);
      }
    },
  },
});
