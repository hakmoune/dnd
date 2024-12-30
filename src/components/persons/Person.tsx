import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface PersonProps {
  person: { id: number; name: string };
}

const Person: React.FC<PersonProps> = ({ person }) => {
  const { id, name } = person;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: transform ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : undefined,
    opacity: transform ? 0.9 : 1,
    borderRadius: "8px",
    backgroundColor: "white",
  };

  return (
    <Accordion ref={setNodeRef} {...attributes} style={style}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <DragIndicator
          {...listeners}
          fontSize="small"
          style={{
            cursor: "grab",
            color: "gray",
            marginRight: "10px",
          }}
        />
        <Typography component="span">{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
};

export default Person;
