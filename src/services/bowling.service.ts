import { Game } from 'src/components/models';
import { api } from 'src/boot/axios';

const useBowling = () => {
  const getLeaderboards = async () => {
    const result = await api.get('/team_eevee_config/');
    const data = result.data.data;
    return { data };
  };
  const getLeaderbordForGame = async (id: string) => {
    const result = await api.get(`/team_eevee_config/${id}`);

    const bowlgame = result.data.data;

    const game: Game = {
      _id: bowlgame[0]._id,
      name: bowlgame[0].name,
      bowlingBall: {
        color: bowlgame[0].bowlingBall.color,
      },
      bowlingPins: {
        color: bowlgame[0].bowlingPins.color,
      },
      bowlingLane: {
        color: bowlgame[0].bowlingLane.color,
      },
      leaderboard: bowlgame[0].leaderboard,
    };
    const sortedLeaderboard = game.leaderboard.sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return { game, sortedLeaderboard };
  };

  return { getLeaderboards, getLeaderbordForGame };
};

export { useBowling };
