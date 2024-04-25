import React, {useState} from 'react';

const AddTodo = () => {

    const [description, setDescription] = useState('');
    const styles = {
        input: {
            'width': '70%',
            'margin': 'auto'
        },
        button: {
            'width': '80px'
        }
    }
    const handleClick = async (e) => {
        //e.preventDefault();
        const data = {
            "description": description
        }
        try {
            console.log(data)
       await fetch('http://localhost:5000/new_todo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            alert('new todo added')
            window.location = "/";
            console.log(data);
        })
    }catch(err) {
        console.log(err);
    }
    }
    return (
        <>
    
            <input style={styles.input} onChange={(e) => {setDescription(e.target.value); console.log(description)} } htmlFor='description' placeholder='describe your task here' />
            <button onClick={handleClick} style={styles.button}>Add Task</button>

        </>

    )
}

export default AddTodo