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
      reclame: bowlgame[0].reclame,
    };
    const sortedLeaderboard = game.leaderboard.sort(
      (a, b) => b.totalScore - a.totalScore
    );

    return { game, sortedLeaderboard };
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
    getLeaderbordForGame,
    getLeaderboards,
    createGame
  };
};

export { useBowling };
