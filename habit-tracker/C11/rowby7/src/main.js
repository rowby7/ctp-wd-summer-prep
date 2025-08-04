const form = document.getElementById('submit_habit')
const habits = []
form.addEventListener((event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    
    const habit = {
        habitName: data.get('habit_name'),
        targetStreak: data.get('target_streak')
    }
    
    habits.push(habit)
    console.log(JSON.stringify(habits))
})

const renderHabits = (habits) => {
const habitList = document.getElementById('habit_list')


habitList.innerHtml = 
    habits.map(habit => 
        <li>${habit.name}; ${habit.targetStreak}</li>
    ).join('\n')

}