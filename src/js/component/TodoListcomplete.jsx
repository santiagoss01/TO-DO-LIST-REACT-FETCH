import React, { useEffect, useState } from "react";

const NewList = () => {
   

      const [myList, setMylist] = useState([]);
    
 
 
 
      const getList = async ()=>{

    
        await fetch("https://assets.breatheco.de/apis/fake/todos/user/santiagoss", {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setMylist(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    useEffect (()=>{   
        getList()
   }, []); 

   
   
   const putList = async ()=>{

    
    await fetch("https://assets.breatheco.de/apis/fake/todos/user/santiagoss", {
      method: "PUT",
      body: JSON.stringify(myList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("error", error));
  };

    console.log(myList);

    const [myinput, setMyinput] = useState("");

    useEffect (()=>{   
        putList();
   }, [myList]); 


  

    const submitHandler = (e) => {
       
        e.preventDefault();
        setMyinput("");
        setMylist([{label: myinput, done: false}, ...myList]);
       

    };

    const controlledInput = (e) => {
        setMyinput(e.target.value);
    };

    const removeFromlist = (index) => {
        setMylist(myList.filter((element, id) => {
            return index !== id;
        }))
    };
  
     
    const[completedTodo, setCompletedtodo] = useState([]);

    const taskCompleted = (index) => {
        setCompletedtodo([...completedTodo, index]);
    }

    const[imporTanttodo, setimporTanttodo] = useState([]);

    const importantTask = (index) => {
        setimporTanttodo([...imporTanttodo, index]);
    }




    return (
        <div>
            <h1>Task Manager</h1><h1 id="task-two">Task Manager</h1>
            <form className="form-group-toDo" onSubmit={submitHandler}>
                <input type="text" onChange={controlledInput} value={myinput} className="form text-center" placeholder="ADD YOUR NEW TASK" />
            </form>

            <div className=" container d-flex justify-content-center">
                <ul className="list-group">
                    {myList.map((listElement, index) => {
                        return <li key={index} className= {`list-group-item d-flex  justify-content-between hidden-icon myStyledlist ${completedTodo.includes(index)? " red":""} ${imporTanttodo.includes(index)? " important":""}`} >
                            {listElement.label}
                            <span className="d-flex justify-content-around">
                                
                                <a id="trash"   onClick={(e) => { removeFromlist(index) }}>
                                    <i className={"fas fa-trash selected "}></i>
                                </a>
                                <a id="select"  onClick={(e) =>{taskCompleted(index)}}>
                                    <i className={"fas fa-check selected "}></i>
                                </a>
                            
                                <a id="check"  onClick={(e) =>{importantTask(index)}}>
                                    <i className={"fas fa-exclamation selected "}></i>
                                </a>
                                
                                
                            </span>
                        </li>
                    })
                    }

                </ul>
                {myList.length ? "" : <span id="warning"> Add a new task!</span>}
            </div>
        </div>
       

    );

};


export default NewList;
