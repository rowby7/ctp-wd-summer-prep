import View from "./View.js";
import Model from "./Model.js";
import { QuantitativeHabit } from "./habit.js";

const Controller = {
  init() {
    Model.initStorage();
    this.bindHabitEvents();
    this.bindModalEvents();
  },

  bindHabitEvents() {
    View.habit.displayHabits(Model.getAllHabits());

    View.onAddHabitBtnClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.show();
    });

    View.scrollToThisMonth()

    View.habit.onHabitCardClick((event) => {
      // Differentiate between a clicked date vs. edit habit
      const element = event.target;
      if (element.classList.contains("edit-icon")) {
        const habitName = event.target.closest(".habit-card").dataset.habitName;
        const habit = Model.getHabit(habitName);
        View.editHabitModal.updateFormView(habit);
        View.editHabitModal.show();
      } else if (element.classList.contains("date-box")) {
        const dateData = View.habit.getClickedDateData(element);
        if (dateData) {
          const habit = Model.getHabit(dateData.habitName);
          View.logModal.updateFormView(dateData, habit);
          View.logModal.show();
        }
      }
    });
  },

  bindModalEvents() {
    View.onModalOverlayClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
      View.logModal.clear();
      View.logModal.hide();
      View.editHabitModal.clear();
      View.editHabitModal.hide();
      View.confirmModal.clear();
      View.confirmModal.hide();
    });

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
      const data = View.logModal.getFormData();
      // {completed: 'false', quantity: '0', notes: '', accessDate: '2025-03-09', habitName: 'Running'}
      const habit = Model.getHabit(data.habitName);
      if (habit instanceof QuantitativeHabit) {
        habit.changeQuantityOnDate(data.accessDate, data.quantity);
        habit.changeCompletionOnDate(data.accessDate, data.completed);
        habit.changeNotesOnDate(data.accessDate, data.notes);
      } else {
        habit.changeCompletionOnDate(data.accessDate, data.completed);
        habit.changeNotesOnDate(data.accessDate, data.notes);
      }
      Model.setHabit(habit);

      View.logModal.hide();

      View.habit.displayHabits(Model.getAllHabits());
    });

    View.logModal.onCancelClick(() => {
      View.logModal.hide();
    });

    // --- Edit Habit Modal Event Listeners ---
    View.editHabitModal.onSubmitClick((event) => {
      event.preventDefault();
      const data = View.editHabitModal.getFormData();
      const habit = Model.getHabit(data.oldHabitName);

      // Handle habit name changes
      if (data.editedName !== data.oldHabitName) {
        Model.deleteHabit(data.oldHabitName);
        if (!(habit instanceof QuantitativeHabit)) {
          // bool habit
          habit.name = data.editedName;
          habit.category = data.editedCategory;
          habit.description = data.editedDesc;
        } else {
          habit.name = data.editedName;
          habit.quantityFormat = data.editedFormat;
          habit.category = data.editedCategory;
          habit.description = data.editedDesc;
        }
      } else {
        // Habit Name didn't change
        if (!(habit instanceof QuantitativeHabit)) {
          // bool habit
          habit.category = data.editedCategory;
          habit.description = data.editedDesc;
        } else {
          habit.quantityFormat = data.editedFormat;
          habit.category = data.editedCategory;
          habit.description = data.editedDesc;
        }
      }
      Model.setHabit(habit);
      View.editHabitModal.hide();
      View.editHabitModal.clear();

      View.habit.displayHabits(Model.getAllHabits());
    });

    View.editHabitModal.onCancelClick(() => {
      View.editHabitModal.hide();
    });

    View.editHabitModal.onDeleteClick(() => {
      View.editHabitModal.clear();
      View.editHabitModal.hide();
      View.confirmModal.clear();
      View.confirmModal.show();
    });

    // --- Confirm Modal Event Listeners ---
    View.confirmModal.onSubmitClick(() => {
      // add validate habit name logic!!
    });

    View.confirmModal.onCancelClick(() => {
      View.confirmModal.hide();
    });
  },
};

export default Controller;
