import { Box, Checkbox, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Persons from "../persons/Persons";
import { DragIndicator } from "@mui/icons-material";

interface IProps {
  task: {
    id: number;
    title: string;
    persons?: { id: number; name: string }[];
  };
}

const Task: React.FC<IProps> = ({ task }) => {
  const { id, title, persons } = task;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: transform ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : undefined,
    opacity: transform ? 0.9 : 1, // Add comment: Enhance dragged item appearance
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      style={style}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <DragIndicator
          {...listeners}
          fontSize="small"
          style={{ cursor: "grab", color: "gray" }}
        />
        <Checkbox />
        <Typography>{title}</Typography>
      </Box>
      <Persons persons={persons!} />
    </Box>
  );
};

export default Task;
