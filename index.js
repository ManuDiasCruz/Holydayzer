import express from "express"

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ]

function formatDateList(){
    let list = "";

    for (let i = 0; i < holidays.length; i++)
        list+=formatDate(holidays[i])
    
    console.log(list)

    return (
        `<ul>
            ${list}
        </ul>`
    )
}

function formatMonthList(month){
    let list = "";

    for (let i = 0; i < holidays.length; i++){
        let holidayMonth = holidays[i].date.split('/');
        console.log(holidayMonth[0])
        if (holidayMonth[0] == month)
            list+=formatDate(holidays[i])
    }
    
    console.log(list)

    return (
        `<ul>
            ${list}
        </ul>`
    )
}

function formatDate(holiday){
    return (
        `<li>
            ${holiday.date} : ${holiday.name}
        </li>`
    )
}

function todayIsHoliday(){
    const today = new Date()

    let i = 0
    while(i < holidays.length){
        if (today.toLocaleDateString('en-US') === holidays[i])
            return `Sim, hoje é ${holidays[i].date}, feriado de ${holidays[i].name}`
        i++
    }
    return `Não, hoje não é feriado`
}

const app = express()

app.get("/holidays", (request, response) => {
    response.send(formatDateList())
})

app.get("/is-today-holiday", (request, response) => {
    response.send(todayIsHoliday())
})

app.get("/holidays/:month", (request, response) => {
    const monthId = parseInt(request.params.month)
    response.send(formatMonthList(monthId))
})

app.listen(4001, () => console.log("Servidor Holydayzer no AR!"))

