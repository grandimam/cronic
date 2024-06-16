type JobFunc = (() => void) | null

export enum Unit {
    DAY,
    HOUR,
    SECOND,
    MINUTE
}


export class Job {
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