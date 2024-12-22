import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface InputProps {
  onSubmit: (title: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [textInput, setTextInput] = useState("");

  const handleClick = () => {
    if (!textInput) return;

    onSubmit(textInput);
    setTextInput("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        padding: "15px",
        width: "80%",
        maxWidth: "350px",
        margin: "20px auto",
      }}
    >
      <TextField
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        size="small"
        label="Task"
      />
      <Button variant="contained" onClick={handleClick}>
        Add Task
      </Button>
    </Box>
  );
};

export default Input;
