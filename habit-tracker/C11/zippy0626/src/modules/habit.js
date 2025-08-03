import { format, addDays } from "date-fns";

class QuantitativeHabit {
  constructor(name, description, quantityFormat = undefined, quantity = 0, category = undefined) {
    this.name = name;
    this.description = description;
    this.quantityFormat = quantityFormat;
    this.quantity = quantity;
    this.category = category;
    this.createdDate = new Date();
    this.lastCompletedDate = undefined;
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
}

class BooleanHabit {
  constructor(name, description, timesCompleted = 0, category = undefined) {
    this.name = name;
    this.description = description;
    this.timesCompleted = timesCompleted;
    this.category = category;
    this.createdDate = new Date();
    this.lastCompletedDate = undefined;
  }

  increaseTimesCompleted(amount) {
    this.timesCompleted += amount;
  }

  resetTimesCompleted() {
    this.timesCompleted = 0;
  }
}

export { QuantitativeHabit, BooleanHabit };
