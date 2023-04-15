import React from "react";

const Tasks = ({ label , index , deleteTask }) => {

        return(
            <>
                <>
                    <span className="delete-icon" onClick={()=> deleteTask(index)}>X</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{label}</span>
                </>
            </>
        )

}

export default Tasks;