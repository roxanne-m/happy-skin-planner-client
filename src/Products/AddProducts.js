import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './Products.css';
import noBoxesChecked from './WeekDayCheckbox';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      morningOrEvening: '',
      dayOfWeek: {
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      error: null,
    };
  }
  
  static contextType = ApiContext;

  /* 
        req.body = {
            product_name: text,
            morning: true,
        days: ['monday', 'tuesday']
        }
        
        form for checkbox
        loop through checkbox values
        for each checked checkbox add name of that day to the array
        (target value into array)
        
        */

  // This function handles changes in state
//   handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
        handleChange = (e) => {
            const value1 = e.target.value;
            const checked = e.target.checked;
            this.setState((prevState) => ({dayOfWeek:{...prevState.dayOfWeek, value1: checked } }));
            // this.setState((prevState) => ({ jasper: { ...prevState.jasper, name: 'something', }, }));
        }

  // On this submit button, perform post request
  handleSubmit(e) {
    e.preventDefault();
    const pName = e.target.productName.value;
    // const pName = this.state.productName;
    const mOrE = e.target.morningOrEvening.value;
    // const mOrE = this.state.morningOrEvening;
    const dOfWeek = e.target.dayOfWeek.value; //needs to be changed to handle a checkbox

    if (noBoxesChecked) {
      alert('Please, check at least one checkbox!');
    } else {
      // Perform fetch request and error handling
      fetch(`${config.url}/products`, {
        method: 'POST',
        body: JSON.stringify({
          product_name: pName,
          morning: mOrE,
          days: dOfWeek,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Something went wrong, could not add new product.');
          }

          return res.json();
        })
        .then((data) => {
          this.context.addProduct(data);
          this.props.history.goBack();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  render() {
      const dayOfWeek = this.state.dayOfWeek;
    return (
      <div>
        <form
          className='add-product-form'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Add New Skin Product</h2>
          <fieldset className='add-product-style'>
            <label htmlFor='name'>Product Name: </label>
            <input
              type='text'
              name='productName'
              value={this.state.productName}
              onChange={this.handleChange}
              required
            />
            <br />
            <input
              id='morning'
              type='radio'
              name='morningOrEvening'
              value={this.state.morningOrEvening}
              onChange={this.handleChange}
              defaultChecked
            />
            <label htmlFor='morning'>Morning</label>
            <br />
            <input
              id='evening'
              type='radio'
              name='morningOrEvening'
              value={this.state.morningOrEvening}
              onChange={this.handleChange}
            />
            <label htmlFor='evening'>Evening</label>
            <br />
           

            <div><p>Check Days To Use Product</p>
            <div>
            
                <input
                  type='checkbox'
                  id='monday'
                  name='dayOfWeek'
                  value='monday'
                  checked = {dayOfWeek['monday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='monday'>Monday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='tuesday'
                  name='dayOfWeek'
                  value="tuesday"
                  checked = {dayOfWeek['tuesday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='tuesday'>Tuesday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='wednesday'
                  name='dayOfWeek'
                  value='wednesday'
                  checked = {dayOfWeek['wednesday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='wednesday'>Wednesday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='thursday'
                  name='dayOfWeek'
                  value='thursday'
                  checked = {dayOfWeek['thursday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='thursday'>Thursday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='friday'
                  name='dayOfWeek'
                  value='friday'
                  checked = {dayOfWeek['friday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='friday'>Friday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='saturday'
                  name='dayOfWeek'
                  value='saturday'
                  checked = {dayOfWeek['saturday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='saturday'>Saturday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='sunday'
                  name='dayOfWeek'
                  value='sunday'
                  checked = {dayOfWeek['sunday'] ? 'checked' : ''}
                  onChange={this.handleChange}
                />
                <label htmlFor='sunday'>Sunday</label>
              </div>
            </div>

            <br />
            <div className='form-submit-button'>
              <button type='submit'>Submit</button>
            </div>

            <button onClick={() => this.props.history.goBack()}>Cancel</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddProduct;
