module.exports = {
  randonTime: function () {
    // let num = Math.floor(Math.random() * 10 );
    time = ["64", "65", "66", "67", "68", "64", "65", "66", "67", "68"];
    return `[data-seance-id="${time[Math.floor(Math.random() * 10)]}"]`;
  },
  randomDay: function () {
    // let num = Math.floor(Math.random() * 10 );
    day = [
      "3556",
      "2692",
      "4420",
      "5284",
      "6148",
      "7012",
      "7876",
      "6148",
      "7012",
      "7876",
      "7876",
    ];
    return `[data-time-stamp="1637${day[Math.floor(Math.random() * 10)]}00"]`;
  },
  randomPlace: function () {
    // let num = Math.floor(Math.random() * 10 + 1 );
    return `div:nth-child(${Math.floor(
      Math.random() * 10 + 1
    )}) span:nth-child(${Math.floor(Math.random() * 10 + 1)})`;
  },
};
