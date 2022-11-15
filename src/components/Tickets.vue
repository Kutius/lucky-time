<script setup lang="ts">
defineProps<{
  shakingStatus: 'not-shaking' | 'shaking' | 'shaken'
  redTickets: number[]
  blueTickets: number[]
}>()
</script>

<template>
  <div class="nes-container is-dark with-title">
    <p class="title">
      Your-Tickets
    </p>
    <div flex justify-center gap-3 lg:gap-5>
      <div v-for="num in redTickets" :key="num" w-20 h-20 bg-red rounded-md>
        <i v-if="shakingStatus === 'not-shaking'" class="nes-icon trophy is-medium" top-4 />
        <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
      </div>
      <div v-for="num in blueTickets" :key="num" w-20 h-20 bg-blue rounded-md>
        <i v-if="shakingStatus === 'not-shaking'" class="nes-icon trophy is-medium" top-4 />
        <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
      </div>
    </div>
  </div>
</template>
