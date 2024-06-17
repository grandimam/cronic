type JobFunc = (() => void) | null

enum Days {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 7,
}

export class Job {
    public func: JobFunc
    public day?: Days
    public nextRun?: number
    public lastRun?: number
    public interval?: number

    constructor(interval: number = 1) {
        this.day = null
        this.func = null
        this.nextRun = null
        this.lastRun = null
        this.interval = interval
    }

    private setNextRun() {
        const now = new Date().getTime()
        // week schedule, then move the clock to next week
        // day schedule, then move the clock to next run
        if 
    }

    public shouldRun(): boolean {
        const now = new Date().getTime()
        return this.nextRun === null || now >= this.nextRun ? true : false
    }

    public run(): any {
        const result = this.func ? this.func() : null
        this.nextRun = new Date(new Date().getTime() + this.interval).getTime()
        console.log("Time scheduled for next run: ", this.nextRun)
        return result
    }



    public hour(): Job {
        this.interval = this.interval * 3600000
        return this
    }

    public second(): Job {
        this.interval = this.interval * 1000
        return this
    }

    public minute(): Job {
        this.interval = this.interval * 60000
        return this
    }

    public week(day: Days): Job {
        if (Object.values(Days).includes(day)) {
          this.day = day;
        }
        return this;
    }

    public do(func: JobFunc) {
        this.func = func
    }
}