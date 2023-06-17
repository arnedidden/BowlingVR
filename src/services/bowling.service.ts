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
    api.put(`team_eevee_config/${id}`, game)
    .then(() =>
        alert('Game succesvol geüpdatet')
      )
      .catch((error) => {
        alert(`error: ${error}`);
      });

  };
  const createGame = async (game: Game) => {
    api
      .post(
        'https://api.code-coaching.dev/eindwerken-2022-jaar-2/team_eevee_config',
        game
      )
      .then((response) =>
        alert(`Game succesvol aangemaakt met id: ${response.data._id}`)
      )
      .catch((error) => {
        alert(`error: ${error}`);
      });
  };
  return {
    getLeaderBoardForGame,
    getLeaderboards,
    createGame,
    updateGame,
  };
};

export { useBowling };
