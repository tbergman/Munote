import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Vex from 'vexflow';

// Components
import Part from '../components/Part';

// Actions
import actions from '../actions/index';

const mapStateToProps = (state) => {
  return {
    file: state.file
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

class Score extends React.Component {
  render() {
    const { file } = this.props;
    let parts = <h2 className="text-center">Loading...</h2>;
    if (file !== null && file !== undefined) {
      parts = file.parts.map((part, index) =>
        <Part
          key={index}
          index={index}
          part={part}
          timeSignature={file.timeSignature}
          font={file.font}
          measures={file.measures}
        />
      );
    }

    // Dom Node Map and Manipulation / Grab Notes and Organize
    // Each Parts Note Nodes and Amount of Notes
    let grabbedNotes = [];
    for(let i = 0; i < file.parts.length; i++) {
      let selection = $(`.part-${i}`).find(`.vf-stavenote`).toArray();
      grabbedNotes.push(selection);
    }

    //Each Parts Notes per Measure (Doesnt account for empty rest/data measures)
    let measureLength = [];
    for(let i = 0; i < file.parts.length; i++) {
      let currentMeasureLength = [];
      for(let j = 0; j < file.parts[i].measures.length; j++) {
        currentMeasureLength.push(file.parts[i].measures[j].notes.length);
      }
      measureLength.push(currentMeasureLength);
    }

    // Loops through each part and puts each node in own array similar
    // to how measures are laid out. Indexing is same as JSON.
    let organizedNotesPerPart = [];

    for(let i = 0; i < measureLength.length; i++) {
      let tempPartHolder = [];
      measureLength[i].forEach((x, index) => {
        let tempMeasure = [];
        for(let j = 0; j < x; j++) {
          tempMeasure.push(grabbedNotes[i].shift());
        }
        tempPartHolder.push(tempMeasure);
      });
      organizedNotesPerPart.push(tempPartHolder);
    }
    // organizedNotesPerPart is laid out like JSON/File state
    console.log(organizedNotesPerPart);

    // Note Selection / Find Index\
    // Found Index will be used for Action to manipulate JSON
    $(".vf-stavenote").on("mousedown", function() {
      let selection = this;
      // d3.select(this).on(".drag", null);
      let nodeSelection = $(this);
      console.log(nodeSelection);
      for(let i = 0; i < organizedNotesPerPart.length; i++) {
        for(let j = 0; j < organizedNotesPerPart[i].length; j++) {
          for(let k = 0; k < organizedNotesPerPart[i][j].length; k++) {
            if (organizedNotesPerPart[i][j][k] === selection) {
              console.log(`Part: ${i}, Measure: ${j}, Note: ${k}`);
              const notePitch = file.parts[i].measures[j].notes[k].keys;
              const noteType = file.parts[i].measures[j].notes[k].duration;
              console.log(notePitch, noteType);
            };
          }
        }
      }
    });

    return (
      <div ref="score" className="score">
        <h1 className="text-center">{file.title}</h1>
        <h4 className="subtitle col-xs-6 text-center">Subtitle: {file.subtitle}</h4>
        <h4 className="composer col-xs-6 text-center">Composer: {file.composer}</h4>
        <br /><br /><br />
        {parts}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
