import React from 'react';
import './ConcertItem.scss';

export const ConcertIntem = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="Card" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="Card__Title title-content">
        <h3>{title}</h3>
        <hr />
        <div className="intro">{subtitle}</div>
      </div>
      <div className="Card__Info">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim. 
      </div>
      <div className="Card__UtilityInfo">
        <ul className="Card__UtilityList">
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
