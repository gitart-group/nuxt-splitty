<script setup lang="ts">
import Container from '@UI/components/Container/Container.vue'
import TheHeaderLogo from '@UI/components/TheHeader/TheHeaderLogo.vue'
import TheHeaderSearchBar from '@UI/components/TheHeader/TheHeaderSearchBar.vue'

import OpenCartButton from '@Cart/extends/components/Buttons/OpenCartButton.vue'

const pages = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Products',
    url: '/products',
  },
]
</script>

<template>
  <div class="shadow-light-800 flex shadow">
    <Container>
      <div class="the-header-main">
        <TheHeaderLogo />

        <TheHeaderSearchBar />

        <div class="ml-auto flex gap-5 items-center">
          <slot name="actions" />
        </div>
      </div>

      <div class="py-2 flex">
        <NuxtLink
          v-for="page in pages"
          :key="page.name"
          :to="page.url"
        >
          <button
            class="inline-flex px-4 py-2 text-sm font-semibold border-r-2 border-gray-200 hover:bg-gray-100"
          >
            {{ page.name }}
          </button>
        </NuxtLink>
      </div>
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.the-header-main {
  @apply
    grid grid-cols-[150px,1fr,1fr] items-center
    py-2
  ;
}
</style>
