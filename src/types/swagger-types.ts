/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/carts': {
    get: operations['getCarts'];
    post: operations['postCarts'];
    delete: operations['deleteCarts'];
  };
  '/products': {
    get: operations['getProducts'];
    post: operations['postProducts'];
  };
  '/statistics': {
    get: operations['getStatistics'];
  };
  '/carts/raw': {
    get: operations['getCartsRaw'];
  };
  '/products/{product_id}': {
    get: operations['getProductsProduct_id'];
  };
  '/products/{product_id}/offers': {
    get: operations['getProductsProduct_idOffers'];
  };
  '/products/{product_id}/offers/{offer_id}': {
    get: operations['getProductsProduct_idOffersOffer_id'];
  };
  '/products/{product_id}/offers/{offer_id}/carts': {
    get: operations['getProductsProduct_idOffersOffer_idCarts'];
  };
  '/products/{product_id}/offers/{offer_id}/economies': {
    get: operations['getProductsProduct_idOffersOffer_idEconomies'];
  };
}

export interface definitions {
  _links: {
    self?: string;
    offers?: string;
  };
  Product: {
    name: string;
    ean: number;
    product_img: string;
    brand: string;
    dimensions: string;
    weight: string;
    category?:
      | 'Auto & Motor'
      | 'Baby'
      | 'Beauty'
      | 'Boeken'
      | 'Cadeaukaarten'
      | 'Computer'
      | 'Damesmode'
      | 'Dieren'
      | 'Dranken & Delicatessen'
      | 'Elektronica'
      | 'Erotiek'
      | 'Fietsen & Accessoires'
      | 'Films & Series'
      | 'Games'
      | 'Gezondheid'
      | 'Herenmode'
      | 'Huishouden'
      | 'Kamperen & Outdoor'
      | 'Kantoor & School'
      | 'Kerst'
      | 'Kindermode'
      | 'Klussen'
      | 'Koken & Tafelen'
      | 'Muziek'
      | 'Persoonlijke verzorging'
      | 'Reisbagage & Reisaccessoires'
      | 'Speelgoed'
      | 'Sport'
      | 'Tuin'
      | 'Wonen';
    subcategory: string;
    price: number;
    rating: number;
    _links: definitions['_links'];
  };
  products: definitions['Product'][];
  page: {
    current: number;
    pages: number;
  };
  GetProductsResponse: {
    rows: number;
    products: definitions['products'];
    page: definitions['page'];
  };
  Summary: {
    category:
      | 'Auto & Motor'
      | 'Baby'
      | 'Beauty'
      | 'Boeken'
      | 'Cadeaukaarten'
      | 'Computer'
      | 'Damesmode'
      | 'Dieren'
      | 'Dranken & Delicatessen'
      | 'Elektronica'
      | 'Erotiek'
      | 'Fietsen & Accessoires'
      | 'Films & Series'
      | 'Games'
      | 'Gezondheid'
      | 'Herenmode'
      | 'Huishouden'
      | 'Kamperen & Outdoor'
      | 'Kantoor & School'
      | 'Kerst'
      | 'Kindermode'
      | 'Klussen'
      | 'Koken & Tafelen'
      | 'Muziek'
      | 'Persoonlijke verzorging'
      | 'Reisbagage & Reisaccessoires'
      | 'Speelgoed'
      | 'Sport'
      | 'Tuin'
      | 'Wonen';
    rows: number;
  };
  categories: definitions['Summary'][];
  StatisticsResponse: {
    lastUpdate: string;
    totalRows: number;
    categories: definitions['categories'];
  };
  data: number[];
  GetProductsEansResponse: {
    data: definitions['data'];
  };
  Model1: {
    self?: string;
    carts?: string;
    economies?: string;
  };
  Offer: {
    offer_url: string;
    seller: string;
    portal: string;
    _links: definitions['Model1'];
  };
  GetOffersResponse: definitions['Offer'][];
  Sales: {
    amount?: number;
    updated_at?: string;
  };
  sales: definitions['Sales'][];
  GetSalesResponse: {
    sales?: definitions['sales'];
    page?: definitions['page'];
  };
  PriceHistory: {
    price: number;
    rating: number;
    updated_at: string;
  };
  economies: definitions['PriceHistory'][];
  GetPriceHistoryResponse: {
    economies?: definitions['economies'];
    page?: definitions['page'];
  };
  eans: number[];
  Eans: {
    eans: definitions['eans'];
  };
}

export interface operations {
  getCarts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      query: {
        limit?: unknown;
        page?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetProductsResponse'];
      };
      /** No Content */
      204: never;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  postCarts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      body: {
        body?: definitions['Eans'];
      };
    };
    responses: {
      /** Created */
      201: unknown;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Unprocessable Entity */
      422: unknown;
    };
  };
  deleteCarts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      body: {
        body?: definitions['Eans'];
      };
    };
    responses: {
      /** OK */
      200: {
        schema: string;
      };
      /** No Content */
      204: never;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
    };
  };
  getProducts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      query: {
        name?: unknown;
        price?: unknown;
        rate?: unknown;
        category?: unknown;
        records?: unknown;
        limit?: unknown;
        page?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetProductsResponse'];
      };
      /** No Content */
      204: never;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
    };
  };
  postProducts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      query: {
        name?: unknown;
        price?: unknown;
        rate?: unknown;
        category?: unknown;
        records?: unknown;
      };
    };
    responses: {
      /** Successful */
      200: {
        schema: string;
      };
      /** Created */
      201: unknown;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
    };
  };
  getStatistics: {
    parameters: {
      header: {
        authorization: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['StatisticsResponse'];
      };
      /** Unauthorized */
      401: unknown;
    };
  };
  getCartsRaw: {
    parameters: {
      header: {
        authorization: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetProductsResponse'];
      };
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  getProductsProduct_id: {
    parameters: {
      header: {
        authorization: unknown;
      };
      path: {
        product_id?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['Product'];
      };
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  getProductsProduct_idOffers: {
    parameters: {
      header: {
        authorization: unknown;
      };
      path: {
        product_id?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetOffersResponse'];
      };
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  getProductsProduct_idOffersOffer_id: {
    parameters: {
      header: {
        authorization: unknown;
      };
      path: {
        product_id?: unknown;
        offer_id?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['Offer'];
      };
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  getProductsProduct_idOffersOffer_idCarts: {
    parameters: {
      header: {
        authorization: unknown;
      };
      path: {
        product_id?: unknown;
        offer_id?: unknown;
      };
      query: {
        limit?: unknown;
        page?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetSalesResponse'];
      };
      /** No Content */
      204: never;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Forbidden */
      403: unknown;
      /** Not Found */
      404: unknown;
    };
  };
  getProductsProduct_idOffersOffer_idEconomies: {
    parameters: {
      header: {
        authorization: unknown;
      };
      path: {
        product_id?: unknown;
        offer_id?: unknown;
      };
      query: {
        limit?: unknown;
        page?: unknown;
      };
    };
    responses: {
      /** OK */
      200: {
        schema: definitions['GetPriceHistoryResponse'];
      };
      /** No Content */
      204: never;
      /** Bad Request */
      400: unknown;
      /** Unauthorized */
      401: unknown;
      /** Not Found */
      404: unknown;
    };
  };
}
