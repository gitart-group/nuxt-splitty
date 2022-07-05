<template>
  <div v-if="isActive" class="code-block">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, inject } from 'vue'
import { codeGroupInjectionKey } from './code-group'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const groupInjection = inject(codeGroupInjectionKey)

if (!groupInjection)
  throw new Error('code-group-injections is not provided. This component must be used inside a CodeGroup.')

const currentInstance = getCurrentInstance()
const id = currentInstance?.uid || Math.random()

groupInjection.addTab({
  label: props.label,
  isActive: props.active,
  id,
})

const isActive = computed(() => {
  return groupInjection.codeTabs.find(tab => tab.id === id)?.isActive
})
</script>

<style lang="scss">
.code-block {
  border-top: 1px solid var(--vp-c-divider-light);
  overflow: hidden;
  background-color: var(--code-bg-color);

  &__slot-wrapper {
    border-top: 1px solid var(--vp-c-divider-light);
  }

  &__slot {
    margin: 10px;
    border-radius: 6px;
    background: rgba(var(--t-brand-rgb), 0.15);
  }

  & > div {
    margin: 0 !important;
  }
}
</style>
