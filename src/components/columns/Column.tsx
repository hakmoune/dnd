import { Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../tasks/Task";

type ITask = {
  id: number;
  title: string;
  persons?: { id: number; name: string }[];
};
interface IProps {
  tasks: {
    id: number;
    title: string;
  }[];
  persons?: { id: number; name: string }[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Column: React.FC<IProps> = ({ tasks, setTasks }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f2f2f3",
        borderRadius: "5px",
        padding: "15px",
        width: "80%",
        maxWidth: "700px",
        margin: "50px auto",
      }}
    >
      <SortableContext
        items={tasks.map((task) => task.title)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} setTasks={setTasks} />
        ))}
      </SortableContext>
    </Box>
  );
};

export default Column;
