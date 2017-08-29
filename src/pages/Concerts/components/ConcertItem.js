import React from 'react';
import './ConcertItem.css';

export const ConcertIntem = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="blog-card spring-fever">
      <div className="title-content">
        <h3>SPRING FEVER</h3>
        <hr />
        <div className="intro">Yllamco laboris nisi ut aliquip ex ea commodo.</div>
      </div>
      <div className="card-info">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. 
      </div>
      <div className="utility-info">
        <ul className="utility-list">
          <li className="comments">12</li>
          <li className="date">03.12.2015</li>
        </ul>
      </div>
      <div className="gradient-overlay" />
      <div className="color-overlay" />
    </div>
  );
};

export default ConcertIntem;
