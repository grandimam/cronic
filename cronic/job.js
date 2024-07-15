export class Job {

    constructor(nextRun, lastRun, interval) {
        this.lastRun = lastRun
        this.nextRun = nextRun
        this.interval = interval
    }

    hour() {
        this.interval = this.interval * 3600000
        return this
    }

    second() {
        this.interval = this.interval * 1000
        return this
    }

    minute() {
        this.interval = this.interval * 60000
        return this
    }

    do(func) {
        this.func = func
    }

    shouldRun() {
        const now = new Date().getTime()
        return this.nextRun === null || now >= this.nextRun ? true : false
    }

    run() {
        const result = this.func ? this.func() : null
        this.nextRun = new Date(new Date().getTime() + this.interval).getTime()
        console.log("Time scheduled for next run: ", this.nextRun)
        return result
    }
}