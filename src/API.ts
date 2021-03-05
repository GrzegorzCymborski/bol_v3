const urlStatsLink = `${process.env.REACT_APP_BASE_URL}/statistics`;

export const statsData: any = async (usrID: string) => {
  const response = await fetch(urlStatsLink, {
    headers: { Authorization: usrID },
  });
  return await response.json();
};
