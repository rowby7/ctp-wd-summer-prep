const form = document.getElementById('habit_form')
const habits = []

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(event.target)

  const habit = {
    habitName: data.get('habit_name'),
    targetStreak: data.get('target_streak'),
    completed: false
  }

  habits.push(habit)
  console.log(JSON.stringify(habits))
  renderHabits(habits)
})

const renderHabits = (habits) => {
  const habitList = document.getElementById('habit_list')
  habitList.innerHTML = habits.map((habit, index) =>
    `<li>
      ${habit.habitName}; ${habit.targetStreak}
      <button onclick="toggleHabit(${index})">
        ${habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </li>`
  ).join('\n')
}

window.toggleHabit = (index) => {
  habits[index].completed = !habits[index].completed
  renderHabits(habits)
}