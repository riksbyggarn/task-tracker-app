import { useState } from 'react'

type Task = {
  id: number
  taskName: string
  isCompleted: boolean
}

const TodoList = () => {
  const [newTask, setNewTask] = useState('')
  const [todoList, setTodoList] = useState<Task[]>([
    { id: 1, taskName: 'Clean Garage', isCompleted: false },
    { id: 2, taskName: 'Order Pizza', isCompleted: false },
    { id: 3, taskName: 'Read a Book', isCompleted: false }
  ])

  const addTask = () => {
    const lastId = todoList[todoList.length - 1].id
    setTodoList((prev) => [
      ...prev,
      { id: lastId + 1, taskName: newTask, isCompleted: false }
    ])
    setNewTask('')
  }

  const deleteTask = (id: number) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id))
  }

  const completeTask = (id: number) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    )
  }

  return (
    <div>
      <h2>TodoList</h2>
      <input
        type='text'
        placeholder='New task...'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask} disabled={!newTask.trim()}>
        Add Task
      </button>
      <ul>
        {todoList.map((task) => (
          <li key={task.id}>
            {task.taskName}
            <p>Task Completed: {task.isCompleted ? 'Yes' : 'No'}</p>
            <button onClick={() => completeTask(task.id)}>Complete Task</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList
