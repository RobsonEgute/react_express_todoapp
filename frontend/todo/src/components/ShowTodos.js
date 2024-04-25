import React, {useEffect, useState} from "react";
import EditTodo from "./EditTodo";


const ShowTodos = () => {
    
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const res = await fetch('http://localhost:5000/todos');
            const jsonRes = await res.json();
            setTodos(jsonRes);
        } catch(err) {
            console.error(err)
        }
    };

    useEffect(() =>{ getTodos()}, []);

    // handle delete func
    const handleDelete = async (id) => {
        try {
        const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
        })
        console.log(deleteTodo);
        setTodos(todos.filter(todo => todo.id !== id));
        } catch(err) {
            console.log(err)
        }
    }

    const styles = {
        table: {
            width: '95%', 
            marginLeft: '80px'
        }
    }

    // handle edit  func
    //const handleEdit = async (id) => {
        

           // Another option
        // const description = prompt("update your task");
        // const data = {description: description};

        // if(description) {
        //     const editTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        //     method: "PUT",
        //     headers: { 
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // })
        // console.log(editTodo)
        // } else {
        //     alert("no input provided")
        // }
    //} 

    
console.log(todos);
    return (
        <>
            <h3 className="text-center">List Todos</h3>
            <table style={styles.table} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => {
                          return (<tr key={todo.id}>
                                    <td >{todo.description}</td>
                                    <td> <EditTodo todo={todo} /> </td> 
                                    <td><button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button></td>
                            </tr>)
                        })}
                </tbody>
            </table>
        </>
    )
}

export default ShowTodos;