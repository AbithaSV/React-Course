//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
function FilterableProducTable({products}){
  const [searchText, setSearchText]=useState('');
  const [inStockOnly, setInStockOnly]=useState(false);
  return(
    <>
    <SearchBar searchText={searchText} inStockOnly={inStockOnly} onSearchTextChange={setSearchText} onInStockOnlyChange={setInStockOnly}/>
    <ProductTable products={PRODUCTS} searchText={searchText} inStockOnly={inStockOnly} />
    </>
  );

}

//Search Bar...
  function SearchBar({searchText,inStockOnly,onSearchTextChange,onInStockOnlyChange}){
    return(
      <>
      <form>
        <input type="text" value={searchText} onChange={(e) => onSearchTextChange(e.target.value)}/><br/>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}/><lable>Only Show Products in Stock</lable>
      </form>
      </>
    );
  }
  //Product Table
  function ProductTable({products,searchText,inStockOnly}){
    const row=[];
    let lastCategory=null;
    products.forEach(products => {
      if (
        products.name.toLowerCase().indexOf(
          searchText.toLowerCase()
        ) === -1
      ) {
        return;
      }
      if (inStockOnly && !products.stocked) {
        return;
      }
      if(products.category !== lastCategory){
        row.push(
          <ProductCategoryRow category={products.category} key={products.category} />
        );
      }
      row.push(
        <ProductRow products={products} key={products.name} />
      );
      lastCategory=products.category;
    });
    return(
      <>
      <table><theda><tr><th>Name</th><th>Price</th></tr></theda>
      <tbody>{row}</tbody></table>
      </>
    );
   }
   //Product Category
      function ProductCategoryRow({category}){
        return(
          <>
          <tr><th colSpan="2">{category}</th></tr>
          </>
        );
//Products
      }
      function ProductRow({products}){
        const name=products.stocked ? products.name:<span style={{color:'red'}}>{products.name}</span>;
        return(
          <>
          <tr><td>{name}</td><td>{products.price}</td></tr>
          </>
        );

      }
const PRODUCTS=[
  {category:"Fruits",price:"$1",stocked:"true",name:"Apple"},
  {category:"Fruits",price:"$5",stocked:"true",name:"Draganfruit"},
  {category:"Vegetables",price:"$2",stocked:"false",name:"Carrot"},
  {category:"Vegetables",price:"$1",stocked:"true",name:"Peas"},
  {category:"Nuts",price:"$10",stocked:"true",name:"Chesew"}
];
//Main App
function App() {
  return(
<>
<FilterableProducTable products={PRODUCTS}/>
</>
  );
  } 

export default App;