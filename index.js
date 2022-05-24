const form = document.getElementById('processForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const roomNumber = formData.get('room')
    roomNumber
    ? fetch('https://time.ulstu.ru/api/1.0/timetable?filter=' + roomNumber)
        .then((response) => response.json())
        .then((data) => {
            console.log(JSON.stringify(data))
            document.querySelectorAll('#app > *').forEach(data => data.remove())
            for (const week of data.response.weeks) {
                renderWeek(week)
            }
        })
    : alert("Заполните номер аудитории.")
})

form.addEventListener('reset', (e) => {
    e.preventDefault()
    document.querySelectorAll('#app > *').forEach(data => data.remove())
})

function renderWeek(week){
    const table = document.createElement('table')
    for (const day of week.days) {
        renderDay(day, table)
    }
    document.getElementById('app').append(table)
}

function renderDay(day, table){
    const row = document.createElement('tr')
    for (const lesson of day.lessons) {
        renderLesson(lesson, row)
    }
    table.append(row)
}

function renderLesson(lesson, row){
    const cell = document.createElement('td')
    if (lesson.lenth > 0) {
        cell.innerHTML = lesson.map(data => data.group).join(", ")
        cell.style = "background-color: red"
    } else {
        cell.innerHTML = "-"
        cell.style = "background-color: green"
    }
    row.append(cell)
}
