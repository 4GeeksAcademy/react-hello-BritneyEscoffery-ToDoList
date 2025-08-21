import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const url = "https://playground.4geeks.com/todo/"

const createUser = () => {
	const options = {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"name": "britney-escoffery",
  			"id": 0
		})
	}
	fetch("https://playground.4geeks.com/todo/users/britney-escoffery", options)
	.then((r)=>r.json())
	.then((d)=> console.log("create-user-data", d))
}

const getAllUsers = () => {
	fetch(url + "users")
		.then(
			(resp) => {
				return resp.json()
				
			}
		)
		.then(
			(data) => {console.log("dataUsers:", data)}
		)
}


const getToDos = () => {
	fetch(url + "users/britney-escoffery")
	.then((resp)=>{return resp.json()})
	.then((data)=>{console.log("toDoData", data )})
}

const addToDo = () =>{
	let options = {
		method:"POST",
		headers:{"content-type":"application/json"},
		body: JSON.stringify({
			"label":"Wash the Car",
			"is_done":false
		})
	}
		fetch(url + "todos/britney-escoffery", options)
		.then((resp)=>resp.json())
		.then((data)=>console.log("addToDoData", data))
}

//create your first component
const Home = () => {
	useEffect(
		() => {
		addToDo()
		getToDos()
		createUser()
		}, []
	)

	const [inputValue, setInputValue] = useState('');
	const [toDoList,setToDoList] = useState(["Clean Room", "Mop Kitchen", "Walk The Dog","Dust"]);
	const nextTask = ()=>{
		setToDoList([inputValue, ...toDoList])
		setInputValue("")
	}
	//                ^ function to save new tasks to list
	
	
	
	const deleteInputValue = (item) => {

		const filteredInputValues = toDoList.filter(
			(inputData) => inputData != item
	)
	console.log("Walk The Dog:",filteredInputValues)
		setToDoList(filteredInputValues)
	}
	return (
		<div className="todo-container text-center">
			<h1>To Do List</h1>
         <input value={inputValue}
		 	className="" 
			type="text" 
			placeholder="Add a new task" 
			onChange={ (e) => {
					const newTask = e.target.value
					setInputValue(newTask)
			}

			}
				
		 	onKeyDown = {
				(e) => {
			if (e.key == 'Enter') {
				nextTask();
			}					
				} 
			}
			 />

		 
		<button onClick={()=> nextTask()}>
			Add task
		</button>

		 <ul>
			{/* <li>Take out the trash</li> */}
			{toDoList.map(
				(item, index)=> {
					return(
						<div>
							<li key = {index + "chore"}>{item}</li>
							<span class="text-danger" onClick={() => {
								deleteInputValue(item)
		 					}}>
									X
							 </span>
						</div>
				)	
			 }
			)}
		 </ul>

		</div>
	);
};

export default Home;