import React, { Component } from 'react';

import FetchMusiciens from '../../hocs/FetchMusiciens';
import MusiciensList from '../../components/MusiciensList';

import Breacrumb from '../../../common/components/Breadcrumb/Breadcrumb';

@FetchMusiciens
export default class MusiciensListPage extends Component {
  render() {
    const { musiciens } = this.props;
    return (
      <div className="MusiciensListPage">
        <Breacrumb pageTitle="Musiciens" />
        <div className="section before-after">
          <div className="container clearfix">
            <MusiciensList
              musiciens={musiciens}
            />
          </div>
        </div>
      </div>
    );
  }
}
