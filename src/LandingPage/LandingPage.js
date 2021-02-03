import React from 'react';
import './LandingPage.css';
import ErrorBoundaries from '../ErrorBoundaries/ErrorBoundaries';

/* Landing page that displays when open app or click app title */
class LandingPage extends React.Component {
  render() {
    return (
      <ErrorBoundaries>
     
        <h2>Welcome!</h2>
        <section className='landing-page-style'>
        <p>
          I am delighted to have you and that you have decided to take charge of
          your one and only skin. With Happy Skin Planner, you have the ability
          to customize your very own planner in order to organize your skin
          regime. To begin, you may explore the navigation tabs and review the
          pages: About, My Weekly Planner, and My Products.
        </p>
        <p>Happy Skin Planning!</p>
        </section>
    
      </ErrorBoundaries>
    );
  }
}

export default LandingPage;
