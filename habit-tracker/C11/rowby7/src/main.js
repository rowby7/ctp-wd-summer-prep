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
    isEditing: false,
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
   ${habit.isEditing ? `<input type="text" value="${habit.habitName}" id="habitName-${index}">` : habit.habitName} -
    ${habit.isEditing ? `<input type="number" value="${habit.targetStreak}" id="targetStreak-${index}">` : habit.targetStreak}

    <button onclick="toggleHabit(${index})">${habit.complete ? 'Mark Incomplete' : 'Mark Complete'}</button>
    <button onclick="deleteHabit(${index})">Delete</button>
    <button onclick="editHabit(${index})">${habit.isEditing ? 'Done' : 'Edit'}</button>
    </li>`
  })
  const combinedHTML = htmlStrings.join('')
  habitList.innerHTML = combinedHTML
}


function editHabit(index) {
  if(habits[index].isEditing){
    const newName = document.getElementById(`habitName-${index}`).value
    const newStreak = document.getElementById(`targetStreak-${index}`).value

    habits[index].habitName = newName
    habits[index].targetStreak = newStreak
  }
  habits[index].isEditing = !habits[index].isEditing
  localStorage.setItem('habits', JSON.stringify(habits))
  renderHabits(habits)
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
window.editHabit = editHabit