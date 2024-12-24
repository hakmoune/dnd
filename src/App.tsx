import "./App.css";
import { Container, Typography } from "@mui/material";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
import Task from "./components/tasks/Task";

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
        { id: 1, name: "Mahdi" },
        { id: 2, name: "Betty" },
        { id: 3, name: "Souhail" },
      ],
    },
    {
      id: 2,
      title: "Soumaya: Add stulelint to your codebase",
      persons: [
        { id: 1, name: "Soumaya" },
        { id: 2, name: "Betty" },
        { id: 3, name: "Souhail" },
      ],
    },
    {
      id: 3,
      title: "Yamal: Add prettier to your codebase",
      persons: [
        { id: 1, name: "Yamal" },
        { id: 2, name: "Mbampe" },
        { id: 3, name: "Souhail" },
      ],
    },
  ]);

  const [draggingTask, setDraggingTask] = useState<ITask | null>(null);

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

  const getTaskPos = (id: any): number =>
    tasks.findIndex((task) => task.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id;
    const task = tasks.find((task) => task.id === taskId);
    setDraggingTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggingTask(null); // Clear overlay
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Columns tasks={tasks} />
        <DragOverlay>
          {draggingTask && <Task task={draggingTask} />}
        </DragOverlay>
      </DndContext>
    </Container>
  );
}

export default App;
