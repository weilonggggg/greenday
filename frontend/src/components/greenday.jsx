import React, { Component } from 'react';
import './greenday.css';
import totebag from './totebag.jpg';
import _, { filter, toLower } from "lodash";
import axios from "axios";


class Greenday extends Component {
    
    state = {
        products : [],
        search : "", 
    };

    componentDidMount = () => {
        var newProduct=[];
        axios.get("/productdetails").then(response => {
           var productname = response.data.parsedBody;
           newProduct = Object.keys(productname).map(key => {
               return productname[key];
           })
           this.setState({
               products: [...this.state.products, ...newProduct]
            });
            console.log(this.state.products);
           })

    };


    handleChange = (f) => {
        this.setState({search: f.target.value});

    }

    handleSort = (e) => {
        this.setState({sort:e.target.value});
        this.listProducts();
    };

    listProducts(){
        this.setState( state => {
            if(state.sort !== ''){
                state.products.sort((a,b)=>(state.sort==='lowest')?(a.price>b.price?1:-1):(a.price<b.price?1:-1))
            }
        })
    }

    render() { 

        const {search} = this.state;
        const filteredProducts = this.state.products.filter(product =>{
            return product.name.indexOf(search) !== -1;
        })

        return ( 
            <div className="grid-container">
            <header className="header">
             <p className="topbar">GreenDay</p>
             
             <form className="search">
                 Search : 
                <input type="text" placeholder="Search By Typing.." name="search" onChange={this.handleChange} />
            </form>

             <form className="dropdown">
             <label>
                 <p>Sort By :</p> 
                 <select onChange={this.handleSort} value={this.state.sort}>
                 <option value="">Select</option>
                <option value="lowest">price:low-high</option>
                <option value="highest">price:high-low</option>
                </select>
             </label>
             </form>
            </header>
            <main className="main">
               <ul className="products">
                   {
                    filteredProducts.map(product => 
                    <li className="list">
                       <div className="product">
                           <img src={`${product.image}.jpg`} className="product-image"/>
                       <div className="product-name">{product.name}</div>
                       <div className="price">{product.price}</div>
                       </div>
                   </li>)
                   }
               </ul>
            </main>
            </div>
            
         );
    }
}
 
export default Greenday;