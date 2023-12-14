import React from 'react'
import { ACTIONS } from '../App'

export default function Todo({ todo, editTodo, dispatch }) {
    return (
        <div>
            <span style={{ color: todo.complete ? 'red' : '#000' }}>{todo.name}</span>
            <button onClick={editTodo}>EDIT</button>
            <button disabled={todo.completed} onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}>Delete</button>


        </div>
    )
}
