<script setup lang="ts">
import Container from '@UI/components/Container/Container.vue'
const route = useRoute()
</script>

<template>
  <Container class="py-4">
    Product {{ route.params.id }}
  </Container>
</template>
