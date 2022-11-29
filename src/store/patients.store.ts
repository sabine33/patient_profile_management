import { defineStore } from "pinia";
import { IPatient, IResponseType } from "@/interfaces";
import { Patient, Uploads } from "@/helpers/apiHelpers";
import { errorAlert, successAlert } from "@/helpers";
import { router } from "@/router";

interface IPatientStore {
  patients: Partial<IPatient>[];
  patient: Partial<IPatient>;
  patientCount: number;
}

export const usePatientsStore = defineStore({
  id: "patients",
  state: (): IPatientStore => {
    return {
      patients: [],
      patient: {},
      patientCount: 0,
    };
  },
  actions: {
    async onViewItem(id: number) {
      await router.push({
        name: "manage-patient",
        params: { mode: "view", id: id },
      });
    },
    async onEditItem(id: number) {
      await router.push({
        name: "manage-patient",
        params: { mode: "edit", id: id },
      });
    },
    async onDeleteItem(id: number) {
      if (confirm("Are you sure to delete this patient ?")) {
        await this.deletePatient(id);
      }
    },
    async onAddItem() {
      await router.push({
        name: "manage-patient",
        params: { mode: "add", id: -1 },
      });
    },
    async onUploadFile(file: any) {
      try {
        let response = await Uploads.uploadImage(file);
        this.patient.avatar_filename = response.data.filename;
        successAlert(response);
        return response.data.filename;
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async fetchPatientCount() {
      try {
        let response = await Patient.getStats();
        console.log(response);
        this.patientCount = response.data?.count || 0;
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async listPatients() {
      try {
        let response = await Patient.getPatients();
        this.patients = response.data;
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async addPatient(argPatient: Partial<IPatient>) {
      try {
        let response = await Patient.createPatient(argPatient);
        router.push({ name: "list-patients" });
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async deletePatient(id: number) {
      try {
        let response = await Patient.deletePatient(id);
        router.push({ name: "list-patients" });
        this.patients = this.patients.filter((x) => x.id !== id);
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async getByID(id: number) {
      try {
        let response = await Patient.getPatient(id);
        this.patient = response.data;
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
    async updatePatient(id: number, patient: Partial<IPatient>) {
      try {
        let response = await Patient.updatePatient(id, patient);
        this.patient = response.data;
        router.push({ name: "list-patients" });
        successAlert(response);
      } catch (ex) {
        errorAlert(ex);
      }
    },
  },
});
