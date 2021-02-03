import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './Products.css';
import ErrorBoundaries from '../ErrorBoundaries/ErrorBoundaries';
import PropTypes from 'prop-types';

class Products extends React.Component {

  static contextType = ApiContext;

  handleDeleteProduct = (productId) => {
    this.context.handleDeleteProduct(productId);
  };

  getProductName = () => {
    let currentProduct = this.context.products.find(
      (product) => product.id === this.props.product_id
    );
    console.log(currentProduct);
    return currentProduct.product_name;
  };

  renderProductsList = () => {
    // Do the map to create all Li tags, then inject that into productsList
    let products = this.context.products.map((product, i) => (
      <li key={i}>
        {product.product_name}
        <br/>
        <button className='delete-product-button' onClick={() => this.handleDeleteProduct(product.product_id)}>Delete</button>
      </li>
    ));
    let productsList = <ol className='ol-product-list'>{products}</ol>;
    return productsList;
  };

  render() {
    return (
      <ErrorBoundaries>
     
          <h2>Happy Skin Products</h2>
          <Link to='/add-product'
          className='add-product-button'>Add Product
          </Link>
         
        <section className='favorites-style'>
          {this.renderProductsList()}
        </section>
     
      </ErrorBoundaries>
    );
  }
}

Products.propTypes ={
value: PropTypes.number
}

export default Products;
