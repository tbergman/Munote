import React from 'react';
import Note from './Note';

export default class Measure extends React.Component {
  render() {
    const { notes } = this.props.measure
    const generateNotes = notes.map((note, index) =>
      <Note key={index} index={index} note={note} />
    );
    return (
      <span>
        {generateNotes}
      </span>
    );
  }
}
