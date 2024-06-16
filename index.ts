enum Unit {
    DAY,
    HOUR,
    SECOND,
    MINUTE
}

type JobFunc = (() => void) | null


class Job {
    public func: JobFunc
    public unit: Unit | null
    public lastRun: number | null
    public nextRun: number | null
    public interval: number | null

    constructor(interval: number | null = null, unit: Unit | null = null) {
        this.func = null
        this.unit = unit
        this.nextRun = null
        this.lastRun = null
        this.interval = interval
    }

    public shouldRun(): boolean {
        const now = new Date().getTime()
        return this.nextRun !== null ? now >= this.nextRun : false
    }

    public run(): any {
        let r = this.func ? this.func() : null
        this.setNextRun()
        return r
    }

    private setNextRun(): void {
        let now = new Date()
        this.nextRun = new Date(now.getTime() + this.getIntervalInMs()).getTime()
    } 

    private getIntervalInMs() {
        if (this.unit === Unit.SECOND) {
            return this.second()
        } else if (this.unit === Unit.MINUTE) {
            return this.minute()
        } else if (this.unit === Unit.HOUR) {
            return this.hour()
        }
        return 1
    }

    private hour() {
        return this.unit === Unit.MINUTE && this.interval ? this.interval * 3600000: 1
    }

    private second() {
        return this.unit === Unit.SECOND && this.interval ? this.interval * 1000: 1
    }

    private minute() {
        return this.unit === Unit.MINUTE && this.interval ? this.interval * 60000: 1
    }

    public do(func: JobFunc) {
        this.func = func
        if (this.func !== null) {
            this.func()
        }
    }
}

class Scheduler {

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

function hello() {
    console.log('Hello!')
}

const schedule = new Scheduler()
schedule.every(1, Unit.SECOND).do(hello)

while (true) {
    schedule.runPending()
}