<script setup lang="ts">
import TheHeader from '@UI/components/TheHeader/TheHeader.vue'
import TheFooter from '@UI/components/TheFooter/TheFooter.vue'
import SwitchLangButton from '@Core/components/Buttons/SwitchLangButton.vue'

const { getExtendSlot } = useExtend()

const extendedActions = computed(() => getExtendSlot('@Core/layouts/default')?.HEADER_ACTIONS)
</script>

<template>
  <div class="min-h-100vh flex flex-col">
    <TheHeader>
      <template #actions>
        <Component
          :is="actionItem.component"
          v-bind="actionItem.props"
          v-for="(actionItem, index) in extendedActions"
          :key="index"
        />

        <SwitchLangButton />
      </template>
    </TheHeader>

    <slot />

    <TheFooter class="mt-auto" />
  </div>
</template>
