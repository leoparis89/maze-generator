import tileMap from '../tiles/tileMap'
import {
  _nextRoom,
  enoughSpace,
  getPossibleDirections,
  makeIsFree,
} from './mazeLogic'
import { roomsToPointMap } from './transformations'

describe('addRoomToPointMap', () => {
  it('should add rooms to level (case 1)', () => {
    const rooms: IRoom[] = [
      { height: 2, width: 1, coords: [9, 9] },
      { height: 2, width: 2, coords: [4, 3] },
    ]

    const result = new Map([
      ['[9,9]', true],
      ['[9,10]', true],
      ['[4,3]', true],
      ['[4,4]', true],
      ['[5,3]', true],
      ['[5,4]', true],
    ])
    expect(roomsToPointMap(rooms, new Map())).toEqual(result)
  })
})

describe('enoughSpace function', () => {
  // it('should return false if there is no room', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(enoughSpace(level, { coords: [0, 4], dir: 'down' })).toEqual(false)

  //   expect(enoughSpace(level, { coords: [4, 0], dir: 'left' })).toEqual(false)
  // })

  // it('should return false if there is no room (edge case)', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(
  //     enoughSpace(
  //       level,
  //       { coords: [0, 4], dir: 'down' },
  //       { width: 8, height: 2 },
  //     ),
  //   ).toEqual(false)
  // })

  it('should return true if there is room (case up)', () => {
    const rooms: IRoom[] = [{ height: 4, width: 4, coords: [4, 4] }]
    const level = roomsToPointMap(rooms)

    expect(enoughSpace(level, { coords: [4, 4], dir: 'up' })).toEqual(true)
  })

  it('should return true if there is room (depth case up 2 spaces left)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 2, width: 4, coords: [4, 0] },
    ]
    const level = roomsToPointMap(rooms)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 2 },
      ),
    ).toEqual(true)
  })

  it('lego case up (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 3]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)
  })

  it('lego case up (2x2)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 3]))
    level.delete(JSON.stringify([4, 2]))
    level.delete(JSON.stringify([3, 3]))
    level.delete(JSON.stringify([3, 2]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 2, width: 2 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'up' },
        { height: 3, width: 2 },
      ),
    ).toEqual(false)
  })

  it('lego case left (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([3, 4]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'left' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 4], dir: 'left' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)
  })

  it('lego case down (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([4, 8]))

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)

    expect(
      enoughSpace(
        level,
        { coords: [4, 7], dir: 'down' },
        { height: 1, width: 2 },
      ),
    ).toEqual(false)
    // expect(
    //   enoughSpace(
    //     level,
    //     { coords: [4, 7], dir: 'down' },
    //     { height: 2, width: 1 },
    //   ),
    // ).toEqual(false)
  })

  it('lego case right (1x1)', () => {
    const rooms: IRoom[] = [
      { height: 4, width: 4, coords: [4, 4] },
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 1, width: 1 },
      ),
    ).toEqual(true)

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 2, width: 1 },
      ),
    ).toEqual(false)

    expect(
      enoughSpace(
        level,
        { coords: [7, 4], dir: 'right' },
        { height: 1, width: 2 },
      ),
    ).toEqual(false)
  })

  // it('should return true if there is room (edge case)', () => {
  //   const rooms: IRoom[] = [
  //     { height: 4, width: 4, coords: [0, 0] },
  //     { height: 4, width: 4, coords: [0, 5] },
  //   ]
  //   const level = roomReducer(rooms)

  //   expect(
  //     enoughSpace(
  //       level,
  //       { coords: [0, 4], dir: 'down' },
  //       { width: 8, height: 1 },
  //     ),
  //   ).toEqual(true)
  // })
})

describe('getPossibleDirections function', () => {
  it('should return the right value', () => {
    expect(
      getPossibleDirections({ height: 2, width: 2, coords: [0, 0] }),
    ).toEqual([
      { coords: [0, 0], dir: 'left' },
      { coords: [0, 0], dir: 'up' },
      { coords: [0, 1], dir: 'left' },
      { coords: [0, 1], dir: 'down' },
      { coords: [1, 0], dir: 'right' },
      { coords: [1, 0], dir: 'up' },
      { coords: [1, 1], dir: 'right' },
      { coords: [1, 1], dir: 'down' },
    ])
  })
})

describe('next room', () => {
  it('should return the next possible room (case room on right)', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))
    expect(_nextRoom(level, currentRoom, { height: 1, width: 1 })).toEqual({
      dir: { coords: [7, 4], dir: 'right' },
      height: 1,
      width: 1,
    })
  })

  it('should return the next possible room (case room on top)', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([5, 3]))
    expect(_nextRoom(level, currentRoom, { height: 1, width: 1 })).toEqual({
      dir: { coords: [5, 4], dir: 'up' },
      height: 1,
      width: 1,
    })
  })

  it('should return null if there is no next possible room', () => {
    const currentRoom: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const rooms: IRoom[] = [
      currentRoom,
      { height: 100, width: 100, coords: [1, 1] },
    ]
    const level = roomsToPointMap(rooms)
    level.delete(JSON.stringify([8, 4]))
    expect(_nextRoom(level, currentRoom, { height: 2, width: 1 })).toEqual(null)
    expect(_nextRoom(level, currentRoom, { height: 1, width: 2 })).toEqual(null)
  })
})

describe.skip('wrapLevel', () => {
  it('should add top border', () => {
    const room: IRoom = { height: 4, width: 4, coords: [4, 4] }
    const level = roomsToPointMap([room])
    // const wrapped = wrapLevel(level)
    // expect(wrapped.get('[4,3]')).toEqual(tileMap.blue.wall.horizontal.clean[0])
    // expect(wrapped.get('[5,3]')).toEqual(tileMap.blue.wall.horizontal.clean[0])
    // expect(wrapped.get('[6,3]')).toEqual(tileMap.blue.wall.horizontal.clean[0])

    // expect(wrapped.get('[4,8]')).toEqual(undefined)
    // expect(wrapped.get('[5,8]')).toEqual(undefined)
    // expect(wrapped.get('[6,8]')).toEqual(undefined)
  })
})
// describe('isFree', () => {
//   it('should return true if provided cell contains no floor', () => {
//     const room: IRoom = {
//       type: 'suite',
//       height: 4,
//       width: 4,
//       coords: [0, 0],
//     }
//     const level = roomsToPointMap([room])
//     const isFree = makeIsFree(level)
//     expect(isFree([0, 4])).toEqual(true)
//   })

//   it('should return true if provided cell contains floor', () => {
//     const room: IRoom = {
//       type: 'suite',
//       height: 4,
//       width: 4,
//       coords: [0, 0],
//     }
//     const level = roomsToPointMap([room])
//     const isFree = makeIsFree(level)
//     expect(isFree([0, 3])).toEqual(false)
//   })
// })
