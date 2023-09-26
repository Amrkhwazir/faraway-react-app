import './App.css';
import { useEffect, useState } from 'react';
import { FaXmark } from "react-icons/fa6";


function App() {
  const [txtValue, setTxtValue] = useState('');
  const [items, setItems] = useState([]);
  const [itemQty, setItemQty] = useState(1)
  const [itemsPacked, setItemsPacked] = useState([])
  
  useEffect(() => {
    if (items.length > 0) {
      const packed = items.filter((item) => item.isPacked)
      setItemsPacked(packed)
    } else {
      setItemsPacked([])
    }
  }, [items])
 


  return (
    <>
    <Logo />
    <Form value={setTxtValue} text={txtValue} items={setItems} itemVal={items} qtyVal={setItemQty} itemQty={itemQty} />
    <PackingList selectedItems={items} setTodoList={setItems} itemPack={itemsPacked} />

    </>
  );
}

function Logo(){
  return(
    <div className='header' style={{backgroundColor: "whitesmoke",color:"chocolate",textTransform: "uppercase",height: "80px", display: "flex", justifyContent:"center",alignItems:"center", border:"4px solid grey", fontSize:"24px", }}>
      <h1>
        far away
      </h1>
    </div>
  )
}


function Form({value, text, items, itemQty, qtyVal, itemVal}){
  return(
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", textTransform: "capitalize", minHeight:"60px", backgroundColor: "rgb(232, 232, 141)", gap:"5px", flexWrap: "wrap", padding: "10px 0px"}}
    >
      <p>what do you need for your 😍 trip?</p>
{/* dropdown */}
    <select style={{width: "40px", padding: "1px"}} value={itemQty} onChange={(e)=> qtyVal(parseInt(e.target.value))}>
    {Array.from(Array(20).keys()).map((x) => (
            <option key={x} value={x + 1}>{x + 1}</option>
          ))}
  </select>
{/* input */}
      <input type='text' onChange={(e)=> value(e.target.value) } value={text} />

{/* button */}
      <button style={{textTransform: "uppercase", width: "60px", backgroundColor: "skyblue", border: "2px solid skyblue", borderRadius: "10px", color: "white", fontWeight: "600", cursor: "pointer"}} onClick={() => {
        items([{name: text, qty: itemQty, isPacked: false}, ...itemVal])
        value("")
        qtyVal(1)
      }}  >add</button>

    </div>  
  )
}

// pakingList Componenet
function PackingList({selectedItems, setTodoList, itemPack}){
// console.log(selectedItems)
  
  function packItemHAndler(index){
    // console.log(index)
    const updatedList = [...selectedItems];
    updatedList[index].isPacked = !updatedList[index].isPacked;
    setTodoList(updatedList);
  }

function CancelItemHandler(index){
const updateList = [...selectedItems]
updateList.splice(index,1);
setTodoList(updateList);
}

  return(

    // items adding updating deleting
<div className='itemsBox'  style={{display:"flex", justifyContent:"center", gap:"20px", minHeight:"360px", width:"100%", backgroundColor:"wheat", padding:"20px 0px", textTransform:"capitalize", flexWrap:"wrap"}}>
{
  selectedItems.map((value, indx)=>{
   return  <span key={indx} style={{height:"50px"}}><input type='checkbox' style={{marginTop:"6px", cursor: "pointer",}} onChange={()=> packItemHAndler(indx)} checked={value.isPacked}/>
   <span style={{textDecoration: value.isPacked ? "line-through" : "none"}}>{value.qty} {value.name}</span>
   <button style={{background: "white", border: "none", color: "red", fontSize:"14px",height:"20px", margin:"10px", padding:"3px", borderRadius:"50%", cursor:"pointer"}} 
   onClick={()=> CancelItemHandler(indx)}> <FaXmark className="crossIcon" /> </button> 
   </span>

  })
}
<>
< SortList todoItem={selectedItems} />
< ClearList todoItem={selectedItems} todosArr={setTodoList} />

<div className="footerBottom" style={{position:"absolute", bottom:"0px", backgroundColor:"royalblue", width:"100%", textAlign:"center", color:"white", fontWeight:"500"}}>
<p>You have {selectedItems.length} items on your list, and you already Packed {itemPack.length} {`(${(itemPack.length / selectedItems.length) * 100}%)` || `0%`}</p>
        
 </div>

</>
</div>

  )
}

function ClearList({todoItem, todosArr}){

  function ClearAllItemsHandler(){
    const updateList = [...todoItem]
updateList.splice(0);
todosArr(updateList);    
  }
  return(
    <button className='clearBtn' style={{height:"30px", marginTop:"280px", borderRadius: "15px", border: '1px solid grey', width:"120px", cursor:"pointer", position:"absolute", marginLeft:"150px"}} onClick={ClearAllItemsHandler}>
      Clear List Items
    </button>
  )
}
function SortList({todoItem}){

  function sortHandler(e){
 
   
  }

  return(
    <select className='sort' style={{height:"30px", marginTop:"280px", borderRadius: "15px", border: '1px solid grey', width:"150px", textAlign:"center", cursor:"pointer",position:"absolute", marginRight:"150px"}} onChange={sortHandler} >
      
       <option value="Sort by Input Order">Sort by Input Order</option>
          <option value="Sort by Description">Sort by Description</option>
          <option value="Sort by Packed Status">Sort by Packed Status</option>
    </select>
  )
}

export default App;
