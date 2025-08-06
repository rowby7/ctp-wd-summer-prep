import { format } from "date-fns";
import { QuantitativeHabit } from "./habit.js";

const View = {
  query(selector) {
    return document.querySelector(selector);
  },

  // --- Overlay and Add Habit Btn ---
  onAddHabitBtnClick(callback) {
    View.query(".user-add-habit").addEventListener("click", callback);
  },

  onModalOverlayClick(callback) {
    View.query(".modal-overlay").addEventListener("click", callback);
  },

  // --- Habit Related Methods ---
  habit: {
    displayHabits(habits) {
      const habitContainer = View.query(".user-habits-container");
      habitContainer.innerHTML = "";
      // remember to handle no habits found later

      for (const habit of habits) {
        const habitCard = this.getHabitCard(habit);
        habitContainer.appendChild(habitCard);
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
        let lastDay = new Date(year, monthIndex + 1, 0);

        // Month name seperator for each month
        const monthName = document.createElement("p");
        monthName.classList.add("month-name");
        monthName.textContent = firstDay.toLocaleString("default", { month: "short" });
        monthsContainer.appendChild(monthName);

        // Loop through all days in the month && create boxes
        for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
          const box = document.createElement("div");
          box.classList.add("date-box");

          // Highlight today's date
          if (format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
            box.classList.add("todays-date");
          }

          box.title = format(day, "MM-dd-yyyy");
          box.dataset.date = format(day, "yyyy-MM-dd");

          // Make green if done on that day
          let accessDate = format(day, "yyyy-MM-dd")
          habit.completionHistory[accessDate].completed === "true" ? box.classList.add("done") : undefined

          month.appendChild(box);
        }

        monthsContainer.appendChild(month);
      }

      const habitCard = document.createElement("article");
      habitCard.classList.add("habit-card");

      const habitHeading = document.createElement("h1");
      habitHeading.classList.add("habit-card-name");
      habitHeading.textContent = habit.name;

      const habitDesc = document.createElement("p");
      habitDesc.classList.add("habit-desc");
      habitDesc.textContent = "Description: " + habit.description; // fix later

      habitCard.appendChild(habitHeading);
      habitCard.appendChild(monthsContainer);
      habitCard.appendChild(habitDesc);

      // Attach dataset attributes
      habitCard.dataset.habitName = habit.name;
      habitCard.dataset.category = habit.category;

      return habitCard;
    },

    onHabitCardClick(callback) {
      View.query(".user-habits-container").addEventListener("click", callback);
    },

    getClickedDateData(target) {
      if (target.classList.contains("date-box")) {
        const data = {};
        const card = target.closest(".habit-card");
        data.displayDate = target.title;
        data.accessDate = target.dataset.date;
        data.habitName = card.dataset.habitName;
        data.category = card.dataset.category;
        return data;
      } else {
        return undefined;
      }
    },
  },

  // --- Log Modal Methods ---
  logModal: {
    show() {
      View.query(".log-modal").classList.remove("hidden");
      View.query(".modal-overlay").classList.remove("hidden");
    },

    hide() {
      View.query(".log-modal").classList.add("hidden");
      View.query(".modal-overlay").classList.add("hidden");
    },

    clear() {
      View.query("#log-habit-form").reset();
    },

    getFormData() {
      const modal = View.query(".log-modal");
      const data = new FormData(modal.querySelector("#log-habit-form"));
      const obj = {};
      for (const pair of data.entries()) {
        let key = pair[0]
        let value = pair[1]
        // Convert str data to correct data types
        if (key === "completed") {
          value === "true" ? value = true : value = false
        }
        if (key === "quantity") {
          value instanceof String ? value = Number(value) : value = Number(value)
        }
        obj[key] = value
      }
      obj.accessDate = modal.dataset.accessDate;
      obj.habitName = modal.dataset.habitName;
      return obj;
    },

    updateFormView(dateData, habit) {
      // for getFormData
      const modal = View.query(".log-modal");
      modal.dataset.accessDate = dateData.accessDate;
      modal.dataset.habitName = dateData.habitName;

      const heading = View.query(".log-modal-heading");
      heading.textContent = `Log for ${dateData.displayDate}`;

      const habitName = View.query(".log-modal-habit-name");
      habitName.textContent = `${dateData.habitName}`;
      habitName.innerHTML += `<span class="category"> (${dateData.category})</span>`;

      const completedYes = View.query("#log-completed");
      const completedNo = View.query("#log-not-completed");

      // Helper fn that gets the accessDate then returns the history obj from that date
      let habitHistorydata = (date) => habit.completionHistory[date];

      habitHistorydata(dateData.accessDate).completed === "true"
        ? (completedYes.checked = true)
        : (completedNo.checked = true);

      const quantityInput = View.query("#log-quantity");
      const quantityLabel = View.query("label[for='log-quantity']");

      if (habit instanceof QuantitativeHabit) {
        quantityInput.classList.remove("hidden");
        quantityLabel.classList.remove("hidden");
        quantityInput.value = habitHistorydata(dateData.accessDate).quantity;
        let format = habit.quantityFormat[0].toUpperCase() + habit.quantityFormat.slice(1).toLowerCase();
        quantityLabel.textContent = `${format} Completed:`;
      } else {
        quantityInput.classList.add("hidden");
        quantityLabel.classList.add("hidden");
      }

      const notesInput = View.query("#log-notes");
      notesInput.value = habitHistorydata(dateData.accessDate).notes;
    },

    onSubmitClick(callback) {
      View.query("#log-habit-form").addEventListener("submit", callback);
    },

    onCancelClick(callback) {
      View.query("div.log-form-buttons button[type='reset']").addEventListener("click", callback);
    },
  },

  // --- Add Habit Modal Methods ---
  addHabitModal: {
    show() {
      View.query(".add-habit-modal").classList.remove("hidden");
      View.query(".modal-overlay").classList.remove("hidden");
    },

    hide() {
      View.query(".add-habit-modal").classList.add("hidden");
      View.query(".modal-overlay").classList.add("hidden");
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
      const data = new FormData(View.query("#add-habit-modal-form"));
      const obj = {};
      for (const pair of data.entries()) {
        let key = pair[0];
        let val = pair[1];
        obj[key] = val;
      }
      return obj;
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
