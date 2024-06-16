# Cronic

Cron-job library for humans in Typescript

# Usage

```typescript

import { Scheduler } from "./schedule"

function job() {
    console.log('Hello!')
}

const schedule = new Scheduler()

schedule.every(10).second().do(job)
schedule.every(10).second().do(job)
schedule.every(10).minute().do(job)
schedule.every().hour().do(job)

while (true) {
    schedule.runPending()
}
```

# Next

```typescript
schedule.every().day.at("10:30").do(job)
schedule.every(5).to(10).minutes.do(job)
schedule.every().monday.do(job)
schedule.every().wednesday.at("13:15").do(job)
schedule.every().day.at("12:42", "Europe/Amsterdam").do(job)
schedule.every().minute.at(":17").do(job)
```