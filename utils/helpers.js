module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },

  is_player_count_max: (player_count) => {
    if (player_count > 0) {
      return true
    }
    else {
      return false
    }
  }
};
