<template>
    <!-- Vertical Navbar -->
    <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical">
        <div class="container-fluid">
            <!-- Toggler -->
            <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Brand -->
            <router-link to="/dashboard" class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0 d-flex align-items-center"
                href="#">
                <img src="https://www.pngkey.com/png/detail/986-9860667_hospital-management-system-png.png"
                    class="img-fluid" width="100" />
                <h2 class="">{{ title }}</h2>

            </router-link>
            <!-- User menu (mobile) -->
            <div class="navbar-user d-lg-none">
                <!-- Dropdown -->
                <div class="dropdown">
                    <!-- Toggle -->
                    <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <div class="avatar-parent-child">
                            <img alt="Image Placeholder"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyfSR4VufVmGo7NJbQ2q7tRP8LtBXTRV_TwxRJFg&s"
                                class="avatar avatar- rounded-circle">
                            <span class="avatar-child avatar-badge bg-success"></span>
                        </div>
                    </a>
                    <!-- Menu -->
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                        <a href="#" @click.prevent="authStore.logout()" class="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="sidebarCollapse">
                <!-- Navigation -->
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="(route, index) in routes" :key="index">
                        <router-link class="nav-link" :to="route.path">
                            <i :class="route.class"></i> {{ route.title }}
                        </router-link>
                    </li>




                    <li class="nav-item">
                        <button class="nav-link" @click.prevent="authStore.logout()">
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </button>
                    </li>
                </ul>
                <!-- Divider -->
                <hr class="navbar-divider my-5 opacity-20">

            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import dashboardRoutes from "@/router/dashboard.route";
import { useAuthStore } from '@/store';

const routes = dashboardRoutes.children;

const authStore = useAuthStore();
const title = "P.P.M"


</script>