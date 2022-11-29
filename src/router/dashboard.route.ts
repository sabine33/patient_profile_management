import { Home, Patients, Layout } from "@/pages/dashboard";
import ManagePatient from "@/pages/patients/ManagePatient.vue";

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
      component: Patients,
      title: "Patients",
      name: "list",
      class: "bi bi-emergency",
      children: [
        {
          name: "manage-patient",
          path: "/dashboard/patients/:mode/:id",
          component: ManagePatient,
          title: "Manage Patients",
          class: "bi bi-emergency",
          props: true,
        },
      ],
    },
  ],
};
