<script setup lang="ts">
import Button from '@UI/components/Button/Button.vue'
import { ROUTE_NAME } from '@Cart/config/routes'

defineProps<{
  large: boolean
}>()
</script>

<template>
  <NuxtLink
    v-slot="{navigate}"
    :to="{name: ROUTE_NAME.CART + '___de'}"
  >
    <Button @click="navigate">
      {{ $t('@Cart.components.OpenCartButton') }}
    </Button>
  </NuxtLink>
</template>

<style lang="scss" scoped>
</style>
