import React from 'react';
import { NavLink } from 'react-router-dom';
import './About.css';

class About extends React.Component {
  render() {
    return (
      <main>
        <h2>About Happy Skin Planner</h2>
        <fieldset className='about-style'>
          <p>
            Happy Skin Planner was created in order to assist people who wanted
            to take charge of maintaining and prioritizing their skin. It was
            created with love and is intended to assist you in planning out your
            weekly skin care routine.
          </p>

          <p>
            With Happy Skin Planner you can decide what products you want to use
            by adding them into your Happy Skin Products page. When adding a new
            skin product, you can choose what specific days to use the products
            and also customize whether you wish to add it to your Morning or
            Evening routine. This will create a customized weekly planner for
            you to view on the "My Weekly Planner" tab and allows you to check
            them off as you complete your skin regime throughout the day. If you
            no longer wish to use a specific product, you may also remove the
            product from your planner. Happy Skin Planner is entirely
            customizable for your use in order to provide your skin the love it
            needs to leave it ever so happy!
          </p>

          <p>
            Happy Skin Planning! <br />
            XoXo
          </p>
        </fieldset>
      </main>
    );
  }
}

export default About;
