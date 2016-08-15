import React from 'react';
import noteHelper from '../helpers/noteHelper';

export default class Note extends React.Component {
  render() {
    const { note } = this.props;
    const { type, range } = note;
    return (
      <span className="note">
        {noteHelper(type, note.note, range)}
      </span>
    );
  }
}
