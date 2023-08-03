<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { onMounted } from 'vue'
import { geTokenAll } from '~/utils/validate'
onMounted(() => {
  geTokenAll()
})
</script>