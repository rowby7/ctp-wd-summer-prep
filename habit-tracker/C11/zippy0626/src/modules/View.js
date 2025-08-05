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
        habitContainer.appendChild(habitCard)
      }
    },

    getHabitCard(habit) {
      const year = new Date().getFullYear();

      const monthsContainer = document.createElement("div");
      monthsContainer.classList.add("month-container");

      // Loop through the months
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const month = document.createElement("div");
        month.classList.add("month");

        let firstDay = new Date(year, monthIndex, 1);
        let lastDay = new Date(year, monthIndex + 1, 0); // 0th day of next month = last day of current month

        // Month name for each month
        const monthName = document.createElement('p')
        monthName.classList.add('month-name')
        monthName.textContent = firstDay.toLocaleString('default', { month: 'short' })
        monthsContainer.appendChild(monthName)

        // Loop through all days in the month && create boxes
        for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
          const box = document.createElement("div");
          box.classList.add("date-box");

          // Highlight today's date
          if (format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
            box.classList.add("todays-date")
          };
          
          box.title = format(day, "MM-dd-yyyy");
          box.dataset.date = format(day, "yyyy-MM-dd");
          month.appendChild(box);
        }

        monthsContainer.appendChild(month);
      }

      const habitCard = document.createElement("article");
      habitCard.classList.add("habit-card");

      const habitHeading = document.createElement("h1");
      habitHeading.classList.add("habit-card-name");
      habitHeading.dataset.habitName = habit.name;
      habitHeading.textContent = habit.name;

      habitCard.appendChild(habitHeading);
      habitCard.appendChild(monthsContainer)

      return habitCard;
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
