import {FaPlus} from 'react-icons/fa'
import { useRef } from 'react'


const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef = useRef()

  return (
   <form className="addForm"
   onSubmit={handleSubmit} //it will pass the event
   >
    <label htmlFor="addItem">Add Item</label>
    <input type="text"
        autoFocus
        ref={inputRef}
        id="addItem"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e)=>setNewItem(e.target.value)}
     />
     <button typeof="submit"
        aria-label="add item"
        onClick={()=>inputRef.current.focus()} >
        <FaPlus/>
     </button>
   </form>
  )
}

export default AddItem