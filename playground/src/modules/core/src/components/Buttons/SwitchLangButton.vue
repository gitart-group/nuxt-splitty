<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Button from '@UI/components/Button/Button.vue'

const {
  availableLocales,
  locale,
} = useI18n({
  useScope: 'global',
})

console.warn('availableLocales', availableLocales)

const onSetLocale = (l: string) => {
  if (locale.value === l)
    return

  locale.value = l
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-for="l in availableLocales"
      :key="(l as string)"
      :class="{
        '!border-orange-400': l === locale
      }"
      class="uppercase"
      @click="onSetLocale(l as string)"
    >
      {{ l }}
    </Button>
  </div>
</template>
