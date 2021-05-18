import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initialAnecdotes} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(initialAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList store={props.store}/>
      <AnecdoteForm/>
    </div>
  )
}

export default App