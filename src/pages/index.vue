<script setup lang="ts">
interface WorkerMsg {
  times: number
  lotteriesRed: number[]
  lotteriesBlue: number[]
  ticketsRed: number[]
  ticketsBlue: number[]
}
type ShakingStatus = 'not-shaking' | 'shaking' | 'shaken'

let shakingStatus = $ref<ShakingStatus>('not-shaking')
let initialTimeStamp = $ref<number | undefined>()

const { count, set: setCount } = useCounter()
const { results: fakeText, refresh: refreshFakeText } = useLottery()
const { data: workerResponse, post } = useWebWorker<WorkerMsg>(
  () => (new Worker(new URL('~/composables/worker.ts', import.meta.url), { type: 'module' })),
)
const {
  timestamp: currentTimeStamp,
  pause: pauseTime,
  resume: resumeTime,
} = useTimestamp({ controls: true })

const timesTaken = $computed(() => {
  const timeSpent = currentTimeStamp.value - initialTimeStamp!
  // magic
  return (196.6 * timeSpent - 9533).toFixed(0)
})

const { pause: pauseRefresh, resume: resumeRefresh } = useIntervalFn(() => {
  refreshFakeText()
  setCount(Number(timesTaken))
}, 50, { immediate: false })

const useWorker = () => {
  post('start')
}

const redBalls = $computed(() => {
  if (shakingStatus === 'not-shaking')
    return Array.from<number>({ length: 6 })

  else if (shakingStatus === 'shaking')
    return fakeText.lotteriesRed

  else
    return workerResponse.value.lotteriesRed
})

const blueBalls = $computed(() => {
  if (shakingStatus === 'not-shaking')
    return Array.from<number>({ length: 1 })

  else if (shakingStatus === 'shaking')
    return fakeText.lotteriesBlue

  else
    return workerResponse.value.lotteriesBlue
})

const redTickets = $computed(() => {
  if (shakingStatus === 'not-shaking')
    return Array.from<number>({ length: 7 })

  else if (shakingStatus === 'shaking')
    return fakeText.ticketsRed

  else
    return workerResponse.value.ticketsRed
})

const blueTickets = $computed(() => {
  if (shakingStatus === 'not-shaking')
    return Array.from<number>({ length: 2 })

  else if (shakingStatus === 'shaking')
    return fakeText.ticketsBlue

  else
    return workerResponse.value.ticketsBlue
})

watchEffect(() => {
  if (workerResponse.value) {
    pauseRefresh()
    pauseTime()
    setCount(workerResponse.value.times)
    shakingStatus = 'shaken'
  }
})

const init = () => {
  setCount(0)
  initialTimeStamp = Date.now()
  resumeTime()
  resumeRefresh()
}

const handleShaking = () => {
  shakingStatus = 'shaking'
  init()

  useWorker()
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
    <div class="px-10% lg:px-16%">
      <div class="nes-container is-dark with-title">
        <p class="title">
          Lucky-Number
        </p>
        <div flex justify-center gap-3 lg:gap-5>
          <div v-for="num in redBalls" :key="num" w-20 h-20 bg-red rounded-md>
            <i v-if="shakingStatus === 'not-shaking'" class="nes-icon coin is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
          <div v-for="num in blueBalls" :key="num" w-20 h-20 bg-blue rounded-md>
            <i v-if="shakingStatus === 'not-shaking'" class="nes-icon coin is-medium" top-4 />
            <span v-else text-4xl lh-21 ml-1>{{ num }}</span>
          </div>
        </div>
        <button
          class="nes-btn"
          :class="{ 'is-disabled': shakingStatus === 'shaking' }"
          mt-8
          :disabled="shakingStatus === 'shaking'"
          @click="handleShaking"
        >
          {{ shakingStatus === 'shaken' ? 'Reset' : 'Shaking' }}
        </button>
      </div>

      <div py-6 text-xl>
        {{ shakingStatus !== 'not-shaking' && `${count} Times, about ${(count / 3 / 52).toFixed(2)} Years` || undefined }}
      </div>

      <Tickets
        :shaking-status="shakingStatus"
        :red-tickets="redTickets"
        :blue-tickets="blueTickets"
      />

      <Dialogs />
    </div>
  </div>
</template>
