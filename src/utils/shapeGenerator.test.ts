import { createRoom } from './shapeGenerator'

describe('createRoom function', () => {
  it('return the right value ', () => {
    const result = new Map([
      [[8, 9], 129],
      [[8, 10], 129],
      [[8, 11], 129],
      [[8, 12], 129],
      [[9, 9], 129],
      [[9, 10], 129],
      [[9, 11], 129],
      [[9, 12], 129],
      [[10, 9], 129],
      [[10, 10], 129],
      [[10, 11], 129],
      [[10, 12], 129],
    ])
    expect(createRoom(3, 4, [8, 9])).toEqual(result)
  })
})
