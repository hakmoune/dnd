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

type ITask = {
  id: number;
  title: string;
  persons?: { id: number; name: string }[];
};
interface PersonsProps {
  persons: { id: number; name: string }[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const Persons: React.FC<PersonsProps> = ({ persons, setTasks }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    // Trouver le task contenant les personnes à réorganiser
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        // Vérifie si la personne déplacée et sa cible sont dans ce task
        const activePersonIndex = task.persons?.findIndex(
          (person) => person.id === active.id
        );
        const overPersonIndex = task.persons?.findIndex(
          (person) => person.id === over.id
        );

        // Si les deux indices sont valides, on réorganise les `persons` pour ce task
        if (activePersonIndex !== -1 && overPersonIndex !== -1) {
          const updatedPersons = arrayMove(
            task.persons!,
            activePersonIndex!,
            overPersonIndex!
          );
          return { ...task, persons: updatedPersons };
        }

        // Sinon, on retourne la tâche telle quelle
        return task;
      });

      return updatedTasks;
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={persons} strategy={verticalListSortingStrategy}>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Persons;
