import React from 'react';
import './WeeklySchedule.css';
import ApiContext from '../ApiContext';

class WeeklySchedule extends React.Component {
  static contextType = ApiContext;

//   handleCompletedProduct(event) {
//       const completed = 
//   }
  
  render() {
      console.log(this.context.products)
    let mornings = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    let evenings = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    for (let product of this.context.products) {
      for (let day in product.days) {
        // console.log(product, day);
        if (product.days[day].morning) {
          mornings[day].push(product.product_name);
        } else {
          evenings[day].push(product.product_name);
        }
      }
    }
    // console.log(mornings, evenings);
    return (
        <main>
      <table className='table-style'>
        <thead>
          <tr>
            <th colSpan='8'>Weekly Skin Planner</th>
          </tr>
          <tr className='week-day-style'>
              <td>Time of Day</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
            <td>Sunday</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='morning-style'>Morning</td>
            <td><li>{mornings.monday.join(' ')}</li></td>
            <td><li>{mornings.tuesday.join(' ')}</li></td>
            <td>{mornings.wednesday.join(' ')}</td>
            <td>{mornings.thursday.join(' ')}</td>
            <td>{mornings.friday.join(' ')}</td>
            <td>{mornings.saturday.join(' ')}</td>
            <td>{mornings.sunday.join(' ')}</td>
          </tr>
          <tr>
          <td className='evening-style'>Evening</td>
            <td>{evenings.monday.join(' ')}</td>
            <td>{evenings.tuesday.join(' ')}</td>
            <td>{evenings.wednesday.join(' ')}</td>
            <td>{evenings.thursday.join(' ')}</td>
            <td>{evenings.friday.join(' ')}</td>
            <td>{evenings.saturday.join(' ')}</td>
            <td>{evenings.sunday.join(' ')}</td>
          </tr>
        </tbody>
      </table>
      </main>
    );
  }
}

export default WeeklySchedule;
