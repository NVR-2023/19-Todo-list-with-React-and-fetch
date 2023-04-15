// Imports
import React, { useState, useEffect } from "react";
import Input from "./input.jsx";
import Tasks from "./tasks.jsx";

// Home component
const Home = () => {
  const [tasks, setTasks] = useState([]);

  // Initialization auxiliary functions
  const createUser = async () => {
    await fetch("https://assets.breatheco.de/apis/fake/todos/user/NVR-2023", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    });
  };

  const getTasks = async () => {
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/NVR-2023", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      Params: null,
    });
    return response;
  };

  // Creates user if user doesn't already exist and fetches tasks
  const initializeTasks = async () => {
    try {
      let response = await getTasks();
      if (response.status === 404) {
        await createUser();
        response = await getTasks();
      }
      let data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(`Download unsucessful ${error}`);
    }
  };

  // Initializes only onload
  useEffect(() => {
    initializeTasks();
  }, []);

  // Task management functions

  const addTask = async (taskObject) => {
    const temporaryList = [...tasks, taskObject];
    await uploadTasks(temporaryList);
    setTasks(temporaryList);
  };

  const deleteTask = async (index) => {
    let temporaryList = [...tasks];
    temporaryList.splice(index, 1);
    await uploadTasks(temporaryList);
    setTasks(temporaryList);
  };

  const uploadTasks = async (list) => {
    try {
      await fetch("https://assets.breatheco.de/apis/fake/todos/user/NVR-2023", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list),
      });
    } catch (error) {
      console.log(`Upload unsessful ${error}`);
    }
  };

  return (
    <div className="components-container">
      <div>
        <Input addTask={addTask} />
      </div>
      <div className="list-container">
        <ul className="list">
          {tasks &&
            tasks.map((element, index) => {
              if (!index) return null;
              else
                return (
                  <li key={index}>
                    <Tasks label={element.label} index={index} deleteTask={deleteTask} />{" "}
                  </li>
                );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
