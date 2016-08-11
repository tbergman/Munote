import React from 'react';
import Note from './Note';

export default class Measure extends React.Component {
  render() {
    const { attributes, note } = this.props.measure;

    let notes = '';
    if (note !== null && note !== undefined) {
      notes = note.map((note, index) =>
        <Note
          key={index}
          index={index}
          type={note.type}
          rest={note.rest}
          voice={note.voice}
          duration={note.duration}
          length={note.length}
        />
      );
    }

    let cleff = '';
    if (this.props.index === 0) {
      cleff = attributes[0].clef[0].sign[0] === 'G' ?
        'Treble Clef' : 'Bass Clef';
    }

    return (
      <span className="measure col-xs-2">
        {cleff}|{notes}|
      </span>
    );
  }
}
