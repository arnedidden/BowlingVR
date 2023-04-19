import { Leaderbord, GameDetails } from "src/components/models"
import { ref } from "vue";


const useBowling = () => {
    const getLeaderbordForGame = (id: number)=> {
        //uncommented when api is ready. this is based off of pure brainstorm. this needs to be coded correctly according to how the json file is coded
        /*const bowlgame = ref();
        const gameInfo = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                //uncommented when api is ready
             /*api
                .get('/game/${id}', {
                  bowlgame.value
                })
                .then((result: { data: { game } }) => {
                  if (id) {
                    
                    resolve();
                  } else {
                    alert('No leaderbord to display');
                    reject();
                  };
                })
                .catch((error) => {
                  console.log(error);
                  alert('No leaderbord to display');
                  reject();
                });
            })
          }
        }*/
        const maxScore = 100;
        //percentageberekening: behaalde score / maximale score * 100
        const percentage = [];
        for (let i = 0; i < 11; i++){
            percentage.push(i / maxScore * 100); //hier moet het percentage berekend worden later. i veranderd naar behaalde score: i.score bv.
        }
        const game: Leaderbord = {
            nameOfGame: 'bowling',
            players:{
                0: {
                    name: 'Sem',
                    score: 80,
                    percentage: 80
                },
                1: {
                    name: 'Lana',
                    score: 50,
                    percentage: 50
                },
                2: {
                    name: 'Arne',
                    score: 55,
                    percentage: 55
                },
                3: {
                    name: 'Bart',
                    score: 100,
                    percentage: 100
                },
                4: {
                    name: 'Bert',
                    score: 33,
                    percentage: 33
                },
                5: {
                    name: 'John',
                    score: 76,
                    percentage: 76
                },
                6: {
                    name: 'Doe',
                    score: 49,
                    percentage: 49
                },
                7: {
                    name: 'Uno',
                    score: 1,
                    percentage: 1
                },
                8: {
                    name: 'Dos',
                    score: 2,
                    percentage: 2
                },
                9: {
                    name: 'tres',
                    score: 3,
                    percentage: 3
                }
            }
        }
        return{game};
    }

    const getDetailsForLeaderbordGame = (gameId: number, playerId: number) => {
//uncommented when api is ready. this is based off of pure brainstorm. this needs to be coded correctly according to how the json file is coded
        /*const bowlgame = ref();
        const gameInfo = (): Promise<void> => {
            return new Promise((resolve, reject) => {
                //uncommented when api is ready
             /*api
                .get('/game/${gameId}/${playerId}', {
                  bowlgame.value
                })
                .then((result: { data: { game } }) => {
                  if (id) {
                    
                    resolve();
                  } else {
                    alert('No game to display');
                    reject();
                  };
                })
                .catch((error) => {
                  console.log(error);
                  alert('No game to display');
                  reject();
                });
            })
          }
        }*/
        const gameDetails: GameDetails = {
            playerName: "name of player",
            timeOfTheGame: "15:15:36",
            eindTotaal: 6 + 8 + 10 + 6 + 3 + 6 + 5 + 6 + 2 + 6 + 6,
            totalOfThrows: 10,
            0: {
              pins: 6,
              totalPins: 6,
            },
            1: {
              pins: 8,
              totalPins: 6 + 8,
            },
            2: {
              pins: 10,
              totalPins: 6 + 8 + 10,
            },
            3: {
              pins: 3,
              totalPins: 6 + 8 + 10 + 6 + 3,
            },
            4: {
              pins: 6,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6,
            },
            5: {
              pins: 5,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6 + 5,
            },
            6: {
              pins: 6,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6 + 5 + 6,
            },
            7: {
              pins: 2,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6 + 5 + 6 + 2,
            },
            8: {
              pins: 6,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6 + 5 + 6 + 2 + 6,
            },
            9: {
              pins: 6,
              totalPins: 6 + 8 + 10 + 6 + 3 + 6 + 5 + 6 + 2 + 6 + 6,
            }
        }
        return gameDetails;
    }
    return{
        getLeaderbordForGame,
        getDetailsForLeaderbordGame
    }
}

export {useBowling};