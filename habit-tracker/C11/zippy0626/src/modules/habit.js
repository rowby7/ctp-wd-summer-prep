import { format } from "date-fns";

class QuantitativeHabit {
  constructor(name, description, quantityFormat = undefined, category = undefined) {
    this.name = name;
    this.description = description;
    this.quantityFormat = quantityFormat;
    this.category = category;
    this.createdDate = format(new Date(), "yyyy-MM-dd");
    this.completionHistory = {};

    // Populate completion history
    let year = new Date().getFullYear();
    let date = new Date(year, 0, 1);
    let end = new Date(year, 11, 31);

    while (date <= end) {
      const dateStr = format(date, "yyyy-MM-dd");
      this.completionHistory[dateStr] = { completed: false, quantity: 0, notes: "" };
      date.setDate(date.getDate() + 1);
    }
  }

  getQuantityFormat() {
    return this.quantityFormat;
  }

  changeQuantityFormat(newFormat) {
    this.quantityFormat = newFormat;
  }

  changeQuantityOnDate(date, amount) {
    this.completionHistory[date].quantity = amount;
  }

  changeCompletionOnDate(date, status) {
    this.completionHistory[date].completed = status;
  }

  changeNotesOnDate(date, newNote) {
    this.completionHistory[date].notes = newNote;
  }

  getQuantityOnDate(date) {
    return this.completionHistory[date].quantity;
  }

  getCompletionOnDate(date) {
    return this.completionHistory[date].completed;
  }

  getNotesOnDate(date) {
    return this.completionHistory[date].notes;
  }

  getCurrentStreak() {
    let streak = 0;
    // Newest to oldest date keys
    const dates = Object.keys(this.completionHistory).sort().reverse();
    for (const date of dates) {
      if (this.completionHistory[date].completed === true) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }

  getLongestStreak() {
    let longestStreak = 0;
    let streak = 0;

    const dates = Object.keys(this.completionHistory).sort().reverse();
    for (const date of dates) {
      if (this.completionHistory[date].completed === true) {
        streak += 1;
        if (streak > longestStreak) longestStreak = streak;
      } else {
        streak = 0;
      }
    }
    return longestStreak;
  }
}

class BooleanHabit {
  constructor(name, description, category = undefined) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.createdDate = format(new Date(), "yyyy-MM-dd");
    this.completionHistory = {};

    // Populate completion history
    let year = new Date().getFullYear();
    let date = new Date(year, 0, 1);
    let end = new Date(year, 11, 31);

    while (date <= end) {
      const dateStr = format(date, "yyyy-MM-dd");
      this.completionHistory[dateStr] = { completed: false, notes: "" };
      date.setDate(date.getDate() + 1);
    }
  }

  changeCompletionOnDate(date, status) {
    this.completionHistory[date].completed = status;
  }

  changeNotesOnDate(date, newNote) {
    this.completionHistory[date].notes = newNote;
  }

  getCompletionOnDate(date) {
    return this.completionHistory[date].completed;
  }

  getNotesOnDate(date) {
    return this.completionHistory[date].notes;
  }

  getCurrentStreak() {
    let streak = 0;
    // Newest to oldest date keys
    const dates = Object.keys(this.completionHistory).sort().reverse();
    for (const date of dates) {
      if (this.completionHistory[date].completed === true) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }

  getLongestStreak() {
    let longestStreak = 0;
    let streak = 0;

    const dates = Object.keys(this.completionHistory).sort().reverse();
    for (const date of dates) {
      if (this.completionHistory[date].completed === true) {
        streak += 1;
        if (streak > longestStreak) longestStreak = streak;
      } else {
        streak = 0;
      }
    }
    return longestStreak;
  }
}

export { QuantitativeHabit, BooleanHabit };
