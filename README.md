# Curve Bezier Timer

### Control animation bezier curve in Javascript

This package will allow you to easily control your animation through a javascript bezier curve.<br>
You can also use this package just as a timer

<hr>

# Import to your project 
<hr>

```typescript
import Timer from "curve-bezier-timer"
```

# Usage
<hr>

```typescript
// creating with options
const timer = new Timer({
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
const options = {
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

const timer = new Timer(options)
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