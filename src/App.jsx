import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
function App() {

const API_URL = 'http://localhost:3500/items'



const [items, setItems] = useState([])

const [newItem,setNewItem]= useState('')

const [search,setSearch]=useState('')

const [fetchErr,setFetchErr] =useState(null)

const [isLoading,setIsLoading]=useState(true)



/* this re-render the list only on load time */
useEffect (()=>{
  //read items
  const fetchItems = async()=>{
    try{
        const response = await fetch (API_URL)

        if(!response.ok) throw Error('no data received')
        const listItems = await response.json()
        setItems(listItems)
        setFetchErr(null)
    }catch(err){
        setFetchErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  setTimeout(()=>{ 
    fetchItems()
  },2000)
  

},[])
//crud :read,create,updtae,delete

/* useEffect (()=>{
console.log('updaeting the items state')}
,[items]) */ 
//it looks at the dependecy , each time uit changers , useEffect 
//executes the anonymous fct

const addItem = async (item)=>{
  const id =  items.length ?  items[items.length-1].id+1 : 1
  const theNewItem ={id,checked:false,item}
  const ListItems = [...items,theNewItem]
  setItems(ListItems)

  const postOptions ={
    method:'POST',

    headers:{
        'Content-Type':'application/json'
    },

    body:JSON.stringify(theNewItem)
  }

  const result = await apiRequest(API_URL,postOptions)

  if(result) setFetchErr(result)
}

const handleSubmit = (e)=>{
  e.preventDefault()
  if (!newItem) return;
  //add item
  addItem(newItem)
  setNewItem('')
}

const handleCheck = async (id) => {
  const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
  setItems(listItems);
  const myItem = listItems.filter(item=>item.id===id)
  const updateOptions = {
    method :'PATCH',
    headers: {
    'Content-Type':'application/json'
    },
    body :JSON.stringify({checked:myItem[0].checked})
  }
  const reqURL = `${API_URL}/${id}`
  const result = await apiRequest(reqURL,updateOptions)
  if (!result) setFetchErr(result)
}

const handleDelete =async (id) => {
  const listItems = items.filter((item) => item.id !== id);
  setItems(listItems);
  const deleteOptions = {method:'DELETE'}
  const reqURL = `${API_URL}/${id} `
  const result = await apiRequest(reqURL,deleteOptions)
  if (!result) setFetchErr(result)
}

  return (
    <div className="App">
      <Header />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
       />
       <main>
       {isLoading && <p>Loadin items ...</p>}
       {fetchErr && <p style={{color:"red"}}>{`error: ${fetchErr}`}
       </p>}
       {!fetchErr && !isLoading &&
        <Content 
          items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
          setItem={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
        </main>
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;