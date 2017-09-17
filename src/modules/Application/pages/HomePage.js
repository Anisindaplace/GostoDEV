import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FetchMusiciens from '../../Musicien/hocs/FetchMusiciens';
import MusiciensList from '../../Musicien/components/MusiciensList';

import Breacrumb from '../../common/components/Breadcrumb/Breadcrumb';

@FetchMusiciens
export default class HomePage extends Component {
  static propTypes = {
    musiciens: PropTypes.array,
  }

  render() {
    const { musiciens } = this.props;
    return (
      <div className="MusiciensListPage">
        <Breacrumb pageTitle="Welcome to Gosto" pageDescription="Gosto est une Plateforme de mise en relation entre les organisateurs de concerts et les musiciens" />
        <div className="before-after">
          <div className="container clearfix">
            <div className="section MusicienSection">
              <div className="section-header text-center">
                <h3 className="section-title">See our top Events</h3>
                <p className="section-subtext">we trying hard to make your fresh mind we trying hard to make your fresh mind</p>
              </div>
              <MusiciensList
                musiciens={musiciens}
                size={4}
              />
            </div>
            <div className="section MusicienSection">
              <div className="section-header text-center">
                <h3 className="section-title">Meet our top Musiciens</h3>
                <p className="section-subtext">we trying hard to make your fresh mind we trying hard to make your fresh mind</p>
              </div>
              <MusiciensList
                musiciens={musiciens}
                size={4}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
