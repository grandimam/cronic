# cronic

Cron-job library for humans in Typescript

# Usage

```typescript

import { Scheduler } from "./schedule"

function hello() {
    console.log('Hello!')
}

const schedule = new Scheduler()
schedule.every(10).second().do(hello)

while (true) {
    schedule.runPending()
}
```
