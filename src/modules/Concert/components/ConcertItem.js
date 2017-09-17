import React from 'react';
import PropTypes from 'prop-types';
import './ConcertItem.scss';

export const ConcertItem = ({ title, subTitle, description, imageSrc, concertDate }) => {
  return (
    <div className="Card" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="Card__Title title-content">
        <h3>{title}</h3>
        <hr />
        <div className="intro">{subTitle}</div>
      </div>
      <div className="Card__Info">
        {description}
      </div>
      <div className="Card__UtilityInfo">
        <ul className="Card__UtilityList">
          <li className="comments">12</li>
          <li className="date">{concertDate}</li>
        </ul>
      </div>
      <div className="gradient-overlay" />
      <div className="color-overlay" />
    </div>
  );
};

ConcertItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  concertDate: PropTypes.string.isRequired,
};

export default ConcertItem;
