import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todo"));
  const [todo, settodo] = useState(initialTodos || []);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = () => {
    if (task.title) {
      let num = todo.length + 1;
      let newEntry = {
        id: num,
        status: false,
        ...task,
      };

      const newTodo = [newEntry, ...todo];
      localStorage.setItem("todo", JSON.stringify(newTodo));
      settodo(newTodo);
      setTask({
        title: "",
        description: "",
      });
    }
  };

  const markDone = (id) => {
    // fetch the task to mark done
    const task = todo.find((task) => task.id === id);
    // already completed task then return
    if (task.status) return;
    task.status = true;

    const filteredTodo = todo.filter((task) => task.id !== id);

    const firstCompletedTaskIndex = filteredTodo.findIndex((task) => task.status);
    // now add this task at this index in newTodo
    if(firstCompletedTaskIndex === -1) {
      const newTodo = [...filteredTodo, task];
      localStorage.setItem("todo", JSON.stringify(newTodo));
      settodo(newTodo);
      return;
    }

    const newTodo = [
      ...filteredTodo.slice(0, firstCompletedTaskIndex),
      task,
      ...filteredTodo.slice(firstCompletedTaskIndex),
    ];

    // delete this task and add the task in the end of the array
    localStorage.setItem("todo", JSON.stringify(newTodo));
    settodo(newTodo);
  };

  const deleteTask = (id) => {
    const newTodo = [...todo.filter((task) => task.id !== id)];
    localStorage.setItem("todo", JSON.stringify(newTodo));
    settodo(newTodo);
  };

  const onChangeTask = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const editTask = (task) => {
    setEditTaskId(task.id);
    setTask({
      title: task.title,
      description: task.description,
    });
  };

  const cancelEditTask = () => {
    setEditTaskId(null);
    setTask({
      title: "",
      description: "",
    });
  };

  const saveEditTask = () => {
    const taskIndex = todo.findIndex((task) => task.id === editTaskId);
    const newTodo = [...todo];
    newTodo[taskIndex] = {
      ...newTodo[taskIndex],
      ...task,
    };
    localStorage.setItem("todo", JSON.stringify(newTodo));
    settodo(newTodo);
    setTask({
      title: "",
      description: "",
    });
    setEditTaskId(null);
  };

  return (
    <div className="todoApp">
      <h2 className="appTitle">Todo App</h2>

      <div className="createTaskForm">
        <div className="taskDetailsInput">
          <input
            value={task.title}
            onChange={onChangeTask}
            name="title"
            className="input"
            placeholder="Add Title"
          />
          <input
            value={task.description}
            onChange={onChangeTask}
            name="description"
            className="input"
            placeholder="Add Description"
          />
        </div>
        {!editTaskId && (
          <button onClick={addTask} className="button primary" type="button">
            Add Task{" "}
          </button>
        )}

        {editTaskId && (
          <div className="buttons">
            <button
              onClick={saveEditTask}
              className="button primary"
              type="button"
            >
              Save
            </button>
            <button
              onClick={cancelEditTask}
              className="button secondary"
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="tasks">
        {todo.map((task) => {
          return (
            <div
              key={task.id}
              className={`task ${task.status ? "done" : "active"}`}
            >
              <div className={`taskInfo`} onClick={() => markDone(task.id)}>
                <span className="taskNumber">{task.id}</span>
                <div className="taskDetails">
                  <h1 className="taskTitle">{task.title}</h1>
                  <p className="taskDescription">{task.description}</p>
                </div>
              </div>
              <div className="icons">
                {!task.status && (
                  <>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      onClick={() => markDone(task.id)}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => editTask(task)}
                    />
                  </>
                )}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
