<template>
    <div>
        <div class="h3 mb-4">
            All Patients
        </div>
        <div v-if="patients.length > 0">
            <EasyDataTable :headers="headers" alternating :items="patients" :loading="loading">
                <template #loading>
                    <img src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                        style="width: 100px; height: 80px;" />
                </template>

                <template #item-avatar_filename="{ avatar_filename }">
                    <div class="patient-wrapper">
                        <div class="d-flex flex-row">
                            <img class="avatar img-fluid" :src="`${IMAGE_URL}/${avatar_filename}`" alt="" />
                        </div>
                    </div>
                </template>

                <template #item-is_special_attention="{ is_special_attention }">
                    <span class="badge badge-lg badge-dot">
                        <i :class="is_special_attention ? 'bg-danger' : 'bg-success'"></i>{{
                                is_special_attention ? 'YES' : 'NO'
                        }}

                    </span>
                </template>
                <template #item-allergies="{ allergies }">
                    {{ allergies }}
                </template>
                <template #item-action="item">
                    <div class="operation-wrapper gap-2 d-flex p-5">
                        <button type="button" @click="viewItem(item)" class="btn btn-outline-primary btn-sm"> <i
                                class="bi bi-eye"></i>
                        </button>


                        <button type="button" @click="editItem(item)" class="btn btn-outline-secondary btn-sm"> <i
                                class="bi bi-pen"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteItem(item)">
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-else>
            No Items found
        </div>

        <div v-if="loading">
            <td colspan="4" class="text-center">
                <span class="spinner-border spinner-border-lg align-center"></span>
            </td>
        </div>

    </div>



</template>
  
<script lang="ts" setup>
import { Header, Item } from "vue3-easy-data-table";
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
import { usePatientsStore } from '@/store';
import { IMAGE_URL } from "@/constants";
const patientStore = usePatientsStore();
const { patients, loading } = storeToRefs(patientStore);




const headers: Header[] = [
    { text: "ID", value: 'id', sortable: true },
    { text: "", value: "avatar_filename", width: 100 },
    { text: "Patient Name", value: "full_name" },
    { text: "Email", value: "email" },
    { text: "Phone", value: "phone" },
    { text: "DOB", value: "date_of_birth" },
    { text: "Address", value: "address" },
    { text: "Special Attention", value: "is_special_attention", sortable: true },
    { text: '', value: 'action' }
];

const router = useRouter()
patientStore.getAll();



const deleteItem = async (val: Item) => {
    if (confirm("Are you sure to delete this patient ?")) {
        let { id } = val;
        await patientStore.delete(id);

    }
};
const viewItem = async (val: Item) => {
    let { id } = val;
    await router.push({ name: 'manage-patient', params: { mode: 'view', id: id } })
}

const editItem = async (val: Item) => {
    let { id } = val;
    await router.push({ name: 'manage-patient', params: { mode: 'edit', id } })
};


</script>
  
<style>
.operation-wrapper .operation-icon {
    width: 20px;
    cursor: pointer;
}

.patient-wrapper {
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-items: center;
}
</style>
  