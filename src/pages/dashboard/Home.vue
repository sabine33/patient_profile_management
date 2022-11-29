<template>
    <div class="container">
        <div class="row g-6 mb-6">
            <InfoCard />
        </div>
        <SpecialPatientsTable />
    </div>

</template>
<script setup lang="ts">
import { InfoCard } from '@/components/dashboard';
import SpecialPatientsTable from './SpecialPatientsTable.vue';



</script>