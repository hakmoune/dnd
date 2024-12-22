import { Box, Checkbox, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
  id: number;
  title: string;
}

const Task: React.FC<IProps> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        gap: "20px",
        touchAction: "none",
      }}
    >
      <Checkbox />
      <Typography variant="body1" component="p">
        {title}
      </Typography>
    </Box>
  );
};

export default Task;
