import { flow } from 'lodash'
import {
  paintGrid,
  pointMaptoGrid,
  shiftPointMapOutOfNegative,
} from './helpers'
import {
  createRoomOnDirection,
  nextRoom,
  addRoomToPointMap,
} from './shapeGenerator'

export const cookUpLevel = (
  seed: IRoom = { height: 2, width: 2, coords: [0, 0] },
  steps: number = 20,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  for (let i = 0; i < steps; i++) {
    const level: PointMap = addRoomToPointMap(result)

    const curr = result[result.length - 1]

    const res = nextRoom(level, curr)

    if (res) {
      const roomToAdd = createRoomOnDirection(res.dir, {
        width: res.width,
        height: res.width,
      })
      result.push(roomToAdd)
    }
  }
  return result
}

export const makeLevel = () => {
  const rooms = cookUpLevel()
  const level = flow(
    addRoomToPointMap,
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    paintGrid(292),
  )(rooms)

  return level
}