import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './Products.css';

class Products extends React.Component {
  static defaultProps = {
    // onDeleteProduct: () => {},
  };

  static contextType = ApiContext;

  // handleDeleteProduct = (productId) => {
  //   this.props.history.push('products');
  // };

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
      </li>
    ));
    let productsList = <ol className='ol-product-list'>{products}</ol>;
    return productsList;
  };

  render() {
    const { products = [] } = this.context;
    // console.log(products, 'This is in product.js');
    return (
      <main>
          <h2>Happy Skin Products</h2>
          <Link to='/add-product'
          className='add-product-button'>Add Product
          </Link>
         
        <section className='favorites-style'>
          {this.renderProductsList()}
        </section>
      </main>
    );
  }
}

export default Products;
