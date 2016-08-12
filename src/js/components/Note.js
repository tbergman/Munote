import React from 'react';
import noteHelper from '../helpers/noteHelper';

export default class Note extends React.Component {
  render() {
    const { duration, rest, type, voice, pitch } = this.props;

    return (
      <span className="note">
      
      </span>
    );
  }
}
