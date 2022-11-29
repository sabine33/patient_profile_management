<template>
    <div>
        <!-- <div class="h4 mb-4">{{ modeTitle }}</div>
        <div class="notices mb-4">
            <div v-if="loading && !patient">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </div>
        </div> -->
        <Form @submit="onSubmit(patient)" :validation-schema="patientSchema" v-slot="{ errors, isSubmitting }"
            class="row g-3" v-if="patient">
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


            <div class="col-12 mt-4" v-if="!isDisabled">
                <label for="inputPhoto" class="form-label">Patient Photo</label>
                <div class="form-control">
                    <input type="file" @change="onFileChanged($event)" accept="image/*" ref="file" capture />
                </div>
            </div>

            <div class="preview mt-4" v-if="patient.avatar_filename">
                <img :src="getImageUrl" width="200" height="200" style="object-fit: contain" />
            </div>

            <div class="col-12 mt-5 d-flex justify-content-between">
                <router-link class="btn btn-danger" to="/dashboard/patients">Back to home</router-link>
                <button v-if="!isDisabled" type="submit" class="btn btn-primary" @click.prevent="onSubmit(patient)">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
            </div>
        </Form>
    </div>
</template>
<script setup lang="ts">
import Vue3TagsInput from "vue3-tags-input";
import { ref, computed, onMounted } from "vue";
import { IPatient } from "@/interfaces";
import { patientSchema } from "@/schemas";
import { Field, Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { usePatientsStore } from "@/store/patients.store";
import { useRouter, useRoute } from "vue-router";
import { IMAGE_URL } from "@/constants";
const route = useRoute();
const patientStore = usePatientsStore();
const { addPatient, updatePatient, onUploadFile } = patientStore;
const { patient } = storeToRefs(patientStore);

const uploadedFileUrl = ref("");

let { mode, id } = route.params;


onMounted(() => {
    if (+id > 0 && mode !== 'add') {
        patientStore.getByID(+id);
    }
});

const getImageUrl = computed(() => {
    return `${IMAGE_URL}/${patient.value.avatar_filename}`;
});

const onFileChanged = async (event: any) => {
    let filesList = event?.target?.files;
    if ((filesList as any[]).length > 0) {
        let firstFile = filesList[0];
        let uploadedFileName = await onUploadFile(firstFile);
        uploadedFileUrl.value = `${IMAGE_URL}/${uploadedFileName}`;
    }
}

const isDisabled = computed(() => {
    return mode === 'view';
});

const onSubmit = async (patient: Partial<IPatient>) => {
    if (mode == 'add') {
        await addPatient(patient);
    }
    else {
        await updatePatient(+id, patient);
    }
}
const handleChangeTag = (tags: []) => {
    patient.value.allergies = tags;
}

</script>
