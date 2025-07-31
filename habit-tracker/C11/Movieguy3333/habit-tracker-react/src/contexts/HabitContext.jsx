import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const HabitContext = createContext();

function HabitProvider({ children }) {
  const [habits, setHabits] = useLocalStorageState([], "habits");
  const [userStats, setUserStats] = useLocalStorageState(
    { streak: 1 },
    "user-stats"
  );

  useEffect(() => {
    const todaysDate = formatDate(new Date());
    console.log("Checking habits on load. Today's date:", todaysDate);

    setHabits((habits) =>
      habits.map((habit) =>
        habit.completionDates[habit.completionDates.length - 1] !== todaysDate
          ? { ...habit, completedToday: false }
          : habit
      )
    );
  }, [setHabits]);

  function handleAddHabit(newHabit) {
    setHabits((habits) => [...habits, newHabit]);
  }

  function handleDeleteHabit(id) {
    if (!habits) return;
    setHabits((habits) => habits.filter((habit) => habit.id !== id));
  }

  function handleCompleteHabit(id) {
    setHabits((habits) => {
      const habit = habits.find((habit) => habit.id === id);

      if (habit.completedToday) {
        alert("You've already completed this habit today!");
        return habits;
      }

      return habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: habit.streak + 1,
              completedToday: true,
              completionDates: [
                ...habit.completionDates,
                formatDate(new Date()),
              ],
            }
          : habit
      );
    });
  }

  function formatDate(currentDateAndTime) {
    return `${String(currentDateAndTime.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(currentDateAndTime.getDate()).padStart(
      2,
      "0"
    )}/${currentDateAndTime.getFullYear()}`;
  }
  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        userStats,

        handleAddHabit,
        handleDeleteHabit,
        handleCompleteHabit,
        formatDate,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

function useHabit() {
  const context = useContext(HabitContext);
  if (context === undefined)
    throw new Error("HabitContext was used outside provider");

  return context;
}

export { HabitProvider, useHabit };
