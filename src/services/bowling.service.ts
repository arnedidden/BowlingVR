import { Game, Turn } from 'src/components/models';
import { api } from 'src/boot/axios';

const useBowling = () => {
  const getLeaderbordForGame = async (id: string) => {
    
      
      const result = await api.get(`/${id}`);
      
    const bowlgame = result.data.data;
    
    const game: Game = {
      _id: bowlgame._id,
      name: bowlgame.name,
      bowlingBall: {
          color: bowlgame.bowlingBall.color
      },
      bowlingPins: {
          color: bowlgame.bowlingPins.color
      },
      bowlingLane: {
          color: bowlgame.bowlingLane.color
      },
      leaderboard: bowlgame.leaderboard
    };
    console.log(game._id);
    console.log(game.name);
    console.log(game._id);
    console.log(game._id);
    console.log(game._id);
    
    return { game};
    
  };

  return {
    getLeaderbordForGame,
  };
};

export { useBowling };
