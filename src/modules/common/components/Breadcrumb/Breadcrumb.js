import React from 'react';
import PropTypes from 'prop-types';

import bg from '../../../common/assets/bg.jpg';
import './Breadcrumb.scss';

const Breadcrumb = ({ pageTitle, pageDescription, imageSrc }) => {
  return (
    <div className="breadcrumb bg-image" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="overlay" />
      <div className="page-title">
        <h1>{pageTitle}</h1>
        <h2>{pageDescription}</h2>
      </div>
    </div>
  );
};

Breadcrumb.defaultProps = {
  imageSrc: bg,
};

Breadcrumb.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDescription: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
};

export default Breadcrumb;
