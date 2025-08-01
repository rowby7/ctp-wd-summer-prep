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
    return data ? JSON.parse(data) : undefined;
  }

  setHabit(...habits) {
    // update
    const allHabits = this.getAllHabits();
    for (const habit of habits) {
      let i = allHabits.findIndex((h) => h.name === habit.name)
      if (i !== -1) {
        allHabits[i] = habit
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
    const allHabits = this.getAllHabits()
    let i = allHabits.findIndex((habit) => habit.name === name)
    if (i !== -1) {
      allHabits.splice(i, 1)
    } else {
      return undefined
    }

    localStorage.setItem("all-habits", JSON.stringify(allHabits))
  }
}
