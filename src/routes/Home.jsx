import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useContext, useState,useEffect } from 'react'
import UserContext from '../context/UseContext'
import { db } from '../firebase/firebaseConfig'

const Home = () => {

    const [task, setTask] = useState()
    const [taskData, setTaskData] = useState([])
    const {user} = useContext(UserContext)

    console.log(user)
    const collectionTodo = collection(db, "todo")
    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const addTask = () => {
        setTaskData(prevData => [...prevData, task])
        const uid = localStorage.getItem("users")
        addDoc(collectionTodo, {task, uid}).then(res => console.log(res)).catch(err => console.log(err))
    }

    const deleteTask = async (id) => {
        console.log(id)
        try {
            await deleteDoc(doc(db, "todo", id));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        const uid = localStorage.getItem("users")
    //     async function fetchData() {

    //     const q = query(collectionTodo, where("uid", "==", uid))
    //     const data = await getDocs(q)
    //     const listData = []
    //     data.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         listData.push({id: doc.id, ...doc.data()})
    //       });
    //       setTaskData(listData)
    //   }
    //   fetchData();
    const q = query(collectionTodo, where("uid", "==", uid))
      const unsub = onSnapshot(q, (snapshot) => {
        const listData = []
        snapshot.docs.forEach((doc) => {
            console.log("f",doc.id, " => ", doc.data());
            listData.push({id: doc.id, ...doc.data()})
          });
          setTaskData(listData)
        });

        // return () => {
        //     unsub()
        // }
     
    }, [])
    
    console.log(taskData)

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
                <span>{data.task}</span>
                <div>

                <button>Edit</button>
                <button onClick={() => deleteTask(data.id)}>Delete</button>
                </div>
            </div>
            )
        })}
        </div>
    </div>
  )
}

export default Home