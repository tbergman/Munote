import React from 'react';
import Note from './Note';

export default class Measure extends React.Component {
  render() {
    const { note } = this.props.measure;

    let notes = '';
    if (note !== null && note !== undefined) {
      notes = note.reverse().map((note, index) =>
        <Note
          key={index}
          index={index}
          type={note.type}
          rest={note.rest}
          pitch={note.pitch}
          stem={note.stem}
          accidental={note.accidental}
          voice={note.voice}
          beam={note.beam}
          duration={note.duration}
          length={note.length}
        />
      );
    }

    return (
      <span className="measure">
        {notes}
      </span>
    );
  }
}
