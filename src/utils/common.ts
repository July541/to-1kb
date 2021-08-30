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

export const moveOneStep = (board: Board, direction: Direction): Board => {
  switch (direction) {
    case Direction.Up: return board
  }
  return board
}
