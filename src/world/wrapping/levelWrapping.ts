import { tileIdIsFloor } from '../../tiles/tilleUtils'
import tileMap from '../../tiles/tileMap'
import {
  makeDirUtils,
  makeIsEmpy,
  isFloor,
  makeIsHorizontal,
  makeIsVertical,
} from '../../level/verifiers'
import { LevelMutator } from '../../level'

export const handleCorners = (level: LevelMutator) => (
  tileValue: number,
  key: string,
) => {
  _handleCorners(tileValue, makeDirUtils(key), level)
}

const _handleCorners: WrapHandler = (
  tileVale,
  { current, up, left, down, right, upLeft, upRight, downLeft, downRight },
  level,
) => {
  const corner = tileMap.blue.wall.corner

  if (level.isEmpty([up, left, upLeft])) {
    level.set(upLeft, corner.top.left[0])
    return
  }

  if (level.isEmpty([up, right, upRight])) {
    level.set(upRight, corner.top.right[0])
    return
  }

  if (level.isEmpty([down, right, downRight])) {
    level.set(downRight, tileMap.blue.wall.corner.bottom.right[0])
    return
  }

  if (level.isEmpty([down, left, downLeft])) {
    level.set(downLeft, corner.bottom.left[0])
    return
  }
}

export const handleTrivialWalls = (levelWithBorder: LevelMutator) => (
  tileValue,
  key,
) => {
  _handleTrivialWalls(tileValue, makeDirUtils(key), levelWithBorder)
}

const _handleTrivialWalls: WrapHandler = (
  tileValue,
  { current, up, left, down, right, upLeft, upRight, downLeft, downRight },
  levelWithBorder,
) => {
  if (!tileIdIsFloor(tileValue)) {
    return
  }

  const wall = tileMap.blue.wall
  if (levelWithBorder._isEmpty(up)) {
    levelWithBorder.set(up, wall.horizontal.clean[0])
  }

  if (levelWithBorder._isEmpty(down)) {
    levelWithBorder.set(down, wall.horizontal.clean[0])
  }

  if (levelWithBorder._isEmpty(left)) {
    levelWithBorder.set(left, wall.vertical.clean[0])
  }
  if (levelWithBorder._isEmpty(right)) {
    levelWithBorder.set(right, wall.vertical.clean[0])
  }
}
// export const handleEdgeCases = levelWithBorder => (tileValue, key) => {
//   const pointIsFloor = isFloor(levelWithBorder)
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])

//   /**
//    *
//    *  C?
//    *  xx
//    */
//   if (
//     !pointIsFloor(dirs.right) &&
//     !pointIsFloor([x + 2, y]) &&
//     !pointIsFloor(dirs.upRight) &&
//     pointIsFloor(dirs.downRight)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.right),
//       tileMap.blue.wall.corner.bottom.left,
//     )
//   }

//   /**
//    *
//    *  ?C
//    *  xx
//    */
//   if (
//     !pointIsFloor(dirs.left) &&
//     !pointIsFloor([x - 2, y]) &&
//     !pointIsFloor(dirs.upLeft) &&
//     pointIsFloor(dirs.downLeft)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.left),
//       tileMap.blue.wall.corner.bottom.right,
//     )
//   }
//   /**
//    *
//    *  xx
//    *  ?C
//    */
//   if (
//     !pointIsFloor(dirs.left) &&
//     !pointIsFloor([x - 2, y]) &&
//     !pointIsFloor(dirs.downLeft) &&
//     pointIsFloor(dirs.upLeft)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.left),
//       tileMap.blue.wall.corner.top.right,
//     )
//   }
//   /**
//    *
//    *  xx
//    *  C?
//    */
//   if (
//     !pointIsFloor(dirs.right) &&
//     !pointIsFloor([x + 2, y]) &&
//     !pointIsFloor(dirs.downRight) &&
//     pointIsFloor(dirs.upRight)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.right),
//       tileMap.blue.wall.corner.top.left,
//     )
//   }
// }

// export const handleSingle = (levelWithBorder: PointMap) => (tileValue, key) => {
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }

//   const isFree = makeIsEmpy(levelWithBorder)
//   const isFloor = isFloor(levelWithBorder)
//   const [x, y] = JSON.parse(key)

//   const dirs = makeDirUtils([x, y])

//   if (
//     isFree(dirs.right) &&
//     isFloor(dirs.upRight) &&
//     isFloor(dirs.downRight) &&
//     isFloor([x + 2, y])
//   ) {
//     levelWithBorder.set(JSON.stringify(dirs.right), 50)
//   }
// }

// export const handleDeadEnds = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])
//   const isFree = makeIsEmpy(levelWithBorder)
//   const isFloor = isFloor(levelWithBorder)

//   if (!isFloor([x, y])) {
//     return
//   }
//   /**
//    *  xxx
//    *  o?x
//    */

//   if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor([x + 2, y])) {
//     levelWithBorder.set(
//       JSON.stringify([x + 1, y]),
//       tileMap.blue.wall.deadEnd.top,
//     )
//   }

//   /**
//    *  xxxx
//    *  o? x
//    *  xxxx
//    */

//   if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor(dirs.downRight)) {
//     levelWithBorder.set(
//       JSON.stringify([x + 1, y]),
//       tileMap.blue.wall.deadEnd.left,
//     )
//   }
//   // if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor([x + 2, y])) {
//   //   levelWithBorder.set(
//   //     JSON.stringify([x + 1, y]),
//   //     tileMap.blue.wall.deadEnd.top,
//   //   )
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.top.left[0]){

//   // }

//   // if (tileValue === tileMap.blue.wall.vertical.clean[0]) {
//   //   if (isFloor(dirs.up)) {
//   //     levelWithBorder.set(JSON.stringify([x, y]), 55)
//   //   } else if (isFloor(dirs.down)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.bottom,
//   //     )
//   //   }
//   //   return
//   // }
//   // if (tileValue === tileMap.blue.wall.horizontal.clean[0]) {
//   //   if (isFloor(dirs.left)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.left,
//   //     )
//   //   } else if (isFloor(dirs.right)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.right,
//   //     )
//   //   }
//   // }
// }

// export const handleCornerConnections = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])

//   const isFloor = isFloor(levelWithBorder)
//   const isHorizonal = makeIsHorizontal(levelWithBorder)
//   const isVertival = makeIsVertical(levelWithBorder)
//   // const isFree = makeIsEmpy(levelWithBorder)

//   if (tileValue === tileMap.blue.wall.corner.top.left[0]) {
//     if (isFloor(dirs.left) && isVertival(dirs.up)) {
//       levelWithBorder.set(
//         JSON.stringify([x, y]),
//         tileMap.blue.wall.connection.top.left.case1[0],
//       )
//       return
//     }
//     if (isHorizonal(dirs.left)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 34)
//       return
//     }
//   }

//   if (tileValue === tileMap.blue.wall.corner.top.right[0]) {
//     if (isFloor(dirs.right) && isVertival(dirs.up)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 19)
//       return
//     }
//     // if (isHorizonal(dirs.left)) {
//     //   levelWithBorder.set(JSON.stringify([x, y]), 34)
//     //   return
//     // }
//   }

//   if (tileValue === tileMap.blue.wall.corner.bottom.left[0]) {
//     if (isHorizonal(dirs.left) && isFloor(dirs.down)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 49)
//       return
//     }
//     if (isFloor(dirs.left) && isVertival(dirs.down)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 16)
//       return
//     }
//     // if (isFloor(dirs.left) && isVertival(dirs.up)) {
//     //   levelWithBorder.set(
//     //     JSON.stringify([x, y]),
//     //     tileMap.blue.wall.connection.top.left.case1[0],
//     //   )
//     //   return
//     // }
//     // if (isHorizonal(dirs.left)) {
//     //   levelWithBorder.set(JSON.stringify([x, y]), 34)
//     //   return
//     // }
//   }
//   // if (tileValue === tileMap.blue.wall.corner.top.right[0]) {
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.bottom.left[0]) {
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.bottom.right[0]) {
//   // }
// }

type WrapHandler = (
  t: number,
  dirs: DirConvinience,
  level: LevelMutator,
) => void

export type DirConvinience = {
  current: Point
  up: Point
  left: Point
  down: Point
  right: Point
  upLeft: Point
  upRight: Point
  downLeft: Point
  downRight: Point
}
