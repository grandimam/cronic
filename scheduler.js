import { Job } from "./job"

export class Scheduler {

    constructor() {
        this.jobs = []
    }

    every(interval) {
        const job = new Job(interval)
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
            if (job.shouldRun()) {
                job.run()
            }
        }
    }
}