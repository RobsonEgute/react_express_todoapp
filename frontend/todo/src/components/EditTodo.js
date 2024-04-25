import React, { useState } from 'react';

const EditTodo = ({todo}) => {
    const [edtDes, setEdtDes] = useState(todo.description)
    const styles = {
        input: {
            width: "100%"
        }
    }
    const EditDescription = async (e) => {
        e.preventDefault();
        try {
            const data = {description: edtDes};
            const editTodo = await fetch(`http://localhost:5000/todos/${todo.id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(editTodo);
        window.location = "/"
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <>
            
<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id_${todo.id}`}>
  Edit
</button>


<div class="modal fade" id={`id_${todo.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={() => setEdtDes(todo.description)}>
  <div class="modal-dialog">
    <div class="modal-content">
    {/* Modal header */}
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Change your Todo</h1>
        <button onClick={() => setEdtDes(todo.description)} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
      </div>
      {/* Modal body */}
      <div class="modal-body">
        <input value={edtDes} className='form-control' style={styles.input} onChange={ e => setEdtDes(e.target.value)} />
      </div>
      {/* modal footer */}
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEdtDes(todo.description)}>Close</button>
        <button type="button" class="btn btn-primary" onClick={e => EditDescription(e)}>Save changes</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default EditTodo;