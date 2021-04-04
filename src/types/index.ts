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
