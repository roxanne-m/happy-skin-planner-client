import React from 'react';
import { Route, Link } from 'react-router-dom';
import config from './config';
import LandingPage from './LandingPage/LandingPage';
import About from './About/About';
import Products from './Products/Products';
import AddProduct from './Products/AddProducts';
import WeeklySchedule from './WeeklySchedule/WeeklySchedule';
import ApiContext from './ApiContext';
import './App.css';
import ErrorBoundaries from './ErrorBoundaries/ErrorBoundaries';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    this.getAndSetProducts();
  };

  getAndSetProducts = () => {
    Promise.all([fetch(`${config.url}/products`)])
      .then(([productsResponse]) => {
        if (!productsResponse.ok)
          return productsResponse.json().then((error) => Promise.reject(error));

        return Promise.all([productsResponse.json()]);
      })

      .then(([products]) => {
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
          this.getAndSetProducts();
        }
      })
      .catch((error) => console.log(error));
  };

  /* This function updates state and adds a new product */
  addProduct = (newProduct) => {
    const addProduct = [...this.state.products, newProduct];
    this.setState({ products: addProduct });
  };

  render() {
    /* Set global prop variable */
    const value = {
      products: this.state.products,
      handleDeleteProduct: this.handleDeleteProduct,
      addProduct: this.addProduct,
      getAndSetProducts: this.getAndSetProducts,
    };

    return (
      <ApiContext.Provider value={value}>
        <ErrorBoundaries>
          <header className='header-style'>
            <h1>
              <Link to='/'>Happy Skin Planner</Link>
            </h1>
            <nav>
              <ul className='navigation-style'>
                <li>
                  <a href='about'>About</a>
                </li>
                <li>
                  <a href='weekly-planner'>My Weekly Planner</a>
                </li>
                <li>
                  <a href='products'>My Products</a>
                </li>
              </ul>
            </nav>
          </header>

          <main>
            <Route exact path='/' component={LandingPage} />
            <Route path='/about' component={About} />
            <Route path='/products' component={Products} />
            <Route path='/weekly-planner' component={WeeklySchedule} />
            <Route path='/add-product' component={AddProduct} />
          </main>
          <footer>Roxanne Cantu, Happy Skin Planner 2021</footer>
        </ErrorBoundaries>
      </ApiContext.Provider>
    );
  }
}

export default App;
