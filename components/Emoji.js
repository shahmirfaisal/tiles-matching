import { RotateRightOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

const Emoji = ({ id, emoji, selected, matched, onClick, rotation }) => {
  return (
    <Button
      sx={{ fontSize: "2.6rem" }}
      disabled={matched}
      variant={selected ? "contained" : "outlined"}
      onClick={() => onClick(id)}
    >
      <span
        style={{
          display: "inline-block",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {emoji}
      </span>
    </Button>
  );
};

export default Emoji;
