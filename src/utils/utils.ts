const updateTime: any = (time: any) => {
  const newTime = new Date(time);
  return newTime.toLocaleString("pl-PL");
};

const formatNumber: any = (num: number) => {
  if (!num) {
    return 0;
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export { updateTime, formatNumber };
