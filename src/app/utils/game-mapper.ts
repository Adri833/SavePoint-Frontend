export interface GameDTO {
  id: number;
  name: string;
  background_image: string | null;
  rating?: number;
  released?: string;
  parent_platforms?: { platform: { name: string } }[];
}

export interface GameDetailDTO {
  id: number;
  name: string;
  background_image: string | null;
  rating?: number;
  released?: string;
  platforms?: string[];
  parent_platforms?: { platform: { name: string } }[];
  description?: string;
}

const FALLBACK_IMAGE =
  'https://www.shutterstock.com/shutterstock/videos/3792325319/thumb/1.jpg?ip=x480';

export const mapRawgGame = (game: any): GameDTO => ({
  id: game.id,
  name: game.name,
  background_image: game.background_image ?? FALLBACK_IMAGE,
  rating: game.rating,
  released: game.released,
  parent_platforms: game.parent_platforms ?? [],
});

export const mapRawgGameDetail = (game: any): GameDetailDTO => ({
  id: game.id,
  name: game.name,
  background_image: game.background_image ?? FALLBACK_IMAGE,
  rating: game.rating,
  released: game.released,
  platforms: game.platforms?.map((p: any) => p.platform.name) ?? [],
  parent_platforms: game.parent_platforms ?? [],
  description: game.description_raw ?? game.description,
});

export const mapRawgGames = (games: any[]): GameDTO[] => games.map(mapRawgGame);
