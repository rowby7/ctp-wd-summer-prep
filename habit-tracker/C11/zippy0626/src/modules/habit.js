import { format } from "date-fns";

class QuantitativeHabit {
  constructor(name, description, quantityFormat = undefined, quantity = 0, category = undefined) {
    this.name = name;
    this.description = description;
    this.quantityFormat = quantityFormat;
    this.quantity = quantity;
    this.category = category;
    this.createdDate = format(new Date(), "yyyy-MM-dd");
    this.completionHistory = {};

    // Populate completion history
    let year = new Date().getFullYear();
    let date = new Date(year, 0, 1);
    let end = new Date(year, 11, 31);

    while (date <= end) {
      const dateStr = format(date, "yyyy-MM-dd");
      this.completionHistory[dateStr] = { completed: false, quantity: 0 };
      date.setDate(date.getDate() + 1);
    }
  }

  changeQuantityFormat(newFormat) {
    this.quantityFormat = newFormat;
  }

  increaseQuantity(amount) {
    this.quantity += amount;
  }

  resetQuantity() {
    this.quantity = 0;
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
  constructor(name, description, timesCompleted = 0, category = undefined) {
    this.name = name;
    this.description = description;
    this.timesCompleted = timesCompleted;
    this.category = category;
    this.createdDate = format(new Date(), "yyyy-MM-dd");
    this.completionHistory = {};

    // Populate completion history
    let year = new Date().getFullYear();
    let date = new Date(year, 0, 1);
    let end = new Date(year, 11, 31);

    while (date <= end) {
      const dateStr = format(date, "yyyy-MM-dd");
      this.completionHistory[dateStr] = { completed: false };
      date.setDate(date.getDate() + 1);
    }
  }

  increaseTimesCompleted(amount) {
    this.timesCompleted += amount;
  }

  resetTimesCompleted() {
    this.timesCompleted = 0;
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
