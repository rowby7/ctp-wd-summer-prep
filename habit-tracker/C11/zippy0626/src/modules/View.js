import { format } from "date-fns";

const View = {
  query(selector) {
    return document.querySelector(selector);
  },

  onAddHabitBtnClick(callback) {
    View.query(".user-add-habit").addEventListener("click", callback);
  },

  onModalOverlayClick(callback) {
    View.query(".modal-overlay").addEventListener("click", callback);
  },

  habit: {
    displayHabits(habits) {
      const habitContainer = View.query(".user-habits-container");
      habitContainer.innerHTML = "";
      // remember to handle no habits found later

      for (const habit of habits) {
        const habitCard = this.getHabitCard(habit);
        habitContainer.innerHTML += habitCard;
      }
    },

    getHabitCard(habit) {
      const year = new Date().getFullYear();
      let date = new Date(year, 0, 1); // Jan 1st
      let end = new Date(year, 11, 31); // Dec 31st

      // Generate Date Boxes (based on Habit's Completion History later)
      let dateBoxes = "";

      while (date <= end) {
        const dateStr = format(date, "yyyy-MM-dd");
        dateBoxes += `<div class="date-box" data-date="${dateStr}"></div>`;
        date.setDate(date.getDate() + 1);
      }

      const str = `
        <article class="habit-card flex-col">
          <h1 class="habit-card-name" data-habit-name="${habit.name}">${habit.name}</h1>
          <div class="habit-date-boxes-container flex-row">
            <div class="habit-date-boxes">
              ${dateBoxes}
            </div>
          </div>
        </article>
      `;

      return str;
    },
  },

  // group related methods in object properties
  addHabitModal: {
    show() {
      const addHabitModal = View.query(".add-habit-modal");
      const overlay = View.query(".modal-overlay");
      overlay.classList.remove("hidden");
      addHabitModal.classList.remove("hidden");
    },

    hide() {
      const addHabitModal = View.query(".add-habit-modal");
      const overlay = View.query(".modal-overlay");
      overlay.classList.add("hidden");
      addHabitModal.classList.add("hidden");
    },

    clear() {
      View.query("#add-habit-modal-form").reset();
    },

    showHabitQuantityFormat() {
      View.query(".habit-quantity-format").classList.remove("hidden");
      View.query("#habit-quantity-format").required = true;
    },

    hideHabitQuantityFormat() {
      View.query(".habit-quantity-format").classList.add("hidden");
      View.query("#habit-quantity-format").required = false;
    },

    getFormData() {
      const d = new FormData(document.getElementById("add-habit-modal-form"));
      const data = {};
      for (const pair of d.entries()) {
        let key = pair[0];
        let val = pair[1];
        data[key] = val;
      }
      return data;
    },

    onSubmitClick(callback) {
      View.query("#add-habit-modal-form").addEventListener("submit", callback);
    },

    onCancelClick(callback) {
      View.query(".cancel-habit-btn").addEventListener("click", callback);
    },

    onHabitTypeClick(callback) {
      View.query("#complete").addEventListener("click", callback);
      View.query("#number").addEventListener("click", callback);
    },
  },
};

export default View;
