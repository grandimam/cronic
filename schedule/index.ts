import { Unit } from "./job";
import { Scheduler } from "./scheduler";

function hello() {
    console.log('Hello')
}

let scheduler = new Scheduler()
scheduler.every(Unit.SECOND).do(hello)

while (true) {
    scheduler.runPending()
}