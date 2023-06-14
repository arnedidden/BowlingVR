import { Game } from 'src/components/models';
import { api } from 'src/boot/axios';

const useBowling = () => {
  const getLeaderboards = async () => {
    const result = await api.get('/team_eevee_config/');
    const data = result.data.data;
    return { data };
  };
  const getLeaderBoardForGame = async (id: string) => {
    const result = await api.get(`/team_eevee_config/${id}`);

    const game: Game = result.data.data[0];

    const sortedLeaderboard = game.leaderboard.sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return { game, sortedLeaderboard };
  };

  const updateGame = async (id: string, game: Game) => {
    delete game._id;
    api.put(`team_eevee_config/${id}`, game);
  };

  return {
    getLeaderBoardForGame,
    getLeaderboards,
    updateGame,
  };
};

export { useBowling };
