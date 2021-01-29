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
      morningOrEvening: true,
      dayOfWeek: {
        monday: false,
        tuesday: false,
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

  // This function handles changes in state for text input
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // This function handles changes in state for morning or evening
  handleMorningChange = (event) => {
    const mornOrEven = event.target.value;
    // console.log(mornOrEven)
    this.setState({
      morningOrEvening: mornOrEven === 'morning',
    });
  };

  // This function handles changes in state for checkbox input
  handleDayOfWeekChange = (event) => {
    const dayOfWeek = event.target.value;
    this.setState({
      dayOfWeek: {
        ...this.state.dayOfWeek,
        [dayOfWeek]: !this.state.dayOfWeek[dayOfWeek],
      },
    });
  };

  // On this submit button, perform post request
  handleSubmit(e) {
    e.preventDefault();
    const pName = this.state.productName;
    const mOrE = this.state.morningOrEvening;
    const dOfWeek = this.state.dayOfWeek; //needs to be changed to handle a checkbox

    let filteredDays = {};
    // iterating over keys of an object (let key in dOfWeek)
    for (let key in dOfWeek) {
      //if value of day is true,then add day to filteredDays. If false, not added to object
      if (dOfWeek[key]) {
        filteredDays[key] = dOfWeek[key];
      }
    }

    // console.log(filteredDays)      test checks to see if only days set to true are stored
    if (noBoxesChecked()) {
      alert('Please, check at least one checkbox!');
    } else {
      // Perform fetch request and error handling
      fetch(`${config.url}/products`, {
        method: 'POST',
        body: JSON.stringify({
          product_name: pName,
          morning: mOrE === 'morning',
          days: filteredDays,
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
              value='morning'
              checked={this.state.morningOrEvening.morning}
              onChange={this.handleMorningChange}
              defaultChecked
            />
            <label htmlFor='morning'>Morning</label>
            <br />
            <input
              id='evening'
              type='radio'
              name='morningOrEvening'
              value='evening'
              checked={this.state.morningOrEvening.evening}
              onChange={this.handleMorningChange}
            />
            <label htmlFor='evening'>Evening</label>
            <br />

            <div>
              <p>Check Days To Use Product</p>
              <div>
                <input
                  type='checkbox'
                  id='monday'
                  name='dayOfWeek'
                  value='monday'
                  checked={this.state.dayOfWeek.monday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='monday'>Monday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='tuesday'
                  name='dayOfWeek'
                  value='tuesday'
                  checked={this.state.dayOfWeek.tuesday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='tuesday'>Tuesday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='wednesday'
                  name='dayOfWeek'
                  value='wednesday'
                  checked={this.state.dayOfWeek.wednesday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='wednesday'>Wednesday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='thursday'
                  name='dayOfWeek'
                  value='thursday'
                  checked={this.state.dayOfWeek.thursday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='thursday'>Thursday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='friday'
                  name='dayOfWeek'
                  value='friday'
                  checked={this.state.dayOfWeek.friday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='friday'>Friday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='saturday'
                  name='dayOfWeek'
                  value='saturday'
                  checked={this.state.dayOfWeek.saturday}
                  onChange={this.handleDayOfWeekChange}
                />
                <label htmlFor='saturday'>Saturday</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='sunday'
                  name='dayOfWeek'
                  value='sunday'
                  checked={this.state.dayOfWeek.sunday}
                  onChange={this.handleDayOfWeekChange}
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
