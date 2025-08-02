import View from "./View.js";

const Controller = {
  init() {
    View.onAddHabitClick(() => {
      View.clearAddHabitForm();
      View.showAddHabitModal();
    });

    View.onModalOverlayClick(() => {
      View.clearAddHabitForm();
      View.hideAddHabitModal();
    });

    View.onCreateHabitClick((event) => {
      event.preventDefault();
      View.hideAddHabitModal();
      // do some stuff with Model.js here
      const data = View.getAddHabitFormData()
    });

    View.onCancelHabitClick(() => {
      View.clearAddHabitForm();
      View.hideAddHabitModal();
    });
  },
};

export default Controller;
