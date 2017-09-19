import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Icon, Tag } from 'antd';
import map from 'lodash/map';
import truncate from 'lodash/truncate';
import pluralize from 'pluralize';
import './ConcertItem.scss';

class ConcertPopoverContent extends Component {
  send = () => {
    const { title, sendInterest } = this.props;
    sendInterest().then(({ payload }) => {
      if (payload.success) {
        window.location.href = `mailto:hello@gosto.co?subject=Je suis interessé(e) par ce concert "${title}"`;
      }
    });
  }

  render() {
    const isChecked = this.props.isInterestedIn || this.props.isInterested;
    return (
      <div className="ConcertPopoverContent">
        <div className="ConcertPopoverContent__title">{this.props.title}</div>
        <div className="ConcertPopoverContent__duration">
          <span className="m-r-10"><Icon type="calendar" /> {this.props.concertDate} {this.props.time}</span>
          <span><Icon type="clock-circle-o" /> {pluralize('heure', this.props.duration, true)}</span>
        </div>
        <div className="ConcertPopoverContent__description">{this.props.description}</div>
        <div className="ConcertPopoverContent__extra">
          <div className="p-b-10">
            <div className="ConcertPopoverContent__extraItem">Styles musicaux recherchés: </div>
            {map(this.props.musicalStyles, style => <Tag key={style}>{style}</Tag>)}
          </div>
          <div className="p-b-10">
            <div className="ConcertPopoverContent__extraItem">Catégorie d’artistes: </div>
            {map(this.props.artisteCategories, category => <Tag key={category}>{category}</Tag>)}
          </div>
        </div>
        {this.props.isMusicien &&
          <div className="ConcertPopoverContent__action">
            <Button
              type={isChecked ? 'secondary' : 'primary'}
              icon={isChecked ? 'check' : 'heart'}
              className="btn-block"
              onClick={!isChecked && this.send}
              disabled={isChecked}
            >
              {isChecked ? 'INVITATION WAS SENT' : 'SEND INVITATION'}
            </Button>
          </div>
        }
      </div>
    );
  }
}

ConcertPopoverContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  concertDate: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  musicalStyles: PropTypes.array.isRequired,
  artisteCategories: PropTypes.array.isRequired,
  isMusicien: PropTypes.bool,
  isInterestedIn: PropTypes.bool,
  isInterested: PropTypes.bool,
  sendInterest: PropTypes.func.isRequired,
};

const ConcertItem = (props) => {
  const { title, subTitle, description, imageSrc, concertDate, time } = props;
  return (
    <Popover content={<ConcertPopoverContent {...props} />}>
      <div className="Card" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="Card__Title title-content">
          <h3>{title}</h3>
          <hr />
          <div className="intro">{subTitle}</div>
        </div>
        <div className="Card__Info">
          {truncate(description, { length: 150 })}
        </div>
        <div className="Card__UtilityInfo">
          <ul className="Card__UtilityList">
            <li><Icon type="calendar" /> {concertDate}</li>
            <li><Icon type="clock-circle-o" /> {time}</li>
          </ul>
        </div>
        <div className="gradient-overlay" />
        <div className="color-overlay" />
      </div>
    </Popover>
  );
};

ConcertItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  concertDate: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ConcertItem;
