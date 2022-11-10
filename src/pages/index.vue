<script setup lang="ts">
let redNum = $ref(Array.from({ length: 6 }) as number[])
let blueNum = $ref(Array.from({ length: 1 }) as number[])
let redTick = $ref(Array.from({ length: 7 }) as number[])
let blueTick = $ref(Array.from({ length: 2 }) as number[])

let isOpen = $ref(false)
let times = $ref(0)

const { lotteries, refresh, isBingo } = useLottery()
const { lotteries: fakeText, refresh: refreshFakeText } = useLottery()

const {
  lotteriesRed, lotteriesBlue,
  ticketsRed, ticketsBlue,
} = $(lotteries)

// const { pause, resume } = useIntervalFn(() => {
//   refresh()
// }, 1, { immediate: false })
const { pause, resume } = useIntervalFn(() => {
  refreshFakeText()
  redNum = fakeText.lotteriesRed
  blueNum = fakeText.lotteriesBlue
  redTick = fakeText.ticketsRed
  blueTick = fakeText.ticketsBlue
}, 1, { immediate: false })

const handleShaking = () => {
  isOpen = true
  resume()
  while (true) {
    refresh()
    if (isBingo.value)
      break
    times++
  }
  redNum = lotteriesRed
  blueNum = lotteriesBlue
  redTick = ticketsRed
  blueTick = ticketsBlue
  pause()
}

watchEffect(() => {
  if (isBingo.value)
    pause()
})
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
    <div class="px-10% lg:px-16%">
      <div class="nes-container is-dark with-title">
        <p class="title">
          Lucky-Number
        </p>
        <div flex justify-center gap-3 lg:gap-5>
          <div v-for="num in redNum" :key="num" w-20 h-20 bg-red rounded-md>
            <i v-if="!isOpen" class="nes-icon coin is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
          <div v-for="num in blueNum" :key="num" w-20 h-20 bg-blue rounded-md>
            <i v-if="!isOpen" class="nes-icon coin is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
        </div>
        <button class="nes-btn is-primary" mt-8 @click="handleShaking">
          Shaking
        </button>
      </div>

      <div py-6 text-xl>
        {{ isOpen && `${times} Times, about ${(times / 3 / 52).toFixed(2)} Years` || undefined }}
      </div>

      <div class="nes-container is-dark with-title">
        <p class="title">
          Your-Tickets
        </p>
        <div flex justify-center gap-3 lg:gap-5>
          <div v-for="num in redTick" :key="num" w-20 h-20 bg-red rounded-md>
            <i v-if="!isOpen" class="nes-icon trophy is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
          <div v-for="num in blueTick" :key="num" w-20 h-20 bg-blue rounded-md>
            <i v-if="!isOpen" class="nes-icon trophy is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
        </div>
        <button class="nes-btn is-primary" mt-8 @click="handleShaking">
          Shaking
        </button>
      </div>
    </div>
  </div>
</template>
