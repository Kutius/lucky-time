<script setup lang="ts">
interface coin {
  value: number
  type: 'red' | 'blue'
  isOpen: boolean
}

const red = $ref([1, 2, 3, 4, 5, 6])
let shakeBlue = $ref(3)

const { pause, resume, isActive } = useIntervalFn(() => {
  shakeBlue = Math.floor(Math.random() * 6) + 1
}, 600, { immediate: false })

const handleShaking = () => {
  resume()
}
</script>

<template>
  <div>
    <div i-carbon-money text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="#" target="_blank">
        Lucky Time
      </a>
    </p>
    <p>
      <em text-sm op75>Find out Your Lucky Time.</em>
    </p>

    <div py-4 />
    <div class="px-10% lg:px-18%">
      <div class="nes-container is-dark with-title">
        <p class="title">
          Lucky-Number
        </p>
        <div flex justify-center gap-3 lg:gap-5>
          <div v-for="num in red" :key="num" w-20 h-20 bg-red rounded-md>
            <i class="nes-icon coin is-medium" top-4 />
          </div>
          <div w-20 h-20 bg-blue rounded-md>
            <!-- <i class="nes-icon coin is-medium" top-4 /> -->
            <span text-5xl lh-20>{{ shakeBlue }}</span>
          </div>
        </div>
        <button v-if="!isActive" class="nes-btn is-primary" mt-8 @click="handleShaking">
          Shaking
        </button>
        <button v-if="isActive" class="nes-btn is-primary" mt-8 @click="pause">
          Stop
        </button>
      </div>
    </div>
  </div>
</template>
