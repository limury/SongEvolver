import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from '../redux/counter/counterSlice';


function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')
  return (
    <div>
        <p>{count}</p>
        <button onClick={() => dispatch(increment())}>
            Increment by 1
        </button>
        <button onClick={() => dispatch(decrement())}>
            Decrement by 1
        </button>
    </div>
  )
}

export default Counter