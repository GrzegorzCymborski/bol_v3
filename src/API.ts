const urlStatsLink = `${process.env.REACT_APP_BASE_URL}/statistics`;
const apiURL = `${process.env.REACT_APP_BASE_URL}/products?`;
const cartURL = `${process.env.REACT_APP_BASE_URL}/carts`;

export const statsData: any = async (usrID: string) => {
  const response = await fetch(urlStatsLink, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};

export const productsData: any = async (
  usrID: string,
  queryString: string,
  currentPage: number
) => {
  const response = await fetch(
    apiURL + queryString + (currentPage && `&page=${currentPage}`),
    {
      headers: { Authorization: usrID },
    }
  );
  return await response.json();
};

export const handleTrackEAN: any = async (usrID: string, eanNo: number) => {
  const postBody = {
    eans: [eanNo],
  };

  const response = await fetch(cartURL, {
    method: "POST",
    headers: {
      Authorization: usrID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  });
  if (response.status === 422) {
    console.log("already tracking", response.status);
    return;
  }
  if (response.status === 201) {
    console.log("ean added", response.status);
    return;
  } else {
    console.log("new error code", response.status);
  }
};

export const queryTrackedEANs: any = async (usrID: string) => {
  const response = await fetch(`${cartURL}/raw`, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};
