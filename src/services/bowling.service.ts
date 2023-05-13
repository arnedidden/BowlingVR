import { Leaderbord } from 'src/components/models';
import { api } from 'src/boot/axios';

const useBowling = () => {
  const getLeaderbordForGame = async (id: string) => {
    
      
      const result = await api.get(`/${id}`);
      console.log(result);
      
    const bowlgame = result.data.data;
    const leaderbordArray = [];
    console.log(bowlgame[0].leaderbord.length)
    for (let i = 0; i < bowlgame[0].leaderbord.length; i++){
      leaderbordArray.push([bowlgame[0].leaderbord[i].name, bowlgame[0].leaderbord[i].totalScore])
    }
    console.log(leaderbordArray);
    
    const sortedHighestScore = leaderbordArray.sort((a, b) => b[1] - a[1]);
    console.log(sortedHighestScore);
    
    const game: Leaderbord = {
      nameOfGame: bowlgame.name,
      board: {
        0: {
          name: bowlgame[0].leaderbord[0].name,
          Score: bowlgame[0].leaderbord[0].totalScore,
        },
        1: {
          name: bowlgame.leaderbord[1].name,
          Score: bowlgame.leaderbord[1].totalScore,
        },
        2: {
          name: bowlgame.leaderbord[2].name,
          Score: bowlgame.leaderbord[2].totalScore,
        },
        3: {
          name: bowlgame.leaderbord[3].name,
          Score: bowlgame.leaderbord[3].totalScore,
        },
        4: {
          name: bowlgame.leaderbord[4].name,
          Score: bowlgame.leaderbord[4].totalScore,
        },
        5: {
          name: bowlgame.leaderbord[5].name,
          Score: bowlgame.leaderbord[5].totalScore,
        },
        6: {
          name: bowlgame.leaderbord[6].name,
          Score: bowlgame.leaderbord[6].totalScore,
        },
        7: {
          name: bowlgame.leaderbord[7].name,
          Score: bowlgame.leaderbord[7].totalScore,
        },
        8: {
          name: bowlgame.leaderbord[8].name,
          Score: bowlgame.leaderbord[8].totalScore,
        },
        9: {
          name: bowlgame.leaderbord[9].name,
          Score: bowlgame.leaderbord[9].totalScore,
        },
        },
    };
    console.log(game);
    return { game };
  };

  return {
    getLeaderbordForGame,
  };
};

export { useBowling };
