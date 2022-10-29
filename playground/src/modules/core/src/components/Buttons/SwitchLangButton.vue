<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import Button from '@UI/components/Button/Button.vue'
const switchLocalePath = useSwitchLocalePath()
// const setLocale = useSetLocale()

const {
  localeCodes,
  locale,
  setLocale,
  setLocaleCookie,
} = useI18n({
  useScope: 'global',
})


const onSetLocale = (l: string) => {
  console.warn('onSetLocale', l, switchLocalePath(l))
  switchLocalePath(l)
  setLocale(l)
  setLocaleCookie(l)
  // if (locale.value === l)
  //   return

  // locale.value = l
}
</script>

<template>
  <div class="flex gap-2">
    <Button
      v-for="l in localeCodes"
      :key="(l as string)"
      :class="{
        '!border-purple-500': l === locale
      }"
      class="uppercase border-4 border-solid border-transparent"
      @click="onSetLocale(l as string)"
    >
      {{ l }}
    </Button>
  </div>
</template>
