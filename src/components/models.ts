export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Leaderbord {
  nameOfGame: string;
  board: {
    0: {
      name: string;
      Score: number;
    };
    1: {
      name: string;
      Score: number;
    };
    2: {
      name: string;
      Score: number;
    };
    3: {
      name: string;
      Score: number;
    };
    4: {
      name: string;
      Score: number;
    };
    5: {
      name: string;
      Score: number;
    };
    6: {
      name: string;
      Score: number;
    };
    7: {
      name: string;
      Score: number;
    };
    8: {
      name: string;
      Score: number;
    };
    9: {
      name: string;
      Score: number;
    };
  },
}

export interface detailVanGame {
  nameOfGame: string;
  name: string;
  turns: [
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    },
    {
      turn: number;
      pinsHit: number;
      score: number;
    }
  ];
  totalScore: number;
}
