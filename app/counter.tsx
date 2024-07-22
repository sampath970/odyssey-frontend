'use client'
 
import { useState } from 'react'

// Example of specifying Client side code
// See 'use client' above
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}