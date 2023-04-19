export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Leaderbord {
  nameOfGame: string,
  players:{
    0: {
      name: string,
      score: number,
      percentage: number
    }
    1: {
      name: string,
      score: number,
      percentage: number
    }
    2: {
      name: string,
      score: number,
      percentage: number
    }
    3: {
      name: string,
      score: number,
      percentage: number
    }
    4: {
      name: string,
      score: number,
      percentage: number
    }
    5: {
      name: string,
      score: number,
      percentage: number
    }
    6: {
      name: string,
      score: number,
      percentage: number
    }
    7: {
      name: string,
      score: number,
      percentage: number
    }
    8: {
      name: string,
      score: number,
      percentage: number
    }
    9: {
      name: string,
      score: number,
      percentage: number
    }
  }
}

export interface GameDetails {
  playerName: string,
  timeOfTheGame: string,
  eindTotaal: number,
  totalOfThrows: number,
  0: {
    pins: number,
    totalPins: number,
  }
  1: {
    pins: number,
    totalPins: number,
  }
  2: {
    pins: number,
    totalPins: number,
  }
  3: {
    pins: number,
    totalPins: number,
  }
  4: {
    pins: number,
    totalPins: number,
  }
  5: {
    pins: number,
    totalPins: number,
  }
  6: {
    pins: number,
    totalPins: number,
  }
  7: {
    pins: number,
    totalPins: number,
  }
  8: {
    pins: number,
    totalPins: number,
  }
  9: {
    pins: number,
    totalPins: number,
  }
}