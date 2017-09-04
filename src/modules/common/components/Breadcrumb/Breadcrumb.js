import React from 'react';
import PropTypes from 'prop-types';

import bg from '../../../common/assets/bg.jpg';
import './breadcrumb.scss';

const Breadcrumb = ({ pageTitle, imageSrc }) => {
  return (
    <div className="breadcrumb bg-image" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className="overlay" />
      <div className="page-title">
        <h1>{pageTitle}</h1>
      </div>
    </div>
  );
};

Breadcrumb.defaultProps = {
  imageSrc: bg,
};

Breadcrumb.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default Breadcrumb;
