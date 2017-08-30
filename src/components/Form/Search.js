import React, { Component } from 'react';
import { Icon } from 'antd';

import './Search.scss';

export default class Search extends Component {
  render() {
    return (
      <div className="Search">
        <span className="icon">
          <Icon type="search" />
        </span>
        <input
          type="search"
          id="search"
          placeholder="Search..."
          {...this.props}
        />
      </div>
    );
  }
}
