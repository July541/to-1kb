export enum Direction {
  Up
, Down
, Left
, Right
}

export type Vector = {
  x: number
, y: number
}

export const DirPos: Record<keyof typeof Direction, Vector> = {
  Up: { x: -1, y: 0 }
, Down: { x: 1, y: 0 }
, Left: { x: 0, y: -1 }
, Right: { x: 0, y: 1 }
}

export type Board = {
  board: number[][]
, display: string[][]
, row: number
, column: number
}
