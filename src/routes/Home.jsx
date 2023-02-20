import React, { useState } from 'react'

const Home = () => {

    const [task, setTask] = useState()
    const [taskData, setTaskData] = useState([])

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    console.log(task)
    const addTask = () => {
        setTaskData(prevData => [...prevData, task])
    }

  return (
    <div  className='container'>
        <div className='todo-container'>

        <div className='todo'>
            <input type="text"  placeholder='Enter Task' name="task" value={task} onChange={handleChange}/>
            <button onClick={addTask}>Add</button>
        </div>
        {taskData.map((data, index) => {
            return (
            <div className='list' key={index}>
                <span>{data}</span>
                <div>

                <button>Edit</button>
                <button>Delete</button>
                </div>
            </div>
            )
        })}
        </div>
    </div>
  )
}

export default Home