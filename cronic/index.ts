import { Unit } from "./job"
import { Scheduler } from "./schedule"

function hello() {
    console.log('Hello!')
}

const schedule = new Scheduler()
schedule.every(1, Unit.SECOND).do(hello)

while (true) {
    schedule.runPending()
}