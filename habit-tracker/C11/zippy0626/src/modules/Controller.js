import View from "./View.js";
import Model from "./Model.js";

const Controller = {
  init() {
    Model.initStorage();

    View.habit.displayHabits(Model.getAllHabits());

    View.onAddHabitBtnClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.show();
    });

    View.onModalOverlayClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
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

    View.addHabitModal.onSubmitClick((event) => {
      event.preventDefault();
      View.addHabitModal.hide();

      const habitData = View.addHabitModal.getFormData();
      const habit = Model.createHabit(habitData);
      Model.setHabit(habit);

      View.habit.displayHabits(Model.getAllHabits())
    });
  },
};

export default Controller;
