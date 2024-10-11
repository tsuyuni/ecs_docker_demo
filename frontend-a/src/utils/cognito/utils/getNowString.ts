// prettier-ignore
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getNowString = () => {
  const now = new Date();
  const weekDay = weekNames[now.getUTCDay()];
  const month = monthNames[now.getUTCMonth()];
  const day = now.getUTCDate();
  const hours = ("00" + now.getUTCHours()).slice(-2);
  const minutes = ("00" + now.getUTCMinutes()).slice(-2);
  const seconds = ("00" + now.getUTCSeconds()).slice(-2);
  const year = now.getUTCFullYear();

  // ddd MMM D HH:mm:ss UTC YYYY
  const dateNow = `${weekDay} ${month} ${day} ${hours}:${minutes}:${seconds} UTC ${year}`;

  return dateNow;
};

export default getNowString;
