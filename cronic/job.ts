type JobFunc = (() => void) | null

export class Job {
    public func: JobFunc
    public interval: number
    public lastRun: number | null
    public nextRun: number | null

    constructor(interval: number) {
        this.func = null
        this.nextRun = null
        this.lastRun = null
        this.interval = interval
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

    public do(func: JobFunc) {
        this.func = func
    }
}