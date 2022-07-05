<template>
  <div class="py-2 px-2 flex gap-2">
    <button
      v-for="tab in tabs"
      :key="tab.label"
      class="btn h-10 text-primary"
      :class="tab.isActive && 'btn--active'"
      @click="onSelectTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ITab } from './code-group'

const emit = defineEmits(['selectTab'])
defineProps({
  tabs: {
    type: Array as PropType<ITab[]>,
    required: true,
  },
})

const onSelectTab = (id: ITab['id']) => {
  emit('selectTab', id)
}
</script>

<style lang="scss">
.example-toolbar {
  display: flex;
  align-items: center;
  padding: 5px 12px;
}
</style>
