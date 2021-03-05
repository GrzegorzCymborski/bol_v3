const urlStatsLink = `${process.env.REACT_APP_BASE_URL}/statistics`;
const apiURL = `${process.env.REACT_APP_BASE_URL}/products?`;

export const statsData: any = async (usrID: string) => {
  const response = await fetch(urlStatsLink, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};

export const productsData: any = async (usrID: string, queryString: string) => {
  const response = await fetch(apiURL.concat(queryString), {
    headers: { Authorization: usrID },
  });
  return await response.json();
};
