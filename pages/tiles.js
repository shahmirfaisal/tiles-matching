import { Box, Typography, Link as MuiLink } from "@mui/material";
import getRandomEmoji from "get-random-emoji";
import { useEffect, useState } from "react";
import Emoji from "../components/Emoji";
import uuid from "react-uuid";
import { createEmoji, isLevelCompleted } from "../utils";
import { useRouter } from "next/router";
import Link from "next/link";

const Tiles = ({}) => {
  const [emojis, setEmojis] = useState([]);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const { query, replace } = useRouter();

  useEffect(() => {
    if (!query.level) replace("/tiles?level=1");
  }, []);

  useEffect(() => {
    let emojisDetail = [];
    for (let i = 1; i <= +query.level; i++) {
      const emoji = getRandomEmoji();
      emojisDetail.push(createEmoji(emoji));
      emojisDetail.push(createEmoji(emoji));
    }
    emojisDetail = emojisDetail.sort((a, b) => Math.random() - 0.5);
    setEmojis(emojisDetail);
  }, [query.level]);

  useEffect(() => {
    setLevelCompleted(isLevelCompleted(emojis));
  }, [emojis]);

  useEffect(() => {
    const localEmojis = JSON.parse(localStorage.getItem("emojis"));
    const localLevel = JSON.parse(localStorage.getItem("level"));

    if (localEmojis && localLevel && localLevel == query.level) {
      setEmojis(localEmojis);
    }
  }, []);

  const emojiClickHandler = (id) => {
    const updatedEmojis = [...emojis];

    const currentEmojiIndex = updatedEmojis.findIndex(
      (value) => value.id == id
    );

    const currentEmoji = updatedEmojis[currentEmojiIndex];

    const currentlySelected = updatedEmojis.find((value) => value.selected);

    if (!currentlySelected || currentlySelected.id == id) {
      currentEmoji.selected = !currentEmoji.selected;
    } else if (currentEmoji.emoji != currentlySelected.emoji) {
      currentlySelected.selected = false;
    } else if (currentEmoji.emoji == currentlySelected.emoji) {
      currentEmoji.selected = false;
      currentEmoji.matched = true;
      currentlySelected.matched = true;
      currentlySelected.selected = false;

      localStorage.setItem("emojis", JSON.stringify(emojis));
      localStorage.setItem("level", +query.level);
    }

    setEmojis(updatedEmojis);
  };

  return (
    <Box sx={{ maxWidth: "1100px", mx: "auto", px: 4, mt: 5 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
        Level {query.level}
      </Typography>

      {levelCompleted && (
        <MuiLink
          href={`/tiles?level=${+query.level + 1}`}
          component={Link}
          sx={{ fontWeight: 600, fontSize: 30, mt: 2, display: "block", mb: 1 }}
        >
          Go To The Next Level
        </MuiLink>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          mt: 3,
        }}
      >
        {emojis.map((emoji, i) => (
          <Emoji key={i} {...emoji} onClick={emojiClickHandler} />
        ))}
      </Box>
    </Box>
  );
};

// export const getServerSideProps = ({ query }) => {
//   const level = +query.level;

//   if (!level) {
//     return {
//       redirect: {
//         destination: "/tiles?level=1",
//         permanent: false,
//       },
//     };
//   }

//   // let emojisDetail = [];

//   // for (let i = 1; i <= level; i++) {
//   //   const emoji = getRandomEmoji();
//   //   emojisDetail.push(createEmoji(emoji));
//   //   emojisDetail.push(createEmoji(emoji));
//   // }

//   // emojisDetail = emojisDetail.sort((a, b) => Math.random() - 0.5);

//   return {
//     props: {
//       // emojisDetail,
//     },
//   };
// };

export default Tiles;
