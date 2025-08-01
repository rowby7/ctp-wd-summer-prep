// habitType is `quantitative` or `boolean`

class QuantitativeHabit {
  constructor(name, description, quantityFormat = undefined, quantity = 0) {
    this.name = name;
    this.description = description;
    this.quantityFormat = quantityFormat;
    this.quantity = quantity;
  }

  changeQuantityFormat(newFormat) {
    this.quantityFormat = newFormat;
  }

  increaseQuantity(amount) {
    this.quantity += amount;
  }

  resetQuantity() {
    this.quantity = 0
  }
}

class BooleanHabit {
  constructor(name, description, timesCompleted = 0) {
    this.name = name;
    this.description = description;
    this.timesCompleted = timesCompleted;
  }

  increaseTimesCompleted(amount) {
    this.timesCompleted += amount;
  }

  resetTimesCompleted() {
    this.timesCompleted = 0
  }
}

function creatHabit(name, description, habitType, quantityFormat = undefined) {
  if (habitType === "quantitative") {
    const habit = new QuantitativeHabit(name, description, quantityFormat);
    return habit
  };
  if (habitType === "boolean") {
    const habit = new BooleanHabit(name, description);
    return habit
  };
}

export { QuantitativeHabit, BooleanHabit };
