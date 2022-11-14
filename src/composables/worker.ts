import { collide } from './collide'

onmessage = () => {
  let times = 0

  while (true) {
    const {
      redCollide, blueCollide,
      lotteriesRed, lotteriesBlue,
      ticketsRed, ticketsBlue,
    } = collide()
    times += 1

    if (redCollide && blueCollide) {
      postMessage({
        times,
        lotteriesRed,
        lotteriesBlue,
        ticketsRed,
        ticketsBlue,
      })
      break
    }
  }
}
