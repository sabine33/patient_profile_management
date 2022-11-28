<template>
    <div>
        <div class="" v-if="routeName == 'list'">
            <PatientList></PatientList>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { PatientList } from '../patients';


const route = useRoute();
let routeName = route.name;

console.log(route.params.id)
</script>