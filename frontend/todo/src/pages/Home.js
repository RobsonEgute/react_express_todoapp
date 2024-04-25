import React from 'react';
import AddTodo from '../components/AddTodo';
import ShowTodos from '../components/ShowTodos';

const Home = () => {

    const styles = {
        showTodo: {
            width: '100%'
        }
    }

    return (
        <>
            <h1 className='text-center'>TODO APP</h1>
            <center>
            <AddTodo />
            <ShowTodos style={styles.showTodo} />
            </center>
        </>
    )
}

export default Home;