const dateUTCToHoursAMPM = (date) => { 
  const newDate = new Date(+date);
  const sHourSecond = newDate.toLocaleTimeString("en-US").split(":");
  sHourSecond[2] = sHourSecond[2].slice(-2);

  return `${sHourSecond[0]}:${sHourSecond[1]} ${sHourSecond[2]}`;
};

export { dateUTCToHoursAMPM };
