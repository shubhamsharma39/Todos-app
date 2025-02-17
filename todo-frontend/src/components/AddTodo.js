import React , {useState} from 'react'

const AddTodo = ()=>{
    const [todo, setTodo] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(todo)
        try{
            const response = await fetch(`http://localhost:3002/add-todo`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({todo})

            })

             console.log("Response received")

        }catch(err){
            console.log("Error occured while adding todo",err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
                placeholder='Add a new Todo'
                required
            />

            <button type="submit">Add Todo</button>
        </form>
    )
}

export default AddTodo