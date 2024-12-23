import { Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../tasks/Task";

interface IProps {
  tasks: {
    id: number;
    title: string;
  }[];
  persons?: { id: number; name: string }[];
}

const Column: React.FC<IProps> = ({ tasks }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f2f2f3",
        borderRadius: "5px",
        padding: "15px",
        width: "80%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        margin: "50px auto",
      }}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
    </Box>
  );
};

export default Column;
