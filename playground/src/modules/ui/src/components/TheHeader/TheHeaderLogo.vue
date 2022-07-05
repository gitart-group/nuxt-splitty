<script setup lang="ts">
const config = useThemeConfig()
</script>

<template>
  <NuxtLink
    v-slot="{navigate}"
    to="/"
    custom
  >
    <div class="flex items-center cursor-pointer" @click="navigate">
      <img
        :src="config.logo.src"
        alt=""
        class="w-22 h-15 object-contain"
      >
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
