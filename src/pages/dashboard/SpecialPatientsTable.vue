<template>
    <div class="card shadow border-0 mb-7">
        <div class="card-header">
            <h5 class="mb-0">Special Patients</h5>
            <p>Special attention patients are displayed with red circle.</p>
        </div>
        <div class="table-responsive">
            <table class="table table-hover table-nowrap">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Needs Special Attention</th>
                        <th scope="col">Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(patient, index) in patientSliced" :key="index">
                        <td>
                            <img alt="..." :src="`${IMAGE_URL}/${patient.avatar_filename}`"
                                class=" avatar avatar-sm rounded-circle me-2">
                            <a class="text-heading font-semibold"
                                :class="patient.is_special_attention ? 'text-danger' : 'text-primary'" href="#">

                                {{ patient.full_name }}
                            </a>
                        </td>
                        <td>
                            {{ patient.phone }}
                        </td>
                        <td>

                            <a class="text-heading font-semibold" href="#">
                                {{ patient.email }}
                            </a>
                        </td>

                        <td>
                            <span class="badge badge-lg badge-dot">
                                <i :class="patient.is_special_attention ? 'bg-danger' : 'bg-success'"></i>{{
                                        patient.is_special_attention ? 'YES' : 'NO'
                                }}

                            </span>
                        </td>
                        <td class="text-end">
                            <a href="#" class="btn btn-sm btn-neutral" @click.prevent="viewItem(patient)">View</a>
                            <a href="#" class="btn btn-sm btn-neutral" @click.prevent="editItem(patient)">Edit</a>

                            <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover"
                                @click.prevent="deleteItem(patient)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="card-footer border-0 py-5">
            <span class="text-muted text-sm">Showing {{ patientSliced.length }} items out of {{ patients.length }}
                results found</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/constants';
import { IPatient } from '@/interfaces';
import { usePatientsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRouter } from "vue-router";
const patientStore = usePatientsStore();

const { patients } = storeToRefs(patientStore);

let router = useRouter();

const PER_PAGE = 5;

const patientSliced = computed(() => {
    return patients.value.slice(0, PER_PAGE);
});

const deleteItem = async (val: Partial<IPatient>) => {
    if (confirm("Are you sure to delete this patient ?")) {
        let { id } = val;
        await patientStore.delete(id ?? -1);

    }
};
const viewItem = async (val: Partial<IPatient>) => {
    let { id } = val;
    await router.push({ name: 'manage-patient', params: { mode: 'view', id: id } })
}

const editItem = async (val: Partial<IPatient>) => {
    let { id } = val;
    await router.push({ name: 'manage-patient', params: { mode: 'edit', id } })
};

onMounted(async () => {
    await patientStore.getAll();
});

</script>