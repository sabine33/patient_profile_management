<template>
    <!-- Dashboard -->
    <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Sidebar></Sidebar>

        <!-- Main content -->
        <div class="h-screen flex-grow-1 overflow-y-lg-auto">
            <!-- Header -->
            <header class="bg-surface-primary border-bottom pt-6">
                <div class="container-fluid">
                    <div class="mb-npx">
                        <div class="row align-items-center">
                            <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                                <!-- Title -->
                                <h1 class="h4 mb-0 ls-tight">Patient Management Dashboard</h1>
                            </div>
                            <!-- Actions -->
                            <div class="col-sm-6 col-12 text-sm-end">
                                <div class="mx-n1">
                                    <button @click.prevent="addPatient"
                                        class="btn d-inline-flex btn-sm btn-primary mx-1">
                                        <span class="pe-2">
                                            <i class="bi bi-plus"></i>
                                        </span>
                                        <span>Add New Patient</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Nav -->
                        <ul class="nav nav-tabs mt-4 overflow-x border-0 mb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li v-for="item in getBreadcrumb" class="breadcrumb-item">
                                        <router-link :to="`$/{item}`">{{
                                                item.toLocaleUpperCase()
                                        }}</router-link>
                                    </li>
                                </ol>
                            </nav>
                        </ul>
                    </div>
                </div>
            </header>
            <main class="container-fluid py-6 bg-surface-secondary">
                <router-view :key="route.fullPath"></router-view>
            </main>
        </div>
    </div>
</template>
<style>
@import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.min.css");
</style>
<script lang="ts" setup>
import { Sidebar } from "@/components/dashboard";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();

const getBreadcrumb = computed(() => {
    return route.fullPath.split("/");
});

const addPatient = async () => {
    await router.push({
        name: "manage-patient",
        params: {
            mode: "add",
            id: -1,
        },
    });
};
</script>
