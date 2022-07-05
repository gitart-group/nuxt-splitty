<script setup lang="ts">
const config = useThemeConfig()

const links = config.footer.links
</script>

<template>
  <div class="footer-links">
    <NuxtLink
      v-for="item in links"
      :key="item.label"
      :to="item.route"
      class="footer-link"
    >
      {{ $t(item.label) }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.footer-links {
  @apply
    flex justify-center gap-3
    py-5
    bg-gray-200
  ;
}

.header-link {
  @apply
    text-xs text-gray-500
    px-2

    hover:(text-gray-700)
  ;

  &:not(:last-child) {
    @apply
     border-gray-500 border-r-1
    ;
  }
}
</style>
