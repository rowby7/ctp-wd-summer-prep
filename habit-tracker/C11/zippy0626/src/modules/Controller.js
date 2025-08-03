import View from "./View.js";
import Model from "./Model.js"

const Controller = {
  init() {
    Model.initStorage()

    View.onAddHabitClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.show();
    });

    View.onModalOverlayClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
    });

    View.addHabitModal.onCreateClick((event) => {
      event.preventDefault();
      View.addHabitModal.hide();
      // do some stuff with Model.js here
      const habitData = View.addHabitModal.getFormData()
      const habit = Model.createHabit(habitData)
      Model.setHabit(habit)
    });

    View.addHabitModal.onCancelClick(() => {
      View.addHabitModal.clear();
      View.addHabitModal.hide();
    });
  },
};

export default Controller;
