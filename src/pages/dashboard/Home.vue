
<template>
    <div class="container">
        <div class="row g-6 mb-6">
            <InfoCard :stats="stats" />
        </div>

        <FancyTable />

    </div>

</template>

<script setup lang="ts">
import { usePatientsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { InfoCard } from '@/components/dashboard';
import FancyTable from './SpecialPatientsTable.vue';
const patientStore = usePatientsStore();
const { stats } = storeToRefs(patientStore);



patientStore.fetchStats();

console.log(stats)


</script>