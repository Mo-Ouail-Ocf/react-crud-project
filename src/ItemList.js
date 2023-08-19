import LineItem from "./LineItem"
const ItemList = ({items,handleDelete,handleCheck}) => {
  return (
    <ul>
        {items.map((item) => (
            <LineItem 
                item={item}
                key={item.id}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
            />
        ))}
    </ul>

  )
}

export default ItemList