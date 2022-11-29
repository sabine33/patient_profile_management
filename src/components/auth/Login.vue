<script setup>
import { Form, Field } from 'vee-validate';
import { useAuthStore } from '@/store';
import { ref } from "vue"
import { loginSchema } from '@/schemas';
import { errorAlert } from '@/helpers';

let user = ref({
    'email': 'sabin.khanal.33@gmail.com',
    'password': 'appleball'
})

async function onSubmit(values) {
    try {
        const authStore = useAuthStore();
        const { email, password } = values;
        await authStore.login(email, password);
    }
    catch (ex) {
        errorAlert("Login failed because of some error.")
    }
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header bg-secondary">Login</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="loginSchema" v-slot="{ errors, isSubmitting }">
                <div class="form-group mt-4">
                    <label>Email</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }"
                        v-model="user.email" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group mt-4">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control"
                        :class="{ 'is-invali    d': errors.password }" v-model="user.password" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group mt-4">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </button>
                    <router-link to="register" class="btn btn-link">Register</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
