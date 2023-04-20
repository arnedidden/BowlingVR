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
      id: number
      name: string,
      score: number,
      percentage: number
    }
    1: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    2: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    3: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    4: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    5: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    6: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    7: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    8: {
      id: number
      name: string,
      score: number,
      percentage: number
    }
    9: {
      id: number
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