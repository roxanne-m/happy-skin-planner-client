/* eslint-disable no-lone-blocks */
import React from 'react';
import './WeeklySchedule.css';
import config from '../config';
import ApiContext from '../ApiContext';
import ErrorBoundaries from '../ErrorBoundaries/ErrorBoundaries';

class WeeklySchedule extends React.Component {
  static contextType = ApiContext;

  handleCompletedButton = (event, weekId, completed) => {
    event.preventDefault();
    // console.log(weekId);

    const newCompleted = { completed };

    // make patch request using the weekId to the backend
    fetch(`${config.url}/weekly-planner/${weekId}`, {
      method: 'PATCH',
      body: JSON.stringify(newCompleted),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not mark as completed.');
        }
      })
      .then(() => {
        this.context.getAndSetProducts();
      })
      .catch((err) => {
        alert(err);
      });
  };


  render() {
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
        // if given day does not match the mon-sun range, then check the next day. (might not match the range bc of left-join that makes the null for tests)
        if (!mornings.hasOwnProperty(day.toLowerCase())) {
          // continue skips
          continue;
        }

        if (product.days[day].morning) {
          mornings[day].push({
            productName: product.product_name,
            ...product.days[day],
          });
        } else {
          evenings[day].push({
            productName: product.product_name,
            ...product.days[day],
          });
        }
      }
    }

    // This iterates through the mornings object and creates a cell for each day of the week with its pertaining products.
    const morningsIteration = () => {
      let output = [];
      for (const key in mornings) {
        output.push(
          <td key={key}>
            {<h3>{key.toUpperCase()}</h3>}
            {mornings[key].map((item, i) => (
              <div key={i}>
                <p>
                  <span className={item.completed ? 'strike-through' : ''}>
                    {item.productName}
                  </span>
                </p>

                {item.completed ? (
                  <button
                    className='complete-button-style'
                    onClick={(e) =>
                      this.handleCompletedButton(e, item.week_id, false)
                    }
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    className='complete-button-style'
                    onClick={(e) =>
                      this.handleCompletedButton(e, item.week_id, true)
                    }
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </td>
        );
      }
      return output;
    };

     // This iterates through the evenings object and creates a cell for each day of the week with its pertaining products.
    const eveningsIteration = () => {
      let output = [];
      for (const key in evenings) {
        output.push(
          <td key={key}>
            {<h3 className='hide-day'>{key.toUpperCase()}</h3>}
            {evenings[key].map((item, i) => (
              <div key={i}>
                <p>
                  <span className={item.completed ? 'strike-through' : ''}>
                    {item.productName}
                  </span>
                </p>

                {item.completed ? (
                  <button
                    className='complete-button-style'
                    onClick={(e) =>
                      this.handleCompletedButton(e, item.week_id, false)
                    }
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    className='complete-button-style'
                    onClick={(e) =>
                      this.handleCompletedButton(e, item.week_id, true)
                    }
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </td>
        );
      }
      return output;
    };

    return (
      <ErrorBoundaries>
        <table className='table-style'>
          <thead>
            <tr>
              <th colSpan='8'>Weekly Skin Planner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='morning-style'>Morning</td>

              {morningsIteration()}
            </tr>
            <tr>
              <td className='evening-style'>Evening</td>

              {eveningsIteration()}
            </tr>
          </tbody>
        </table>
      </ErrorBoundaries>
    );
  }
}

export default WeeklySchedule;
