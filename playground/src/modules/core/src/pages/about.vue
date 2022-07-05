<script setup lang="ts">
import Container from '@UI/components/Container/Container.vue'
import Hero from '@Core/components/Sections/Hero.vue'

definePageMeta({
  middleware: [
    'cart/someMiddleware',
  ],
})

useHead({
  title: 'About',
  description: 'This is the about page',
  keywords: 'about, page',
})
</script>

<template>
  <Container class="py-4">
    <h4 class="text-3xl font-bold">
      About
    </h4>

    <ClientOnly>
      <Hero />
    </ClientOnly>
  </Container>
</template>
