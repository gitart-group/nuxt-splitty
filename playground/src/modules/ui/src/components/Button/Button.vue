<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  @apply
    px-4 py-2
    rounded-lg
    outline-none
    transition-all duration-200
    bg-purple-300
    text-white
    hover:(bg-purple-400)
  ;
}
</style>
