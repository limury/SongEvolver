import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
} from '../redux/counter/counterSlice';
import { useGetPokemonByNameQuery } from '../services/pokemon';


function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  return (
    <div>
        <p>{count}</p>
        <button onClick={() => dispatch(increment())}>
            Increment by 1
        </button>
        <button onClick={() => dispatch(decrement())}>
            Decrement by 1
        </button>
        <p> </p>
        <div>
          { error ? (
            <p>oh no there was an error</p>
          ) : isLoading ? (
            <p>Loading....</p>
          ) : data ? (
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          ) : null
          }
        </div>
    </div>
  )
}

export default Counter