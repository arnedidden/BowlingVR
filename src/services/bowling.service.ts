import { Leaderbord} from 'src/components/models';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
const bowlgame = ref();

const useBowling = () => {
  const getLeaderbordForGame = (id: number) => {
        const gameInfo = async() => {
             const result = await api.get(`/${id}`)
             return bowlgame.value = result.data;
          }
        gameInfo();
    const maxScore = 100;
    //percentageberekening: behaalde score / maximale score * 100
    const percentage = [];
    for (let i = 0; i < 11; i++) {
      percentage.push((bowlgame.value.leaderbord.turns.turn[i].score / maxScore) * 100); //hier moet het percentage berekend worden later. i veranderd naar behaalde score: i.score bv.
    }
    const game: Leaderbord = {
      nameOfGame: bowlgame.value.name,
      board: {
        name: bowlgame.value.leaderbord.name,
        turns: [
          {
              turn: bowlgame.value.leaderbord.turns.turn[0].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[0].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[0].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[1].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[1].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[1].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[2].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[2].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[2].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[3].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[3].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[3].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[4].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[4].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[4].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[5].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[5].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[5].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[6].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[6].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[6].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[7].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[7].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[7].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[8].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[8].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[8].score
          },
          {
              turn: bowlgame.value.leaderbord.turns.turn[9].turn,
              pinsHit: bowlgame.value.leaderbord.turns.turn[9].pinsHit,
              score: bowlgame.value.leaderbord.turns.turn[9].score
          },
          
      ],
        totalScore: bowlgame.value.totalScore,
    }
    };
    return { game };
  };

  
  return {
    getLeaderbordForGame,
  };
};

export { useBowling };
