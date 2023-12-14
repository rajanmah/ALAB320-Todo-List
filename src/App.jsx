import React, { useState, useReducer } from 'react'
import Todo from './components/Todo'
import './app.css'


const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": true
  },
  
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": false
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  }
]
  export const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo'
}
function reducer (todos, action) {
  switch (action.type){
    case ACTIONS.ADD_TODO:
      return [...todos, 
        newTodo(action.payload.name)]

    // case ACTIONS.TOGGLE_TODO:
    //   return todos.map(todo =>{
    //     if(todo.id=== action.payload.id){
    //       return {...todo, complete: !todo.completed}
    //     }
    //     return todo
    //   })

      case ACTIONS.EDIT_TODO:
        return {
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, id: action.payload.id } : todo
          ),
        };


      case ACTIONS.DELETE_TODO:
   return todos.filter (todo=> todo.id!== action.payload.id)

        default :
        return todos
  }
  } 
    
  function newTodo(name){
    return {id:Date.now(), name:name, complete:false}
  }
export default function App() {
  const [todos, dispatch] =  useReducer(reducer, initialState)
const [name, setName]= useState('')
const[newTodo, setNewTodo] = useState('')
const [editingTodo, setEditingTodo] = useState('');


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
  const todoToEdit = state.todos.find(todo => todo.id === todoId);
  setNewTodo(todoToEdit.name);
  setEditingTodo(todoId);
};

    function handleSubmit (e){
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TODO, payload:{name:name}})
    setName('')  
  }


  return (
    <>
   <div className="display">To-do {todos.length}</div>
  <form onSubmit ={handleSubmit}>
<input 
type="text" 
placeholder="enter todo"
value={name} 
onChange={e=>setName(e.target.value)}/>
{/* <input type="text" value={name} onChange={e=>setName(e.target.value)}/> */}
  </form>
 
  {todos.map(todo => {
    return <ul><li key={todos.id}>
      <input 
      type="checkbox"
      value={newTodo}
      checked= {todo.completed}
      onChange={e=>setNewTodo(e.target)} 
      />
      {todo.title} 
      <Todo key={todo.id} ed={editTodo} todo ={todo} dispatch={dispatch} />
     
      </li></ul>
  })}
  
    </>
 
  )
  
}



// const initialState = [ 
//   {
//       "userId": 1,
//       "id": 1,
//       "title": "delectus aut autem",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 2,
//       "title": "quis ut nam facilis et officia qui",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 3,
//       "title": "fugiat veniam minus",
//       "completed": false
//     },
//     {
//       "userId": 1,
//       "id": 4,
//       "title": "et porro tempora",
//       "completed": true
//     }];

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       return [...state, action.payload];
//     case 'REMOVE_ITEM':
//       return state.filter(item => item !== action.payload);
//     default:
//       return state;
//   }
// };
// export default function App(){ 
// const [state, dispatch] = useReducer(reducer, initialState);

// const addItem = () => {
//   dispatch({ type: 'ADD_ITEM', payload: 4 });
// };

// const removeItem = () => {
//   dispatch({ type: 'REMOVE_ITEM', payload: 1 });
// }

// return (
//   <div>
//     <ul>
//       {state.map(item => (
//         <div>
//         <li key={item.id}>{item.id} {item.title}</li>
//        </div>
//       ))}
//     </ul>
//     <button onClick={addItem}>Add Item</button>
//     <button onClick={removeItem}>Remove Item</button>
//   </div>
// )}