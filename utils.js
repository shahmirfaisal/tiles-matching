import uuid from "react-uuid";

export const createEmoji = (emoji) => {
  return {
    id: uuid(),
    emoji,
    selected: false,
    matched: false,
    rotation: Math.ceil(Math.random() * 360),
  };
};

export const isLevelCompleted = (emojis) => {
  return emojis.filter((value) => value.matched).length === emojis.length;
};
