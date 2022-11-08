/* eslint-disable no-console */
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

function publishLottery() {
  const lotteriesRed = randomCompose(RED_MAX, 6)
  const lotteriesBlue = randomCompose(BLUE_MAX, 1)
  return {
    lotteriesRed,
    lotteriesBlue,
  }
}

function bugTickets() {
  // Buy 7 Red 2 Blue
  const ticketsRed = randomCompose(RED_MAX, 7)
  const ticketsBlue = randomCompose(BLUE_MAX, 2)
  return {
    ticketsRed,
    ticketsBlue,
  }
}

function collide() {
  const { lotteriesRed, lotteriesBlue } = publishLottery()
  const { ticketsRed, ticketsBlue } = bugTickets()
  const redCollide = lotteriesRed.every(item => ticketsRed.includes(item))
  const blueCollide = ticketsBlue.includes(lotteriesBlue[0])

  return {
    redCollide,
    blueCollide,
    lotteries: {
      lotteriesRed,
      lotteriesBlue,
    },
    tickets: {
      ticketsRed,
      ticketsBlue,
    },
  }
}

function main() {
  let times = 0
  while (true) {
    const { redCollide, blueCollide, tickets, lotteries } = collide()
    const { ticketsRed, ticketsBlue } = tickets
    const { lotteriesRed, lotteriesBlue } = lotteries

    if (redCollide && blueCollide) {
      console.log('----------------')
      console.log('中奖了')
      console.log('中奖号码', lotteriesRed, lotteriesBlue)
      console.log('购买号码', ticketsRed, ticketsBlue)
      console.log('购买次数', times)
      console.log(`花了${(times / 3 / 52).toFixed(2)}年`)
      console.log('----------------')
      return
    }
    times++
    console.log(`第${times}次`)
  }
}

main()
