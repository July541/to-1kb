import { Lang, storageInfo } from "../i18n"
import { pickOne } from "../utils/common"
import { mergeStorages, numberToStorageKey, StorageAlias, StorageSeps } from "./StorageAlias"

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

export type BoardItem = string

export class Board1<T> {
  board: number[][]
  display: string[][]
  row: number
  column: number
  supportedLang: Lang[]

  static defaultEmpty = -1

  constructor(board: number[][], supportedLang: Lang[]) {
    this.board = board
    this.row = board.length
    this.column = board.length
    this.supportedLang = supportedLang

    this.display = (new Array(this.row)).map(_ => new Array(this.column))
  }

  public setSupportedLang(langs: Lang[]): void {
    this.supportedLang = langs
  }

  public toDisplay(): void {
    const info = this.supportedLang.map(storageInfo).reduce(mergeStorages)
    let keys: typeof info
    this.display = this.board.map(row => row.map(item => {
      if (item === Board1.defaultEmpty) {
        return ""
      }
      for (const val of StorageSeps.reverse().slice(1)) {
        if (item % val === 0) {
          let key = numberToStorageKey[item / val]
          return (item / val) + pickOne(info[key])
        }
      }
      return item + pickOne(info[1])
    }))
  }
}

export type Board<T> = {
  board: T[][]
, display: BoardItem[][]
, row: number
, column: number
, toDisplay: () => void
, canMerge: (v1: T, v2: T) => boolean
, mergeRule: (v1: T, v2: T) => T
, defaultValue: T
, supportedLang: Lang[]
}

export const defaultBoardToDisplay = (board: number[][], langs: Lang[]) => {
  const info = langs.map(l => storageInfo(l)).reduce(mergeStorages)

}
