const form = document.getElementById('habit_form')
let habits = []

document.addEventListener('DOMContentLoaded', () => {
  
  //get saved data with key habits
  const savedHabits = localStorage.getItem('habits')

  //check if savedHabits got anything
  if (savedHabits !== null){
    habits = JSON.parse(savedHabits)

  } else {
    //if did not get anything return an empty array
    habits = []
  }

  //call renderhabits to display saved habits
  renderHabits(habits)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const habitName = data.get('habit_name')
  const targetStreak = data.get('target_streak')

  const habit = {
    habitName : habitName,
    targetStreak : targetStreak,
    complete : false,
    streak : 0
  }
  habits.push(habit)
  localStorage.setItem('habits', JSON.stringify(habits))
  renderHabits(habits)
  event.target.reset()

})

function renderHabits(habits) {
  const habitList = document.getElementById('habit_list')

  const htmlStrings = habits.map((habit, index) => {
    return `<li>
    ${habit.habitName} - Target: ${habit.targetStreak}
    <button onclick="toggleHabit(${index})">${habit.complete ? 'Mark Incomplete' : 'Mark Complete'}</button>
    <button onclick="deleteHabit(${index})">Delete</button>
    </li>`
  })
  const combinedHTML = htmlStrings.join('')
  habitList.innerHTML = combinedHTML
}



function toggleHabit(index) {
const habit = habits[index]
habit.complete = !habit.complete
localStorage.setItem('habits', JSON.stringify(habits))
renderHabits(habits)
}

function deleteHabit(index){
  habits.splice(index, 1)
  localStorage.setItem('habits', JSON.stringify(habits))
  renderHabits(habits)
}

window.toggleHabit = toggleHabit
window.deleteHabit = deleteHabit