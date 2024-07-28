<template>
    <div class="w-full text-center mt-8 mb-4">
        <p>
            {{ anthor }} &copy; {{ year }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useMetaStore } from '../store/meta';

const {  anthor, year } = useMetaStore();
</script>

