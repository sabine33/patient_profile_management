
<template>
    <div class="container">
        <div class="row g-6 mb-6">
            <InfoCard :stats="stats" :key="componentKey" />
        </div>
        <SpecialPatientsTable :key="componentKey" />
    </div>

</template>

<script setup lang="ts">
import { usePatientsStore, useAuthStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, nextTick, ref } from 'vue';
import SpecialPatientsTable from './SpecialPatientsTable.vue';
import { InfoCard } from '@/components/dashboard';
const patientStore = usePatientsStore();
const authStore = useAuthStore();
const { stats } = storeToRefs(patientStore);
const { token } = useAuthStore();
const componentKey = ref(0);


onBeforeMount(async () => {
    await patientStore.fetchStats();
    componentKey.value += 1;
});
</script>