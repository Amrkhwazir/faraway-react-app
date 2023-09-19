import './App.css';
import { useState } from 'react';

function App() {
  const [txtValue, setTxtValue] = useState('');
  const [items, setItems] = useState([]);
  const [itemQty, setItemQty] = useState(1)
 




  return (
    <>
    <Logo />
    <Form value={setTxtValue} text={txtValue} items={setItems} itemVal={items} qtyVal={setItemQty} itemQty={itemQty} />
    <PackingList selectedItems={items} />

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
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", textTransform: "capitalize", minHeight:"60px", backgroundColor: "beige", gap:"5px", flexWrap: "wrap", padding: "10px 0px"}}
    >
      <p>what do you need for your <img src='' /> trip?</p>
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
        items([{name: text, qty: itemQty}, ...itemVal])
        value("")
        qtyVal(1)
      }}  >add</button>

    </div>  
  )
}

function PackingList({selectedItems}){

  return(
<>
{
  selectedItems.map((value, indx)=>{
   return  <div key={indx} style={{display:"flex", justifyContent:"center", gap:"10px", padding:"10px 0px"}}><p>{value.qty}</p> <p>{value.name}</p></div>
  })
}
</>
  )
}

export default App;
