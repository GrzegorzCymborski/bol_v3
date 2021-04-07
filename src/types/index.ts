import { operations } from './swagger-types';

type Links = {
  self: string;
  carts: string;
  economies: string;
};

export type Offers = {
  offer_url: string;
  seller: string;
  portal: string;
  _links: Partial<Links>;
};

export type UrlProps = {
  name: string;
  results: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  category: operations['getProducts']['parameters']['query']['category'] | string;
};
