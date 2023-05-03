export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Leaderbord {
  nameOfGame: string,
      board: {
        name: string,
        turns: [
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            },
            {
                turn: number,
                pinsHit: number
                score: number
            }
        ],
        totalScore: number
      }
}