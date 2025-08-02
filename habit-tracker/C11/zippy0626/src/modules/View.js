const View = {
  getSearchBar() {
    return document.querySelector("#search-bar");
  },

  getAddHabitBtn() {
    return document.querySelector(".user-add-habit");
  },

  getFiltersBtn() {
    return document.querySelector(".user-filters");
  },

  getModalOverlay() {
    return document.querySelector(".modal-overlay");
  },

  getCreateHabitBtn() {
    return document.querySelector(".create-habit-btn");
  },

  getCancelHabitBtn() {
    return document.querySelector(".cancel-habit-btn");
  },

  getAddHabitFormData() {
    const d = new FormData(document.getElementById("add-habit-modal-form"))
    const data = {}
    for (const pair of d.entries()) {
      let key = pair[0]
      let val = pair[1]
      data[key] = val
    }
    return data
  },

  showAddHabitModal() {
    const addHabitModal = document.querySelector(".add-habit-modal");
    const overlay = document.querySelector(".modal-overlay");
    overlay.classList.remove("hidden");
    addHabitModal.classList.remove("hidden");
  },

  hideAddHabitModal() {
    const addHabitModal = document.querySelector(".add-habit-modal");
    const overlay = document.querySelector(".modal-overlay");
    overlay.classList.add("hidden");
    addHabitModal.classList.add("hidden");
  },

  clearAddHabitForm() {
    document.getElementById("add-habit-modal-form").reset();
  },

  // event listener callback fns for Controller
  // handle add-habit modal related
  onAddHabitClick(callback) {
    this.getAddHabitBtn().addEventListener("click", callback);
  },

  onModalOverlayClick(callback) {
    this.getModalOverlay().addEventListener("click", callback);
  },

  onCreateHabitClick(callback) {
    this.getCreateHabitBtn().addEventListener("click", callback);
  },

  onCancelHabitClick(callback) {
    this.getCancelHabitBtn().addEventListener("click", callback);
  },
};

export default View;
