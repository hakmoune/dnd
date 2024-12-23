import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, ListItem, ListItemText } from "@mui/material";

interface PersonProps {
  person: { id: number; name: string };
}

const Person: React.FC<PersonProps> = ({ person }) => {
  const { id, name } = person;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  //   const style = {
  //     transition,
  //     transform: CSS.Transform.toString(transform),
  //   };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: transform ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : undefined,
    //opacity: transform ? 0.9 : 1, // Add comment: Enhance dragged item appearance
  };

  return (
    <List ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <ListItem>
        <ListItemText primary={name} />
      </ListItem>
    </List>
  );
};

export default Person;
