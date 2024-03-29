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
    sortedLeaderboard.forEach((leaderboardItem) => {
      leaderboardItem.turns.forEach((turn, index) => {
        if (index === 0) {
          turn.subTotal = turn.score;
        } else {
          const previousTurn = leaderboardItem.turns[index - 1];
          const previousTurnSubTotal = previousTurn.subTotal || 0;
          turn.subTotal = previousTurnSubTotal + turn.score;
        }
      });
    });
    return { game, sortedLeaderboard };
  };

  const updateGame = async (id: string, game: Game) => {
    delete game._id;
    api.put(`team_eevee_config/${id}`, game);
  };
  const createGame = async (game: Game) => {
    api.post(
      'https://api.code-coaching.dev/eindwerken-2022-jaar-2/team_eevee_config',
      game
    );
  };
  const deleteGame = async (id: string) => {
    api.delete(
      `https://api.code-coaching.dev/eindwerken-2022-jaar-2/team_eevee_config/${id}`
    );
  };
  return {
    getLeaderBoardForGame,
    getLeaderboards,
    createGame,
    updateGame,
    deleteGame,
  };
};

export { useBowling };
