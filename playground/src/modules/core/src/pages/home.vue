<script setup lang="ts">
import imgSrc from '@Theme/assets/big-img.jpeg'
import Container from '@UI/components/Container/Container.vue'

definePageMeta({
  title: 'My home page',
})
</script>

<template>
  <div class="bg-gray-100 py-4">
    <Container>
      <div class="grid grid-cols-2 p-3 items-center gap-3">
        <div>
          <h1 class="py-4 text-4xl font-bold mb-6">
            {{ $t('@Core.pages.home.mainTitle') }}
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, nam.
          </p>
        </div>

        <img
          :src="imgSrc"
          class="h-80 w-full object-cover rounded-lg"
        >
      </div>
    </Container>
  </div>
</template>

<style lang="scss" scoped></style>
