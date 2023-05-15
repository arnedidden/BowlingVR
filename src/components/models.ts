export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Turn {
  turn: number,
  score: number
}

export interface LeaderboardItem {
  name: string,
  turns: Array<Turn>,
  totalScore: number
}

export interface Game {
  _id: string,
  name: string,
  bowlingBall: {
    color: string
  },
  bowlingPins: {
    color: string
  },
  bowlingLane: {
    color: string
  },
  leaderboard: Array<LeaderboardItem>
}

