<template>
  <div>
    <Notification />
    <div class="app-container" :class="authStore.user && 'bg-light'">
      <Header />
      <div class="pt-4 pb-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Header, Notification } from '@/components';
import { useAuthStore } from '@/store';
const authStore = useAuthStore();
</script>

<style>
@import '@/assets/style.css';
</style>