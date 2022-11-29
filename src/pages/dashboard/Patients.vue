<template>
    <div>
        <div class="" v-if="routeName == 'list'">
            <List />
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { List } from '../patients';


const route = useRoute();
let routeName = route.name;

console.log(route.params.id)
</script>