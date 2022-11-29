<script setup>
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';
import * as Yup from 'yup';
import { useAuthStore } from '@/store';
import { useRouter } from "vue-router";
import { signupSchema } from '@/schemas';

const router = useRouter();

let user = {
    email: '',
    password: '',
    passwordAgain: ''
}


const authStore = useAuthStore();


async function onSubmit(values) {
    let { email, password } = values;
    await authStore.signup(email, password);
    user = {
        email: '',
        password: '',
        passwordAgain: ''
    };
    
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header bg-secondary">Signup</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="signupSchema" v-slot="{ errors, isSubmitting }">

                <div class="form-group mt-3">
                    <label>Email</label>
                    <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                        v-model="user.email" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group mt-3">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control"
                        :class="{ 'is-invalid': errors.password }" v-model="user.password" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group mt-5">
                    <label>Password Again</label>
                    <Field name="passwordAgain" type="password" class="form-control"
                        :class="{ 'is-invalid': errors.passwordAgain }" v-model="user.passwordAgain" />
                    <div class="invalid-feedback">{{ errors.passwordAgain }}</div>
                </div>
                <div class="form-group mt-5">
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Signup
                    </button>
                    <router-link to="/login" class="btn btn-link">Back to Login</router-link>
                </div>
            </Form>
        </div>
    </div>

</template>