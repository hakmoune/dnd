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
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Person from "./Person";
import { useState } from "react";

interface PersonsProps {
  persons: { id: number; name: string }[];
}

const Persons: React.FC<PersonsProps> = ({ persons }) => {
  const [dragDrop, setDragDrop] = useState<{ id: number; name: string }[]>([
    ...persons,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Activate the Drag and Drop
  const getPersonPos = (id: any): number =>
    dragDrop.findIndex((person) => person.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    //if (!over || active.id === over.id) return;
    if (!active || !over || active.id === over.id) return;

    setDragDrop((tasks) => {
      const originalPos = getPersonPos(active.id);
      const newPos = getPersonPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={dragDrop} strategy={verticalListSortingStrategy}>
        {dragDrop.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Persons;
