<template>
    <div>
        <div class="h4 mb-4">{{ modeTitle }}</div>
        <div class="notices mb-4">
            <div v-if="loading && !patient">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </div>
        </div>
        <Form @submit="onSubmit" :validation-schema="patientSchema" v-slot="{ errors, isSubmitting }" class="row g-3"
            v-if="patient">
            <div class="form-group col-lg-6 mt-4">
                <label>Full Name</label>
                <Field name="full_name" type="text" class="form-control" :class="{ 'is-invalid': errors.full_name }"
                    v-model="patient.full_name" />
                <div class="invalid-feedback">{{ errors.full_name }}</div>
            </div>

            <div class="form-group col-lg-6 mt-4">
                <label>Email</label>
                <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                    v-model="patient.email" />
                <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="form-group col-lg-6 mt-4">
                <label>Phone</label>
                <Field name="phone" type="number" class="form-control" :class="{ 'is-invalid': errors.phone }"
                    v-model="patient.phone" />
                <div class="invalid-feedback">{{ errors.phone }}</div>
            </div>
            <div class="form-group col-lg-6 mt-4">
                <label>Date of birth</label>
                <Field name="date_of_birth" type="date" class="form-control"
                    :class="{ 'is-invalid': errors.date_of_birth }" v-model="patient.date_of_birth" />
                <div class="invalid-feedback">{{ errors.date_of_birth }}</div>
            </div>
            <div class="form-group col-lg-6 mt-4">
                <label>Address</label>
                <Field name="address" type="text" class="form-control" :class="{ 'is-invalid': errors.address }"
                    v-model="patient.address" />
                <div class="invalid-feedback">{{ errors.address }}</div>
            </div>
            <div class="col-lg-6 mt-4 pt-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="special-attention"
                        v-model="patient.is_special_attention" />
                    <label class="form-check-label" for="special-attention">
                        Special Attention Patient
                    </label>
                </div>
            </div>
            <div class="col-lg-6 mt-4">
                <label for="inputAllergies" class="form-label">Allergies</label>

                <vue3-tags-input :tags="patient?.allergies" placeholder="" @on-tags-changed="handleChangeTag"
                    :add-tag-on-keys="[13]" />
            </div>

            <div class="col-12 mt-4" v-if="!isReadOnly">
                <label for="inputPhoto" class="form-label">Patient Photo</label>
                <div class="form-control">
                    <input type="file" @change="onFileChanged($event)" accept="image/*" ref="file" capture />
                </div>
            </div>

            <div class="preview mt-4" v-if="imageURL">
                <img :src="imageURL" width="200" height="200" style="object-fit: contain" />
            </div>

            <div class="col-12 mt-5 d-flex justify-content-between">
                <router-link class="btn btn-danger" to="/dashboard/patients">Back to home</router-link>
                <button type="submit" class="btn btn-primary" @click.prevent="onSubmit" v-if="mode !== 'view'">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>

                    Save
                </button>
            </div>
        </Form>
    </div>
</template>
<script setup lang="ts">
import Vue3TagsInput from "vue3-tags-input";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePatientsStore } from "@/store";
import { Uploads } from "@/helpers/apiHelpers";
import { IMAGE_URL } from "@/constants";
import { patientSchema } from "@/schemas";
import { Form, Field } from "vee-validate";
import { IPatient } from "@/interfaces";
import { successAlert } from "@/helpers";


const route = useRoute();
const router = useRouter();
let { mode, id } = route.params;
const patientStore = usePatientsStore();
let file = ref<File | any>(null);
let remoteFilePath = ref("");


let { patient, loading, successResponse } = storeToRefs(patientStore);


const loadPatient = async () => {
    if (mode !== "add") {
        await patientStore.getById(+id);
        console.log(successResponse.value);
        loading.value = false;
    }
    else {
        patient.value = {
            full_name: "",
            email: "",
            phone: "",
            date_of_birth: '1994-07-17',
            allergies: [],
            address: "",
            avatar_filename: "",
            is_special_attention: true
        };
    }
};

const imageURL = computed(() => {
    return `${IMAGE_URL}/${patient.value?.avatar_filename}`;
});

const handleChangeTag = (tags: []) => {
    patient.value!.allergies = tags;
};
const onFileChanged = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        file = target.files ? target.files[0] : null;
        if (file) {
            // imgDataUrl = URL.createObjectURL(file);
            await uploadImage(file);
        }
    }
};

const uploadImage = async (file: any) => {
    let response = await Uploads.uploadImage(file);
    remoteFilePath.value = response.data.filename;
    patient.value!.avatar_filename = remoteFilePath.value;
    successAlert(response)
};

const isReadOnly = computed(() => {
    return mode === "view";
});

const modeTitle = computed(() => {
    let title = "";
    if (mode == "add") {
        title = "Add Patient";
    } else if (mode == "view") {
        title = "Patients Info";
    } else if (mode == "edit") {
        title = "Edit Patient";
    }
    return title;
});

const onSubmit = async () => {
    if (mode == "add") {
        let patientInfo = patient.value as IPatient;
        await patientStore.create(patientInfo);
        if (successResponse && successResponse.value?.status) {
            router.push("/dashboard/patients");
        }
    } else if (mode == "edit") {
        let patientId = patient.value?.id || -1;
        let patientUpdated = await patientStore.update(patientId, patient.value);
        if (successResponse.value?.status) {
            router.push("/dashboard/patients");
        }
    } else {
        return;
    }
};

onMounted(async () => {
    await loadPatient();

});
</script>
