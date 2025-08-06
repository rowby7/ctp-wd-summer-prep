import { QuantitativeHabit, BooleanHabit } from "./habit.js";

const Model = {
  initStorage() {
    if (!localStorage.getItem("all-habits")) {
      localStorage.setItem("all-habits", JSON.stringify([]));
    }
  },

  createHabit(name, description, quantityFormat = undefined, category) {
    if (!quantityFormat) {
      const habit = new BooleanHabit(name, description, category);
      return habit
    } else {
      const habit = new QuantitativeHabit(name, description, quantityFormat, category);
      return habit
    }
  },

  getAllHabits() {
    const data = localStorage.getItem("all-habits");
    return data ? JSON.parse(data) : undefined;
  },

  setHabit(...habits) {
    const allHabits = this.getAllHabits();
    for (const habit of habits) {
      let i = allHabits.findIndex((h) => h.name === habit.name);
      if (i !== -1) {
        // replace if already existing
        allHabits[i] = habit;
      } else {
        allHabits.push(habit);
      }
    }

    localStorage.setItem("all-habits", JSON.stringify(allHabits));
  },

  getHabit(name) {
    const allHabits = this.getAllHabits();

    for (let i = 0; i < allHabits.length; i++) {
      let habit = allHabits[i];
      if (habit.name === name) {
        return habit;
      }
    }

    return undefined;
  },

  deleteHabit(name) {
    const allHabits = this.getAllHabits();
    let i = allHabits.findIndex((habit) => habit.name === name);
    if (i !== -1) {
      allHabits.splice(i, 1);
    } else {
      return undefined;
    }

    localStorage.setItem("all-habits", JSON.stringify(allHabits));
  },

  deleteAllHabits() {
    localStorage.setItem("all-habits", JSON.stringify([]));
  },
};

export default Model;
