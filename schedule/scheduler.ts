import { Job, Unit } from "./job"

export class Scheduler {

    private jobs: Job[]

    constructor() {
        this.jobs = []
    }

    public every(interval: number | null = null, unit: Unit | null = null): Job {
        let job = new Job(interval, unit)
        this.jobs.push(job)
        return job
    }

    runPending() {
        this.jobs.sort((a, b) => {
            if (a !== null && b !== null && a.nextRun !== null && b.nextRun !== null) {
                return a.nextRun - b.nextRun
            }
            return 0
        })
        for (let job of this.jobs) {
            let x = job.run()            
            console.log(x)
        }
    }
}
