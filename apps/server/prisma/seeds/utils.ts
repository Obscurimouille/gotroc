const now = new Date();

const yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

const twoDaysAgo = new Date();
twoDaysAgo.setDate(now.getDate() - 2);

const oneHourAgo = new Date();
oneHourAgo.setHours(now.getHours() - 1);

const fiveMinutesAgo = new Date();
fiveMinutesAgo.setMinutes(now.getMinutes() - 5);

export {
  yesterday,
  twoDaysAgo,
  oneHourAgo,
  fiveMinutesAgo,
};