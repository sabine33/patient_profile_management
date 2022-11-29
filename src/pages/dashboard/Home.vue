
<template>
    <div class="container">
        <div class="row g-6 mb-6">
            <InfoCard :stats="stats" />
        </div>
        <SpecialPatientsTable />
    </div>

</template>

<script setup lang="ts">
import { usePatientsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import SpecialPatientsTable from './SpecialPatientsTable.vue';
import { InfoCard } from '@/components/dashboard';
const patientStore = usePatientsStore();
const { stats } = storeToRefs(patientStore);


onMounted(async () => {
    await patientStore.fetchStats();
});
</script>