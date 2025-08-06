import View from "./View.js";
import Model from "./Model.js";
import { QuantitativeHabit } from "./habit.js";

const Controller = {
  init() {
    Model.initStorage();
    View.habit.displayHabits(Model.getAllHabits());

    this.bindHabitEvents();
    this.bindModalEvents();

    View.onAddHabitBtnClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.show();
    });

    View.onModalOverlayClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
      View.logModal.clear();
      View.logModal.hide();
    });
  },

  bindHabitEvents() {
    View.habit.onHabitCardClick((event) => {
      const dateData = View.habit.getClickedDateData(event.target)
      if (dateData) {
        const habit = Model.getHabit(dateData.habitName)
        View.logModal.updateFormView(dateData, habit)
        View.logModal.show()
      }
    });
  },

  bindModalEvents() {
    // --- Add Habit Modal Event Listeners ---
    View.addHabitModal.onSubmitClick((event) => {
      event.preventDefault();
      View.addHabitModal.hide();

      const data = View.addHabitModal.getFormData();
      const habit = Model.createHabit(data.habitName, data.habitDesc, data.habitQuantityFormat, data.habitCategory);
      Model.setHabit(habit);

      View.habit.displayHabits(Model.getAllHabits());
    });

    View.addHabitModal.onCancelClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
    });

    View.addHabitModal.onHabitTypeClick((event) => {
      let element = event.target;
      if (element.value === "number") {
        View.addHabitModal.showHabitQuantityFormat();
      } else {
        View.addHabitModal.hideHabitQuantityFormat();
      }
    });

    // --- Log Habit Modal Event Listeners ---
    View.logModal.onSubmitClick((event) => {
      event.preventDefault();
      const data = View.logModal.getFormData()
      // {completed: 'false', quantity: '0', notes: '', accessDate: '2025-03-09', habitName: 'Running'}
      const habit = Model.getHabit(data.habitName)
      if (habit instanceof QuantitativeHabit) {
        habit.changeQuantityOnDate(data.accessDate, data.quantity)
        habit.changeCompletionOnDate(data.accessDate, data.completed)
        habit.changeNotesOnDate(data.accessDate, data.notes)
      } else {
        habit.changeCompletionOnDate(data.accessDate, data.completed)
        habit.changeNotesOnDate(data.accessDate, data.notes)
      }
      Model.setHabit(habit)

      View.logModal.hide();

      View.habit.displayHabits(Model.getAllHabits())
    });

    View.logModal.onCancelClick(() => {
      View.logModal.hide();
    });
  },
};

export default Controller;
