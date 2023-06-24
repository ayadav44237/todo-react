import  React , {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { faCircleCheck,faPen,faTrashCan} from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  
   // Task State
   const[toDo,setToDo]=useState([]);
   //Task State
   const[title,setTitle]=useState('');
   const[description,setDescription]=useState('');
   const[updateData,setUpdateData]=useState('');

   //Add task
   const addTask=()=>{
        if(title) {
          let num=toDo.length + 1;
          let newEntry={ id: num, title: title, description: description, status:false }
          setToDo([...toDo,newEntry])
          setTitle('');
        }
   }

   //Delete Task
   const deleteTask=(id)=>{
    let newTasks=toDo.filter(task=>task.id!==id)
    setToDo(newTasks);
   }
   //Mark task as done or completed
   const markDone=(id)=>{
    let title = toDo.map( task=>{
      if(task.id === id){
      return ({...task, status: !task.status})
      }
      return task;
    })
    setToDo(title);
   }
    //Cancel update
   const CancelUpdate=()=>{
    setUpdateData('');
    
   }
   //change task for update
   const changeTask=(e)=>{
      let newEntry={
        id: updateData.id,
        [e.target.name]: e.target.value,
        
        status:updateData.status ? true: false
      }
      setUpdateData(newEntry);
   }
   //Update task
   
   const updateTask=()=>{
        let filterRecords=[...toDo].filter(task=>task.id !== updateData.id);
        let updatedObject=[...filterRecords, updateData]
        setToDo(updatedObject);
        setUpdateData('');
   }

  return (
    
    <div className="container App">
     <br /><br />
     <h2>To Do List(ReactJs)</h2>
     <br /><br />
     {/*Update Task*/}

     {updateData && updateData ? (
       <>

<div className="row">
      <div className="col">
        <input 
        value={updateData && updateData.title }
        onChange={(e)=> changeTask(e)}
        className="form-control form-control-ig"
        />
      </div>
      <div className="col-auto">
        <button 
          onClick={updateTask}
         className="btn btn-lg btn-success mr-20"
         >Update</button>
         <button
         onClick={CancelUpdate}
          className="btn btn-lg btn-warning"
          >Cancel</button>
      </div>
     </div>
     <br/>
       
       </>
     ):(
     
         <>
          {/*Add TAsk*/}
      <div className="row">
        <div className="col">
          <input 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="form-control form-control-ig"
          />
        </div>
        <div className="col-auto">
          <button
          onClick={addTask}
          className="btn btn-lg btn-success"
          >Add Task </button>
        </div>
      </div>
      <br />
          </>
   
     )
     }
     


     




     {/*Display Todos*/}
     {toDo && toDo.length ? '':'Currently No  Tasks...'}

      {toDo && toDo
      .sort((a,b)=>a.id > b.id ? 1:-1)
      .map( (task,index) => {
        return(
          <React.Fragment key={task.id}>

           <div className="Col taskBg">
             <div className={task.status ? 'done' : ''}>
                 <span className="taskNumber">{index + 1}</span>
                 <span className="taskText">{task.title}</span>
             </div>
             <div className="iconsWrap">
              <span title="Completed/ Not Completed"
              onClick={(e)=> markDone(task.id)}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {task.status ? null : (
                  <span title="Edit"
                  onClick={()=>setUpdateData({
                  id: task.id,
                  title: task.title,
                  status: task.status ? true : false
                }) }
                  >
                  <FontAwesomeIcon icon={faPen} />
                  </span>
              )}
            
              <span title="Delete" 
              onClick={()=>deleteTask(task.id)}

              >
              <FontAwesomeIcon icon={faTrashCan} />
              </span>
             </div>
           </div>
           
        </React.Fragment>
        )
      })
      }
    </div>
  )
}

export default App
