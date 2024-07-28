<script setup lang="ts">
import logo from "../assets/logo.png";
</script>

<template>
    <div class="mt-5">
        <div class="mt-5 flex">
            <VaCard class="m-auto flex flex-col grow-0 w-5/6 sm:w-1/2 lg:w-1/3">
                <VaCardTitle class="text-lg">
                    <img
                        :src="logo"
                        alt="web-logo"
                        class="max-w-full max-h-full m-auto"
                    />
                </VaCardTitle>
                <VaCardContent> 
                    <h2 class="text-center">基于 WebRTC 的在线投屏</h2>
                    <div class="flex justify-around mt-5">
                        <VaButton class="grow-0" to="/~share"> 我要投屏 </VaButton>
                        <VaButton class="grow-0" to="/~receive"> 我要接收 </VaButton>
                    </div>
                </VaCardContent>
            </VaCard>
        </div>
    </div>
</template>
