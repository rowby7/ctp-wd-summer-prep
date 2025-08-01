export default class Model {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem("all-habits")) {
      localStorage.setItem("all-habits", JSON.stringify([]));
    }
  }

  getAllHabits() {
    const data = localStorage.getItem("all-habits");
    return data ? JSON.parse(data) : [];
  }

  setHabit(...habits) {
    // update
    const allHabits = this.getAllHabits();
    for (const habit of habits) {
      let existingIndex = allHabits.findIndex((h) => h.name === habit.name)
      if (existingIndex !== -1) {
        allHabits[existingIndex] = habit
      } else {
        allHabits.push(habit)
      }
    }

    localStorage.setItem("all-habits", JSON.stringify(allHabits));
  }

  getHabit(name) {
    // read
    let data = localStorage.getItem("all-habits");
    if (data) {
      data = JSON.parse(data);
    } else {
      return undefined;
    }

    for (let i = 0; i < data.length; i++) {
      let habit = data[i];
      if (habit.name === name) {
        return habit;
      }
    }

    return undefined;
  }

  deleteHabit(name) {
    // delete
  }
}
