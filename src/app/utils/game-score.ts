export const scoreGame = (game: any, query: string): number => {
  const name = game.name.toLowerCase();
  const q = query.toLowerCase();
  let score = 0;

  if (name === q) score += 100;
  else if (name.startsWith(q)) score += 80;
  else if (name.includes(q)) score += 40;

  if (game.added) score += Math.min(game.added / 10, 50);
  if (game.metacritic) score += game.metacritic;
  if (game.rating) score += game.rating * 10;

  return score;
};
