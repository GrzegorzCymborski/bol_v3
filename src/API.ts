import { definitions } from './types/swagger-types';

const urlStatsLink = `${process.env.REACT_APP_BASE_URL}/statistics`;
const apiURL = `${process.env.REACT_APP_BASE_URL}/products?`;
const cartURL = `${process.env.REACT_APP_BASE_URL}/carts`;

export const statsData = async (usrID: string): Promise<definitions['StatisticsResponse']> => {
  const response = await fetch(urlStatsLink, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};

export const productsData = async (
  usrID: string,
  queryString: string,
  currentPage: number,
): Promise<definitions['GetProductsResponse']> => {
  const response = await fetch(apiURL + queryString + (currentPage && `&page=${currentPage}`), {
    headers: { Authorization: usrID },
  });
  return await response.json();
};

export const handleTrackEAN = async (usrID: string, eanNo: number): Promise<void> => {
  const postBody = {
    eans: [eanNo],
  };

  const response = await fetch(cartURL, {
    method: 'POST',
    headers: {
      Authorization: usrID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postBody),
  });
  if (response.status === 422) {
    console.log('already tracking', response.status);
    return;
  }
  if (response.status === 201) {
    console.log('ean added', response.status);
    return;
  } else {
    console.log('new error code', response.status);
  }
};

export const queryTrackedEANs = async (usrID: string): Promise<{ data: number[] }> => {
  const response = await fetch(`${cartURL}/raw`, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};

export const fetchOffers = async (
  usrID: string,
  offersID: string,
): Promise<definitions['GetOffersResponse']> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}${offersID}`, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};
