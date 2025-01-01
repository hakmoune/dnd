import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import Persons from "../persons/Persons";
import { DragIndicator } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ITask = {
  id: number;
  title: string;
  persons?: { id: number; name: string }[];
};
interface IProps {
  task: {
    id: number;
    title: string;
    persons?: { id: number; name: string }[];
  };
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Task: React.FC<IProps> = ({ task, setTasks }) => {
  const { id, title, persons } = task;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
    boxShadow: transform ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : undefined,
    opacity: transform ? 0.9 : 1,
  };

  return (
    <Accordion ref={setNodeRef} {...attributes} style={style}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          "& > .MuiAccordionSummary-content": {
            alignItems: "center",
            gap: "15px",
          },
        }}
      >
        <DragIndicator
          {...listeners}
          fontSize="small"
          style={{ cursor: "grab", color: "gray" }}
        />
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Persons persons={persons!} setTasks={setTasks} />
      </AccordionDetails>
    </Accordion>
  );
};

export default Task;
