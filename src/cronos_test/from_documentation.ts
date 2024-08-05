import { scheduleTask, validate, CronosExpression,CronosTask } from 'cronosjs'




/// schedule task every 10 minutes
scheduleTask('*/10 * * * *', (timestamp: number) => {
    console.log(`Task triggered at ${timestamp}`)
},{})
  
// schedule task at 16:10, on the 4th and last day of July, 2035 in the EST timezone
scheduleTask('0 10 16 4,L Jul * 2035', (timestamp: number) => {
console.log(`Task triggered at ${timestamp}`)
}, {
timezone: 'America/New_York'
})

// offset tasks occurring in daylight savings missing hour
scheduleTask('5/20 1 * Mar SunL', (timestamp: number) => {
console.log(`Task triggered at ${timestamp}`)
}, {
timezone: 'Europe/London',
missingHour: 'offset'
})
  





// validate cron string
validate('* * 5 smarch *') // false

validate('0 1/120 * * * *', {
strict: true
}) // false
  





// get next cron date
CronosExpression.parse('* * 2/5 Jan *').nextDate()

// get next 7 cron dates after 09:17, 12th Mar 2019
CronosExpression.parse('* * 2/5 Jan *').nextNDates(
new Date('2019-03-12T09:17:00.000Z'), 7)




//Основоное применение
// advanced usage
const expression = CronosExpression.parse('0 10 16 4,L Jul * 2035', {
timezone: 'America/New_York'
})
const task = new CronosTask(expression)
  
task
.on('run', (timestamp:any) => {
    console.log(`Task triggered at ${timestamp}`)
})
.on('ended', () => {
    console.log(`No more dates matching expression`)
})
.start()









// strict mode / warnings
try{
    CronosExpression.parse('0 1/120 * * * *', {
    strict: true
}) // Error: Strict mode: Parsing failed with 1 warnings
}catch(er){
    console.log(er)
}

const strictExpr = CronosExpression.parse('0 1/120 * * * *')

console.log(strictExpr.warnings)
// [{
//   type: 'IncrementLargerThanRange',
//   message: "Increment (120) is larger than range (58) for expression '1/120'"
// }]
  






// schedule tasks from a list of dates
const taskFromDates = new CronosTask([
    new Date(2020, 7, 23, 9, 45, 0),
    1555847845000,
    '5 Oct 2019 17:32',
])

taskFromDates
.on('run', (timestamp:any) => {
    console.log(`Task triggered at ${timestamp}`)
})
.on('ended', () => {
    console.log(`No more dates in list`)
})
.start()