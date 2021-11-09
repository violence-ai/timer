# Timer

This library will help you create a convenient timer. <br>
Just create a timer and write your code in the events you need. <br>
The library also supports the work with cubic bezier

<hr>

# Import to your project 
<hr>

```typescript
import Timer from "violence-ai/timer"
```

# Usage
<hr>

```typescript
// creating with options
let timer = new Timer({
    duration: 10000,
    cubicBezier: 'ease'
})

// event on progress
timer.onTime((progressData) => {

    console.log(`Remain: ${progressData.days} days ${progressData.hours}:${progressData.minutes}:${progressData.seconds}:${progressData.ms} (total: ${progressData.progress}%)`)
})

// event on end
timer.onEnd(() => {

    console.log('finish')
})

```

# Create instance
<hr>

```typescript
let options = {
    duration: 10000, // 10 sec
    // Refresh rate
    // Default: 50
    // for clock timer use 1000ms
    // for animation recommended use 5-50 (similar to fps)
    // min value: 5
    refreshRateMs: 1000, // 1 sec (Optional)
    // Сubic bezier function 
    // Default: 'linear'
    // @String: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out' 
    // @Array: [.02,.57,.98,.41]
    // Help to create your own function: https://cubic-bezier.com/ 
    cubicBezier: 'ease', // (Optional)
}

let timer = new Timer(options)
```

# Events
<hr>

```typescript
// stop
timer.stop()

// progress
timer.onTime((progressData) => {
    
    // your code...
})

// finish
timer.onEnd(() => {

    // your code...
})
```