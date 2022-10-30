import {faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface AddTodoButtonProps {
    onOpen: () => void,
    bounce : boolean
}

export function AddTodoButton({onOpen, bounce} : AddTodoButtonProps) {

    const btnClass = bounce? '' : 'animate-bounce'
    const btnClasses = ['fixed bottom-0 right-0 m-10', btnClass ]
    
    return(
        <div className={btnClasses.join(' ')}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-xl flex justify-center items-center"  onClick={onOpen}>
                <FontAwesomeIcon className="h-[20px] text-white" icon={faPlus}/>
            </button>
        </div>
    )
}