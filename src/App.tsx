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
import Column from "./components/columns/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./components/input/Input";

type ITask = {
  id: number;
  title: string;
};

function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      title: "Add automated tests to your codebase",
    },
    {
      id: 2,
      title: "Add stulelint to your codebase",
    },
    {
      id: 3,
      title: "Add prettier to your codebase",
    },
  ]);

  // Add new task
  const addTask = (title: string): void => {
    setTasks([{ id: tasks.length + 1, title }, ...tasks]);
  };

  // Activat onDragEnd
  const getTaskPos = (id: any): number =>
    tasks.findIndex((task) => task.id === id);

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  // Activate Drag and Drop keyboard
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
        My tasks
      </Typography>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleOnDragEnd}
        sensors={sensors}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </Container>
  );
}

export default App;
