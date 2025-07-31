import { useState } from "react";
import { useHabit } from "../contexts/HabitContext";
import Button from "./Button";

function Form() {
  const { formatDate } = useHabit();
  const { handleAddHabit } = useHabit();
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("habit must have a name");
      return;
    }

    const currentDateAndTime = formatDate(new Date());
    const newHabit = {
      id: Date.now(),
      name: name,
      createdAt: currentDateAndTime,
      completionDates: [currentDateAndTime],
      completedToday: true,
      streak: 1,
    };
    handleAddHabit(newHabit);

    setName("");
  }
  return (
    <div className="form">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Add a habit...</h3>

        <input
          type="text"
          placeholder="Habit name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button>Add Habit</Button>
      </form>
    </div>
  );
}

export default Form;
