import React, { useEffect, useState } from 'react';
import './App.css';
import { AddTodoButton } from './components/AddTodoButton';
import { TodoItem } from './components/TodoItem';
import { TodoModal } from './components/TodoModal';
import { ITodo } from './models/todo';
import { CSSTransition } from 'react-transition-group';
import { Button, Checkbox } from "@material-tailwind/react"

function App() {

  const [todos, setTodos] = useState<ITodo[]>([])
  const [modalVision, setModalVision] = useState(false)
  const [all, setAll] = useState(true)
  const [done, setDone] = useState(false)
  const [active, setActive] = useState(false)
  const [menuVision, setMenuVision] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('todos') != null) {
      const raw : any = localStorage.getItem('todos') || []
    setTodos(JSON.parse(raw))
    }
  }, [])

  useEffect(() => {
    if (todos[0] != null)
      setMenuVision(true)
    else
      setMenuVision(false)
  }, [todos])
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const AddTodo = (todo: ITodo) => {
    setTodos([
      ...todos, todo
     ])
    setModalVision(false)
  }

  const DeleteTodo = (id : number) => {
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const ToggleTodo = (id : number) => {
    setTodos(todos.map(todo => {
      if (todo.id == id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const ClearDone = () => {
    setTodos(todos.filter(todo => {
      return todo.completed == false
    }))
  }

  const CountDone = () => {
    let count = 0
    todos.forEach(todo => {
      if (todo.completed == false) {
        count++
      }})
    if (count > 0) {
      return 'Todo left: ' + count
    }
    else {
      return 'All done'
    }
  }

  function FilterDone(todo : ITodo) {
    if (todo.completed == true) {
      return todo
    }
  }

  function FilterActive(todo : ITodo) {
    if (todo.completed == false) {
      return todo
    }
  }

  function ShowAll() {
    setAll(true)
    setActive(false)
    setDone(false)
  }

  function ShowDone() {
    setAll(false)
    setActive(false)
    setDone(true)
  }

  function ShowActive() {
    setAll(false)
    setActive(true)
    setDone(false)
  }

  const colorAll = all? 'green' : 'blue'
  const colorDone = done? 'green' : 'blue'
  const colorActive = active? 'green' : 'blue'

  return (
    <div className='px-2'>
      <div className='container mx-auto max-w-2xl pt-5'>
        <h1 className='main-title text-center font-bold'>Todo List</h1>
        <div className='todos bg-gray-100 py-2 px-4 rounded-md shadow-lg'>
          {all && todos.map(todo => <TodoItem onToggle={ToggleTodo} onDeleteTodo={DeleteTodo} todoItem={todo} key={todo.id}/>)}
          {done && todos.filter(FilterDone).map(todo => <TodoItem onToggle={ToggleTodo} onDeleteTodo={DeleteTodo} todoItem={todo} key={todo.id}/>)}
          {active && todos.filter(FilterActive).map(todo => <TodoItem onToggle={ToggleTodo} onDeleteTodo={DeleteTodo} todoItem={todo} key={todo.id}/>)}
          { menuVision && <div className='menu mt-2 flex justify-between items-center'>
            <p className='pl-3'>{CountDone()}</p>
            <div className='flex justify-center items-center'>
              <Button onClick={ShowAll} color={colorAll} size="sm" variant="text">All</Button>
              <Button onClick={ShowActive} color={colorActive} size="sm" variant="text">Active</Button>
              <Button onClick={ShowDone} color={colorDone} size="sm" variant="text">Done</Button>
            </div>
            <div>
              <Button onClick={ClearDone} color='red' size="sm" variant="text">Clear done</Button>
            </div>
          </div>}
          {!menuVision && <p className='hello text-center'>Add new item using the plus button!</p>}
        </div>
        <AddTodoButton bounce={menuVision} onOpen={() => setModalVision(true)}/>
        <CSSTransition in={modalVision} timeout={500} classNames="my-node" unmountOnExit mountOnEnter>
          <TodoModal onSubmit={AddTodo}/>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
