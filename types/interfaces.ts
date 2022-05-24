export interface IPokemonCards {
  count: number;
  data: IPokemon[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface IPokemon {
  id: string;
  images: IImages;
  name: string;
  cardmarket: ICardmarket;
  set: ISet;
}
interface IImages {
  large: string;
  small: string;
}
interface ICardmarket {
  prices: {
    averageSellPrice: number;
  };
}
interface ISet {
  total: number;
}

export interface IOptions {
  value: string;
  label: string;
}
