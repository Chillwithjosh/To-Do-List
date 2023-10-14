import React from 'react'
import './App.css'
import {RiTodoLine} from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function App() {
  const[inputData, setInputData] = React.useState('')
  const[started, setStarted] = React.useState(false)
  const[error, setError] = React.useState()
  const [task, setTask] = React.useState([])

  const[name, setName] = React.useState(
  {
    personName : '',
    todoListName :''
  })

  function handleCreate(){
    if(name.todoListName  && name.personName  !== ''){
      setStarted(prevStarted => !prevStarted)
    }else{
      setError(true)
    }
  }


  function handleName(event){
    setName(prevName => {
      return{
        ...prevName,
        [event.target.name] : event.target.value
      }
    })
  }

  // Add Section
  const handleSubmit = (event) => {
    event.preventDefault()
    const addItem = {
      id :  Math.floor(Math.random() * 1000),
      text: inputData,
      completed: false 
    }
    setTask([...task, addItem])
    setInputData('')
  }

  // Delete Section  
  const handleDelete = (id) => {
    const filterItem = [...task].filter(task => task.id !== id)
    setTask(filterItem)
  }

  const handleDoubleClick = (id) => {
    setTask(
      task.map(task =>(
        task.id ===id ? {...task, completed: !task.completed} : task
      ))
    )
    // console.log('worked')
  }

   // Set Date
   const date = new Date()
   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'December']


   

  const taskElement = task.map(task => {
    return(
      <div className= {`task-items ${task.completed ? 'completed' : ''}`} key={task.id} onDoubleClick={() => handleDoubleClick(task.id)}>
        <p>{task.text}</p>
        <AiOutlineMinus  className='icon-task' onClick={() => handleDelete(task.id)} />
      </div>
    )
  })

  return(
    <div className="app">
      <div className="container">
      {
        started ?
      <div>
        <div className="header-div">
        <h1>{name.todoListName} </h1><RiTodoLine className='todolist-icon'/>
        </div>
        <div className="date">
          <p>{days[date.getDay()]}</p>
          <p>{date.getDate()},</p>
          <p>{months[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          <AiOutlinePlus  className="icon" />
          <input 
          type="text"
          className='input-box'
          placeholder='Enter a task'
          value={inputData}
          onChange={event => setInputData(event.target.value)}
          />
          </div>
        </form>
        <div>
          {taskElement}
        </div> 
          <p className='task-number'>{task < 1 ? 'You have no item on your todo-list' :  `You have ${task.length} item${task.length > 1 ? 's' : ''} on your To-Do List `}</p>
        
      </div> :
      
      <div className='menu'>
        <p className='input-header-name'>Hello, what is your name ?</p>
        <input 
        type="text" 
        placeholder='Name'
        onChange={handleName}
        name='personName'
        className='menu-input top'
        required = {error}
        />
        <span className='error-message-top'>input name</span>
        <p className='input-header-listname'>What do you want to call your To-Do List ?</p>
        <input 
        type="text" 
        placeholder='e.g Groceries'
        onChange={handleName}
        name='todoListName'
        className='menu-input bottom'
        required = {error}
        />
        <span className='error-message-bottom'>input todo-list name</span>
        
        <button className="create-button" onClick={handleCreate}>Create</button>
        </div>
    }
    </div>
    </div>
  )


}

