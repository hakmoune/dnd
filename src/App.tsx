import "./App.css";
import { Container, Typography } from "@mui/material";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Columns from "./components/columns/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./components/input/Input";

type ITask = {
  id: number;
  title: string;
  persons?: { id: number; name: string }[];
};

function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      title: "Mahdi: Add automated tests to your codebase",
      persons: [
        { id: 4, name: "Mahdi" },
        { id: 5, name: "Betty" },
        { id: 6, name: "Souhail" },
      ],
    },
    {
      id: 2,
      title: "Soumaya: Add stulelint to your codebase",
      persons: [
        { id: 7, name: "Soumaya" },
        { id: 8, name: "Betty" },
        { id: 9, name: "Souhail" },
      ],
    },
    {
      id: 3,
      title: "Yamal: Add prettier to your codebase",
      persons: [
        { id: 10, name: "Yamal" },
        { id: 11, name: "Mbampe" },
        { id: 12, name: "Souhail" },
      ],
    },
  ]);

  const addTask = (title: string): void => {
    setTasks([{ id: tasks.length + 1, title, persons: [] }, ...tasks]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Activate the Drag and Drop
  const getTaskPos = (id: any): number => {
    return tasks.findIndex((task) => task.id === id); // Add comment: Retrieve index of task by ID
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    //if (!over || active.id === over.id) return;
    if (!active || !over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
        My tasks
      </Typography>

      <Input onSubmit={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Columns tasks={tasks} />
      </DndContext>
    </Container>
  );
}

export default App;
