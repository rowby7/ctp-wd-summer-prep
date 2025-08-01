const Controller = {
  init() {
    this.handleUserToolButtons()
    this.handleModalClose()
  },

  handleUserToolButtons() {
    const addHabitBtn = document.querySelector('.user-add-habit');
    const filterBtn = document.querySelector('.user-filters');

    const overlay = document.querySelector('.modal-overlay')
    const modal = document.querySelector('.modal')

    addHabitBtn.addEventListener('click', () => {
      overlay.classList.toggle("hidden")
      modal.classList.toggle("hidden")
    })

    filterBtn.addEventListener('click', () => {
      
    })
  },

  handleModalClose() {
    const overlay = document.querySelector('.modal-overlay')
    const modal = document.querySelector('.modal')

    overlay.addEventListener('click', () => {
      overlay.classList.toggle("hidden")
      modal.classList.toggle("hidden")
    })

    modal.addEventListener('keypress', (event) => {
      let key = event.key
      console.log(key)
    })
  },
}

export default Controller;