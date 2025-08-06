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
      return habit;
    } else {
      const habit = new QuantitativeHabit(name, description, quantityFormat, category);
      return habit;
    }
  },

  getAllHabits() {
    let data = localStorage.getItem("all-habits");
    if (data) {
      data = JSON.parse(data);
      let allHabits = [];
      for (const habit of data) {
        // need to reinit habit and copy other dynamic properties
        let h;
        if ("quantityFormat" in habit) {
          h = new QuantitativeHabit(habit.name, habit.description, habit.quantityFormat, habit.category);
        } else {
          h = new BooleanHabit(habit.name, habit.description, habit.category);
        }
        h.completionHistory = habit.completionHistory;
        h.createdDate = habit.createdDate;
        allHabits.push(h);
      }
      return allHabits;
    } else {
      return undefined;
    }
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
        // need to reinit habit and copy over all stuff
        if ("quantityFormat" in habit) {
          const h = new QuantitativeHabit(habit.name, habit.description, habit.quantityFormat, habit.category);
          h.completionHistory = habit.completionHistory;
          h.createdDate = habit.createdDate;
          return h;
        } else {
          const h = new BooleanHabit(habit.name, habit.description, habit.category);
          h.completionHistory = habit.completionHistory;
          h.createdDate = habit.createdDate;
          return h;
        }
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
