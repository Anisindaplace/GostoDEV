import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FetchMusiciens from '../../Musicien/hocs/FetchMusiciens';
import FetchConcerts from '../../Concert/hocs/FetchConcerts';

import MusiciensList from '../../Musicien/components/MusiciensList';
import ConcertsList from '../../Concert/components/ConcertsList';

import Breacrumb from '../../common/components/Breadcrumb/Breadcrumb';

@FetchMusiciens
@FetchConcerts
export default class HomePage extends Component {
  static propTypes = {
    musiciens: PropTypes.array,
    concerts: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    authUser: PropTypes.object,
    sendInterest: PropTypes.func.isRequired,
  }

  render() {
    const { musiciens, concerts, authUser, isAuthenticated, sendInterest } = this.props;
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
              <ConcertsList
                concerts={concerts}
                isMusicien={isAuthenticated && authUser.get('musicien')}
                sendInterest={sendInterest}
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
