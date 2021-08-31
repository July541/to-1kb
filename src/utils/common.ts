import { Board, Direction } from "../types/control";

// https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
export const shuffle = <T>(arr: T[]) => {
  const shuffled = arr.slice(0)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled;
}

export const randomBetween = (min: number, max: number): number => {
  const range = max - min
  const rand = Math.random()
  return (min + Math.round(rand * range))
}

export const pickOne = <T>(arr: T[]): T  => {
  const idx = randomBetween(0, arr.length)
  return arr[idx]
}

export const moveOneStep = <T>(board: Board<T>, direction: Direction): Board<T> => {
  switch (direction) {
    case Direction.Up: return doUp(board)
    case Direction.Down: return doDown(board)
    case Direction.Left: return doLeft(board)
    case Direction.Right: return doLeft(board)
  }
}

const doUp = <T>(board: Board<T>): Board<T> => {
  var arrs = transpose(board.board)

  arrs = arrs.map(r => merge(r, board.canMerge, board.mergeRule))
             .map(r => fill(r, board.row, board.defaultValue))

  arrs = transpose(arrs)
  board.board = arrs
  return board
}

const doDown = <T>(board: Board<T>): Board<T> => {
  var arrs = transpose(board.board)
  arrs = arrs.map(r => r.reverse())

  arrs = arrs.map(r => merge(r, board.canMerge, board.mergeRule))
             .map(r => fill(r, board.row, board.defaultValue))

  arrs = arrs.map(r => r.reverse())
  arrs = transpose(arrs)

  board.board = arrs
  return board
}

const doLeft = <T>(board: Board<T>): Board<T> => {
  var arrs = board.board
  arrs = arrs.map(r => merge(r, board.canMerge, board.mergeRule))
             .map(r => fill(r, board.row, board.defaultValue))
  board.board = arrs
  return board
}

const doRight = <T>(board: Board<T>): Board<T> => {
  var arrs = board.board
  arrs = arrs.map(r => r.reverse())
  arrs = arrs.map(r => merge(r, board.canMerge, board.mergeRule))
             .map(r => fill(r, board.row, board.defaultValue))
  arrs = arrs.map(r => r.reverse())
  board.board = arrs
  return board
}

// TODO: unsafe for empty element.
const transpose = <T>(matrix: T[][]): T[][] => {
  const [row, col] = [matrix.length, matrix[0].length]
  const ret = []
  for (var i = 0; i < col; ++i) {
    const arr = []
    for (var j = 0; j < row; ++j) {
      arr.push(matrix[j][i])
    }
    ret.push(arr)
  }
  return ret
}

// Merge two a row with some rule as far as possible.

const merge = <T>(row: T[], canMerge: (t1: T, t2: T) => boolean, mergeRule: (t1: T, t2: T) => T): T[] => {
  while (row.length > 1) {
    const [v1, v2] = [row[0], row[1]]
    if (canMerge(v1, v2)) {
      const v = mergeRule(v1, v2)
      row = row.slice(2)
      row = [v].concat(row)
    } else {
      return row
    }
  }
  return row
}


const fill = <T>(lst: T[], len: number, value: T): T[] => {
  if (lst.length >= len) {
    return lst
  }

  const curLen = lst.length
  for (var i = 0; i < len - curLen; ++i) {
    lst.push(value)
  }
  return lst
}
