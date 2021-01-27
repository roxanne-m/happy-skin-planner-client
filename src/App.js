import React from 'react';
import { Route, Link } from 'react-router-dom';
import config from './config';
import About from './About/About';
import Products from './Products/Products';
import AddProduct from './Products/AddProducts';
import WeeklySchedule from './WeeklySchedule/WeeklySchedule';
import ApiContext from './ApiContext';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    Promise.all([fetch(`${config.url}/products`)])
      .then(([productsResponse]) => {
        if (!productsResponse.ok)
          return productsResponse.json().then((error) => Promise.reject(error));

        return Promise.all([productsResponse.json()]);
      })

      .then(([products]) => {
        // console.log(products, 'This is from app.js fetch');
        this.setState({ products });
      })

      .catch((error) => {
        console.error({ error });
      });
  };

  /* This function filters through the products and stores array of all 
    products except product that needs to be deleted */
  handleDeleteProduct = (productId) => {
    const deleteUrl = `${config.url}/products/${productId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.setState({
            products: this.state.products.filter(
              (product) => product.id !== productId
            ),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  /* This function updates state and adds a new product */
  addProduct = (newProduct) => {
    const addProduct = [...this.state.products, newProduct];
    this.setState({ products: addProduct });
  };


/* Landing page that displays when open app or click app title */
renderLandingPage(){
  return(
    <main>
      <h2>Welcome!</h2>
      <p>I am delighted to have you and that you have decided to take charge of your 
        one and only skin. With Happy Skin Planner, you have the ability to customize
        your very own planner in order to organize your skin regime. To begin, you may 
        explore the navigation tabs and review the pages: About, My Weekly Planner, and 
        My Products. 
      </p>
      <p>Happy Skin Planning!</p>
    </main>
  )
}

  render() {
    /* Set global prop variable */
    const value = {
      products: this.state.products,
      handleDeleteProduct: this.handleDeleteProduct,
      addProduct: this.addProduct,
    };
  

    return (
      <ApiContext.Provider value={value}>
        <header className='header-style'>
          <h1>
            <Link to='/' >Happy Skin Planner</Link>
          </h1>
          <nav>
          <ul className='navigation-style'>
          <li><a href="about">About</a></li>
          <li><a href="weekly-planner">My Weekly Planner</a></li>
          <li><a href="products">My Products</a></li>
        </ul>
          </nav>
        </header>
        {/* {this.renderLandingPage()}; */}
          <Route path='/about' component={About} />
          <Route path='/products' component={Products} />
          <Route path='/weekly-planner' component={WeeklySchedule} />
          <Route path='/add-product' component={AddProduct} />
        <footer>Roxanne Cantu, Happy Skin Planner 2021</footer>
      </ApiContext.Provider>
    );
  }
}

export default App;
