export default class Habit {
  constructor(name, description, timesCompleted = 0, quantityCompleted = 0, quantityFormat = undefined) {
    this.name = name;
    this.description = description;
    this.timesCompleted = timesCompleted
    this.quantityCompleted = quantityCompleted
    this.quantityFormat = quantityFormat
  }

  incrementTimesCompleted() {
    this.timesCompleted += 1
  }

  addQuantityCompleted(amount) {
    this.quantityCompleted += amount;
  }

  changeQuantityFormat(newFormat) {
    this.quantityFormat = newFormat
  }

  getTimesCompleted() {
    return this.timesCompleted
  }

  getQuantityCompleted() {
    return this.quantityCompleted
  }

  reset() {
    this.timesCompleted = 0;
    this.quantityCompleted = 0;
  }
}
