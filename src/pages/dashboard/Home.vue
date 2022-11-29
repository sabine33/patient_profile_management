
<template>
    <div class="container">
        <div class="row g-6 mb-6">
            <InfoCard :stats="stats" />
        </div>
        <SpecialPatientsTable />
    </div>

</template>

<script setup lang="ts">
import { usePatientsStore, useAuthStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, nextTick } from 'vue';
import SpecialPatientsTable from './SpecialPatientsTable.vue';
import { InfoCard } from '@/components/dashboard';
const patientStore = usePatientsStore();
const authStore = useAuthStore();
const { stats } = storeToRefs(patientStore);
const { token } = useAuthStore();


onBeforeMount(async () => {
    await patientStore.fetchStats();
});
</script>