const View = {
  query(selector) {
    return document.querySelector(selector);
  },

  onAddHabitClick(callback) {
    this.query(".user-add-habit").addEventListener("click", callback);
  },

  onModalOverlayClick(callback) {
    this.query(".modal-overlay").addEventListener("click", callback);
  },

  // group related methods in object properties
  addHabitModal: {
    query(selector) {
      return document.querySelector(selector);
    },

    show() {
      const addHabitModal = this.query(".add-habit-modal");
      const overlay = this.query(".modal-overlay");
      overlay.classList.remove("hidden");
      addHabitModal.classList.remove("hidden");
    },

    hide() {
      const addHabitModal = this.query(".add-habit-modal");
      const overlay = this.query(".modal-overlay");
      overlay.classList.add("hidden");
      addHabitModal.classList.add("hidden");
    },

    clear() {
      this.query("#add-habit-modal-form").reset();
    },

    showHabitQuantityFormat() {
      this.query(".habit-quantity-format").classList.remove("hidden")
      this.query("#habit-quantity-format").required = true
    },

    hideHabitQuantityFormat() {
      this.query(".habit-quantity-format").classList.add("hidden")
      this.query("#habit-quantity-format").required = false
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
      this.query("#add-habit-modal-form").addEventListener("submit", callback);
    },

    onCancelClick(callback) {
      this.query(".cancel-habit-btn").addEventListener("click", callback);
    },

    onHabitTypeClick(callback) {
      this.query("#complete").addEventListener("click", callback);
      this.query("#number").addEventListener("click", callback);
    },
  },
};

export default View;
