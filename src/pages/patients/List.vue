<template>
    <div>
        <EasyDataTable :headers="headers" alternating :items="patients">
            <template #item-avatar_filename="{ avatar_filename }">
                <div class="patient-wrapper">
                    <div class="d-flex flex-row">
                        <img class="avatar img-fluid" :src="`${IMAGE_URL}/${avatar_filename}`" alt="" />
                    </div>
                </div>
            </template>

            <template #item-is_special_attention="{ is_special_attention }">
                <span class="badge badge-lg badge-dot">
                    <i :class="is_special_attention ? 'bg-danger' : 'bg-success'"></i>{{ is_special_attention ? "YES" :
                            "NO"
                    }}
                </span>
            </template>

            <template #item-action="item">
                <div class="operation-wrapper gap-2 d-flex p-5">
                    <button type="button" @click="onViewItem(item.id)" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-eye"></i>
                    </button>

                    <button type="button" @click="onEditItem(item.id)" class="btn btn-outline-secondary btn-sm">
                        <i class="bi bi-pen"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="onDeleteItem(item.id)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </template>
        </EasyDataTable>
    </div>
</template>
<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table";
import { IMAGE_URL } from "@/constants";
import { storeToRefs } from "pinia";
import { usePatientsStore } from "@/store/patients.store";

import { useRouter } from "vue-router";

const router = useRouter();

const patientStore = usePatientsStore();
const { patients } = storeToRefs(patientStore);
const { onAddItem, onEditItem, onDeleteItem, onViewItem } = patientStore;
patientStore.listPatients();


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





</script>
