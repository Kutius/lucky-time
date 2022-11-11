const RED_MAX = 33
const BLUE_MAX = 16

function randomCompose(max: number, count: number) {
  return Array.from({ length: max }, (_, index) => index + 1)
    .map((num, idx, arr) => {
      const rdmIdx = idx + Math.floor(Math.random() * (arr.length - idx))
      const v = arr[rdmIdx]
      arr[rdmIdx] = num
      return v
    })
    .slice(0, count)
}

export function publishLottery() {
  const lotteriesRed = randomCompose(RED_MAX, 6)
  const lotteriesBlue = randomCompose(BLUE_MAX, 1)
  return {
    lotteriesRed,
    lotteriesBlue,
  }
}

export function bugTickets() {
  // Buy 7 Red 2 Blue
  const ticketsRed = randomCompose(RED_MAX, 7)
  const ticketsBlue = randomCompose(BLUE_MAX, 2)
  return {
    ticketsRed,
    ticketsBlue,
  }
}

export function collide() {
  const { lotteriesRed, lotteriesBlue } = publishLottery()
  const { ticketsRed, ticketsBlue } = bugTickets()
  const redCollide = lotteriesRed.every(item => ticketsRed.includes(item))
  const blueCollide = ticketsBlue.includes(lotteriesBlue[0])

  return {
    redCollide,
    blueCollide,
    lotteriesRed,
    lotteriesBlue,
    ticketsRed,
    ticketsBlue,
  }
}

export const useLottery = () => {
  const result = reactive({
    redCollide: false,
    blueCollide: false,
    ticketsRed: Array.from({ length: 7 }) as number[],
    ticketsBlue: Array.from({ length: 2 }) as number[],
    lotteriesRed: Array.from({ length: 6 }) as number[],
    lotteriesBlue: Array.from({ length: 1 }) as number[],
  })
  const isBingo = computed(() => result.redCollide && result.blueCollide)

  const setResult = () => {
    const {
      redCollide, blueCollide,
      lotteriesRed, lotteriesBlue,
      ticketsRed, ticketsBlue,
    } = collide()
    result.redCollide = redCollide
    result.blueCollide = blueCollide
    result.lotteriesRed = lotteriesRed
    result.lotteriesBlue = lotteriesBlue
    result.ticketsRed = ticketsRed
    result.ticketsBlue = ticketsBlue
  }
  const refresh = () => setResult()

  setResult()

  return {
    results: result,
    isBingo,
    refresh,
  }
}
