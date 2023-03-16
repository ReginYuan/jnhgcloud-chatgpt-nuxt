<template>
  <client-only>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </client-only>
</template>
<script setup>
import { onMounted } from 'vue'
import { geTokenAll } from '~/composables/utils/validate'
onMounted(() => {
  geTokenAll()
})
</script>