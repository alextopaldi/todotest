import { ITodo } from "../models/todo"
import { Button, Checkbox } from "@material-tailwind/react"
import {faChevronDown, faXmark, faChevronUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface TodoItemProps {
    todoItem: ITodo
    onDeleteTodo : (id : number) => void
    onToggle : (id: number) => void
}


export function TodoItem({todoItem, onDeleteTodo, onToggle} : TodoItemProps) {

    const [descriptionVision, setDescriptionVision] = useState(false)

    const iconDescription = descriptionVision? faChevronUp : faChevronDown

    function onClickToggle() {
        onToggle(todoItem.id)
    }

    function ShowDescription (){
        if (todoItem.description) {
            setDescriptionVision(prev => !prev)
        }
        else return
    }

    const todoClass = todoItem.completed? 'opacity-60' : 'opacity-100'
    const nameClass = todoItem.completed? ' line-through' : ''
    const todoClasses = ['todo bg-white py-2 px-4 rounded-sm shadow-md border', todoClass]
    const nameClasses = [nameClass]
    
    return (
        <div className={todoClasses.join(' ')}>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Checkbox id={todoItem.id.toString()} className="qwer hover:" color="green" onClick={ onClickToggle} checked={todoItem.completed} readOnly/>
                    <p className={nameClasses.join(' ')}>{todoItem.name[0].toUpperCase()+todoItem.name.substring(1)}</p>
                </div>
                <div className="flex items-center">
                    <button className="">
                        <FontAwesomeIcon onClick={ShowDescription} className="h-[20px] text-blue-500" icon={iconDescription}/>
                    </button>
                    <button className="flex items-center ml-4">
                        <FontAwesomeIcon className="h-[20px] text-red-400" icon={faXmark} onClick={() => onDeleteTodo(todoItem.id)}/>
                    </button>
                </div>
            </div>
            {descriptionVision && 
            <div>
                <textarea value={todoItem.description[0].toUpperCase()+todoItem.description.substring(1)} readOnly className="outline-none w-[100%] h-8 bg-transparent"></textarea>
            </div>}
        </div>
    )
}