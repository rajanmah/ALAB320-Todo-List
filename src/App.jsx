import React, { useState, useReducer } from 'react'
import Todo from './components/Todo'
import './app.css'


const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  }
];
export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo'
}
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos,
      newTodo(action.payload.name)]

    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.completed }
        }
        return todo
      })

    case ACTIONS.EDIT_TODO:
      return todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, id: action.payload.id } : todo
      )



    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)

    default:
      return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}
export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [name, setName] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null);


  const addTodo = () => {
    if (newTodo.trim() === '') return;

    if (editingTodo) {
      dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: editingTodo, name: newTodo } });
      setEditingTodo(null);
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { id: Date.now(), name: newTodo, completed: false } });
    }

    setNewTodo('');
  };

  const editTodo = todoId => {
    const todoToEdit = todos.find(todo => todo.id === todoId);
    setNewTodo(todoToEdit.name);
    setEditingTodo(todoId);
  };

  const toggleTodo = todoId => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: todoId });
    console.log(todoId)
  };




  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
    setName('')
  }


  return (
    <div className="display">
      <div className="header">Todo List</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter todo"
          value={name}
          onChange={e => setName(e.target.value)} />
       </form>
      {todos.map(todo => {
        return <div className="display-cards">
          <li className="text-deco" key={todos.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}/>  {todo.title}
          <Todo key={todo.id} ed={editTodo} todo={todo} dispatch={dispatch} />


        </li>
        </div>
      })}
  <h6>Total list Items : {todos.length} </h6>
    </div>
      

  )

}
