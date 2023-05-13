import { Leaderbord } from 'src/components/models';
import { api } from 'src/boot/axios';

const useBowling = () => {
  const getLeaderbordForGame = async (id: string) => {
    
      
      const result = await api.get(`/${id}`);
      
    const bowlgame = result.data.data;
    const leaderbordArray = [];
    for (let i = 0; i < bowlgame[0].leaderboard.length; i++){
      leaderbordArray.push([bowlgame[0].leaderboard[i].name, bowlgame[0].leaderboard[i].totalScore])
    }
    const sortedHighestScore = leaderbordArray.sort((a, b) => b[1] - a[1]);
    
    const game: Leaderbord = {
      nameOfGame: bowlgame[0].name,
      board: {
        0: {
          name: sortedHighestScore[0][0],
          Score: sortedHighestScore[0][1],
        },
        // 1: {
        //   name: sortedHighestScore[1][0],
        //   Score: sortedHighestScore[1][1],
        // },
        // 2: {
        //   name: sortedHighestScore[2][0],
        //   Score: sortedHighestScore[2][4],
        // },
        // 3: {
        //   name: sortedHighestScore[3][0],
        //   Score: sortedHighestScore[3][1],
        // },
        // 4: {
        //   name: sortedHighestScore[4][0],
        //   Score: sortedHighestScore[4][1],
        // },
        // 5: {
        //   name: sortedHighestScore[5][0],
        //   Score: sortedHighestScore[5][1],
        // },
        // 6: {
        //   name: sortedHighestScore[6][0],
        //   Score: sortedHighestScore[6][1],
        // },
        // 7: {
        //   name: sortedHighestScore[7][0],
        //   Score: sortedHighestScore[7][1],
        // },
        // 8: {
        //   name: sortedHighestScore[8][0],
        //   Score: sortedHighestScore[8][1],
        // },
        // 9: {
        //   name: sortedHighestScore[9][0],
        //   Score: sortedHighestScore[9][1],
        // },
        },
    };
    return { game };
  };

  return {
    getLeaderbordForGame,
  };
};

export { useBowling };
