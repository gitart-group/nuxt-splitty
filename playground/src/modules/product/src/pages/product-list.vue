<script setup lang="ts">
import Container from '@UI/components/Container/Container.vue'

const toast = useToast()

onMounted(() => {
  toast.success('Page mounted!')
})
</script>

<template>
  <Container class="py-4">
    <h1 class="text-xl">
      Prodcuts
    </h1>

    <NuxtLink to="/products/1">
      Product 1
    </NuxtLink>
  </Container>
</template>
