import React, { useState } from "react";

const Input = ({ addTask }) => {
  const [newInput, setNewInput] = useState("");

  const taskObject = {
    label: "",
    done: false,
  };

  return (
    <>
      <input
        value={newInput}
        onChange={(event) => setNewInput(event.target.value)}
        onKeyUp={async (event) => {
          if (event.key === "Enter") {
            taskObject.label = newInput;
            await addTask(taskObject);
            setNewInput("");
          }
        }}
        className="input"
        placeholder="Enter new Task"
      />
      <button 
      className="btn btn-danger ms-3"
      onClick={ async ()=>{
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/NVR-2023" , {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        })
        location.reload();
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Input;
