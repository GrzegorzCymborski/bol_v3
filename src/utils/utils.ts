const updateTime = (time: string): string => {
  const newTime = new Date(time);
  return newTime.toLocaleString("pl-PL");
};

const formatNumber = (num: number): string => {
  if (!num) {
    return "";
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export { updateTime, formatNumber };
