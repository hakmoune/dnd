import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItem, ListItemText, Paper } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";

interface PersonProps {
  person: { id: number; name: string };
}

const Person: React.FC<PersonProps> = ({ person }) => {
  const { id, name } = person;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Define styles for the sortable item
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: transform ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : undefined,
    opacity: transform ? 0.9 : 1, // Slight transparency during drag
    borderRadius: "8px", // Rounded corners
    backgroundColor: "white", // Ensure consistent background color
  };

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      style={{
        ...style,
        padding: "8px 16px", // Add padding for a clean look
        marginBottom: "8px", // Space between items
      }}
      elevation={transform ? 4 : 1} // Elevation effect during drag
    >
      <ListItem disableGutters>
        <DragIndicator
          {...listeners}
          fontSize="small"
          style={{
            cursor: "grab",
            color: "gray",
            marginRight: "10px",
          }}
        />
        <ListItemText primary={name} />
      </ListItem>
    </Paper>
  );
};

export default Person;
