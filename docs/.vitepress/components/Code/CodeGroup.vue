<template>
  <div class="code-example">
    <CodeGroupToolbar :tabs="codeTabs" @select-tab="onSelectTab" />

    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'

import type { ITab } from './code-group'
import { codeGroupInjectionKey } from './code-group'

const codeTabs = reactive<ITab[]>([])

const onSelectTab = (id: number) => {
  codeTabs.forEach((tab) => {
    tab.isActive = tab.id === id
  })
}

provide(codeGroupInjectionKey, {
  addTab: (tab) => {
    codeTabs.push(tab)
  },
  codeTabs,
})
</script>

<style lang="scss">
.code-example {
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
