import React, { Component } from 'react';
import { Row, Col, Tag } from 'antd';

import './MusiciensList.scss';

export default class MusiciensList extends Component {
  render() {
    const { musiciens, size } = this.props;
    return (
      <div className="MusiciensList">
        <Row gutter={16}>
          {musiciens.slice(0, size || musiciens.length).map(this.renderMusicien)}
        </Row>
      </div>
    );
  }

  renderMusicien(musicien) {
    return (
      <Col className="gutter-row" md={12} key={musicien.musicienId}>
        <div className="MusicienItem">
          <div className="MusicienItem__image">
            <div style={{ backgroundImage: `url(${musicien.user.image})` }} />
          </div>
          <div className="MusicienItem__description">
            <div className="MusicienItem__descriptionTitle">
              {musicien.sceneName}
            </div>
            <div className="MusicienItem__descriptionContent">
              <div className="MusicienItem__musicalStyles">
                <span className="small-title">Style musicaux: </span>
                {musicien.musicalStyles.map(style => <Tag>{style}</Tag>)}
              </div>
              <div className="MusicienItem__instruments">
                <span className="small-title">Instruments: </span>
                {musicien.instruments.map(instrument => <Tag>{instrument}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}
