import { Leaderbord } from 'src/components/models';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
const bowlgame = ref();

const useBowling = () => {
  const getLeaderbordForGame = (id: string) => {
    const gameInfo = async () => {
      const result = await api.get(`/${id}`);
      return (bowlgame.value = result.data);
    };
    gameInfo();
    const maxScore = 100;
    //percentageberekening: behaalde score / maximale score * 100
    const percentage = [];
    for (let i = 0; i < 11; i++) {
      percentage.push(
        (bowlgame.value.leaderbord.turns.turn[i].score / maxScore) * 100
      ); //hier moet het percentage berekend worden later. i veranderd naar behaalde score: i.score bv.
    }
    const game: Leaderbord = {
      nameOfGame: bowlgame.value.name,
      board: {
        0: {
          name: bowlgame.value.leaderbord[0].name,
          Score: bowlgame.value.leaderbord[0].totalScore,
        },
        1: {
          name: bowlgame.value.leaderbord[1].name,
          Score: bowlgame.value.leaderbord[1].totalScore,
        },
        2: {
          name: bowlgame.value.leaderbord[2].name,
          Score: bowlgame.value.leaderbord[2].totalScore,
        },
        3: {
          name: bowlgame.value.leaderbord[3].name,
          Score: bowlgame.value.leaderbord[3].totalScore,
        },
        4: {
          name: bowlgame.value.leaderbord[4].name,
          Score: bowlgame.value.leaderbord[4].totalScore,
        },
        5: {
          name: bowlgame.value.leaderbord[5].name,
          Score: bowlgame.value.leaderbord[5].totalScore,
        },
        6: {
          name: bowlgame.value.leaderbord[6].name,
          Score: bowlgame.value.leaderbord[6].totalScore,
        },
        7: {
          name: bowlgame.value.leaderbord[7].name,
          Score: bowlgame.value.leaderbord[7].totalScore,
        },
        8: {
          name: bowlgame.value.leaderbord[8].name,
          Score: bowlgame.value.leaderbord[8].totalScore,
        },
        9: {
          name: bowlgame.value.leaderbord[9].name,
          Score: bowlgame.value.leaderbord[9].totalScore,
        },
        },
    };
    console.log(game);
    const topTen = () => {
      
    }
    return { game };
  };

  return {
    getLeaderbordForGame,
  };
};

export { useBowling };
