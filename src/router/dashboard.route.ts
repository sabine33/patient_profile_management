import { Home, Patients, Layout } from "@/pages/dashboard";
import List from "@/pages/patients/List.vue";
import ManagePatient from "@/pages/patients/ManagePatient.vue";
import PatientForm from "@/pages/patients/PatientForm.vue";

export default {
  path: "/dashboard",
  component: Layout,
  children: [
    { path: "", redirect: "/dashboard/home" },
    { path: "/", redirect: "/dashboard/home" },
    {
      path: "/dashboard/home",
      component: Home,
      title: "Dashboard",
      class: "bi bi-house",
    },
    {
      path: "/dashboard/patients",
      component: List,
      title: "Patients",
      name: "list-patients",
      class: "bi bi-emergency",
      // children: [

      // ],
    },
    {
      name: "manage-patient",
      path: "/dashboard/patients/:mode/:id",
      component: PatientForm,
      title: "Manage Patients",
      class: "bi bi-emergency",
      props: true,
      hidden: true,
    },
  ],
};
