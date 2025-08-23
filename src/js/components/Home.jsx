import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const url = "https://playground.4geeks.com/todo/"

const createUser = () => {
	const options = {
		method: "POST",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"name": "Britney",
  			"id": 0
		})
	}
	fetch("https://playground.4geeks.com/todo/users/Britney", options)
	.then((r)=>r.json())
	.then((d)=> console.log("create-user-data", d))
};

const updatingToDo = () => {
	const options = {
		method: "PUT",
		headers: {"content-type":"application/json"},
		body: JSON.stringify({
			"label": "Walk The Dog",
  			"is_done": false
		})
	}
	fetch(url + "todos/25", options)
	.then((r) => r.json())
	.then((d) => console.log("updated To Dos:", d)) 
}

const deleteToDo = (id) => {
	const options = {
		method: "DELETE",
		headers: {"content-type":"application/json"},
	}
	fetch(url + "todos/" + id, options)
	.then((r)=>r.json())
	.then((d)=> console.log("deleted options:",d ))
}

const getAllUsers = () => {
	fetch(url + "users")
		.then(
			(resp) => {
				// console.log("getAllUsersResponse", resp.json()) cannot have 2 console logs
				return resp.json()
				
			}
		)
		.then(
			(data) => {console.log("get All Users Data:", data)}
		)
}


const addToDo = (Label) =>{
	let options = {
		method:"POST",
		headers:{"content-type":"application/json"},
		body: JSON.stringify({
			"label":Label,
			"is_done":false
		})
	}
		fetch(url + "todos/Britney", options)
		.then((resp)=>resp.json())
		.then((data)=>console.log("addToDoData", data))
}

//create your first component
const Home = () => {
	

	const [inputValue, setInputValue] = useState('');
	const [toDoList,setToDoList] = useState(["Clean Room", "Mop Kitchen", "Walk The Dog","Dust"]);
	const nextTask = ()=>{
		setToDoList([inputValue, ...toDoList])
		setInputValue("")
	}
	//                ^ function to save new tasks to list
	
	const getToDos = () => {
	fetch(url + "users/Britney")
	.then((resp)=>{return resp.json()})
	.then((data)=>{setToDoList(data.todos)
		console.log("data tag", data)
	})
	
}

	useEffect(
		() => {
			createUser()
			getToDos()
		// getAllUsers()
		// addToDo() keeps adding new tasks onload
		}, []
	)
	
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
				nextTask(toDoList);
				addToDo(inputValue)
			}					
				} 
			}
			 />

		 
		<button onClick={()=> nextTask()}>
			Add task
		</button>
		<button onClick={()=> addToDo()}>
			Add to API
		</button>
		<button onClick={()=> updatingToDo()}>
			Update
		</button>
		<button onClick={()=> deleteToDo()}>
			Delete
		</button>

		 <ul>
			{/* <li>Take out the trash</li> */}
			{toDoList.map(
				(item, index)=> {
					console.log("map item", item.id)
					return(
						<div>
							<li key = {index + "chore"}>{item.label}</li>
							<span class="text-danger" onClick={() => {
								deleteInputValue(item.id)
		 					}}>
									x
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