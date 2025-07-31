import { useHabit } from "../contexts/HabitContext";
import Button from "./Button";

function HabitItem({ habit }) {
  const { handleDeleteHabit, handleCompleteHabit } = useHabit();
  return (
    <div className="habit-item">
      <h2 className="habit-info">Habit Name: {habit.name}</h2>

      <h3 className="habit-info">Date Created: {habit.createdAt}</h3>
      <h3 className="habit-info">Streak: {habit.streak}</h3>
      <h3 className="habit-info">
        Daily Completion Status:{" "}
        {habit.completedToday ? "completed" : "not completed"}{" "}
      </h3>
      <div className="completion-dates">
        {habit.completionDates.map((date) => (
          <h2 key={date} className="habit-info">
            {date}
          </h2>
        ))}
      </div>
      <Button onClick={() => handleCompleteHabit(habit.id)}>
        Complete Habit
      </Button>
      <Button onClick={() => handleDeleteHabit(habit.id)}>Delete Habit</Button>
    </div>
  );
}

export default HabitItem;
