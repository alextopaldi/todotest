import { useState } from "react"
import { ITodo } from "../models/todo"

interface TodoModalProps {
    onSubmit: (todo: ITodo) => void
}

export function TodoModal ({onSubmit} : TodoModalProps) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')


    function SubmitHandler(event: React.FormEvent) {
        event.preventDefault()
        if (name.trim() == '') {
            setError('Enter valid value!')
            return
        }
        const item : ITodo = {
            id: Date.now(),
            name: name,
            description: description,
            completed: false
        }
        onSubmit(item)
        setError('')
    }
    return (
        <div className="fixed bg-black/50 top-0 bottom-0 right-0 left-0">
            <div className="modal p-5 absolute -translate-x-1/2 left-1/2 top-[200px]">
            <form onSubmit={SubmitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter a name
                </label>
                <input onChange={event => setName(event.target.value)} onClick={() => setError('')} value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name"/>
                {error && <p className="text-center text-red-500 mt-5 absolute right-[185px] top-[80px] font-bold">{error}</p>}
                <label className="block text-gray-700 text-sm font-bold mb-2 pt-5">
                Enter a description
                </label>
                <textarea onChange={event => setDescription(event.target.value)} value={description} className="shadow appearance-none border rounded w-full pt-2 pb-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description"/>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 block m-auto">
                    Add ToDo
                </button>
            </form>
            </div>
        </div>
    )
}