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

    let clef = '';
    if (this.props.index === 0) {
      clef = attributes[0].clef[0].sign[0] === 'G' ?
        'Treble' : 'Bass';
    }

    let barline = '';
    if (this.props.measure.barline) {
      barline = 'B'
    }

    return (
      <span className="measure col-xs-3">
        {clef}|{notes}|{barline}
      </span>
    );
  }
}
