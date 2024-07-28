<script setup lang="ts">
import logo from "../assets/logo.png"
import { defineModel } from "vue"

const navColor = "#F8F8FE";
const showSidebar = defineModel<number>({ default: 0 });

</script>

<template>
  <VaNavbar :color="navColor" class="mb-3 shadow-md">
    <template #left>
      <VaButton :color="navColor" :icon="showSidebar ? 'menu_open' : 'menu'" @click="showSidebar = (showSidebar+1)%2" />
      <VaNavbarItem>
        <p class="ml-2.5 w-full whitespace-nowrap">在线投屏</p>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        <img :src="logo" alt="web-logo" class="w-10 max-w-full max-h-full" />
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>
