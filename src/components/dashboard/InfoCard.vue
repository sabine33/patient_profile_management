<template>
    <div class="col-xl-3 col-sm-6 col-12">
        <div class="card shadow border-0">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">Patients</span>
                        <span class="h1 font-bold mb-0">{{ stats.count }}</span>
                    </div>
                    <div class="col-auto">
                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                            <i class="bi bi-person"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['stats'])

</script>