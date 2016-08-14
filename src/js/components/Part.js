import React from 'react';
import Vex from 'vexflow';

// Components
import Measure from './Measure';

export default class Part extends React.Component {
  componentDidMount() {
    // Staves
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(
      this.refs.part,
      VF.Renderer.Backends.SVG
    );
    // Configure the rendering context.
    // renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 6, "").setBackgroundFillStyle("#eed");
    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new VF.Stave(20, 40, 400);
    // Add a clef and time signature.
    const clef = this.props.part.measure[0].attributes[0].clef[0].sign[0] == 'G' ? 'treble' : 'bass';
    const beats = this.props.part.measure[0].attributes[0].time[0].beats[0];
    const beatType = this.props.part.measure[0].attributes[0].time[0]['beat-type'][0];
    stave.addClef(clef).addTimeSignature(`${beats}/${beatType}`);
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Notes
    const { part } = this.props;
    let notes = [];
    if (part.measure !== null && part.measure !== undefined) {
      for(var i = 0; i < part.measure.length; i++) {
        notes.push(new VF.StaveNote({ keys: ["c/4"], duration: "q" }))
      }

      // Create a voice in Time signature and add above notes
      var voice = new VF.Voice({num_beats: beats,  beat_value: beatType});
      voice.addTickables(notes);

      // Format and justify the notes to 400 pixels.
      var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

      // Render voice
      voice.draw(context, stave);
    }
  }

  render() {

    return (
      <div ref="part" className="part">

      </div>
    );
  }
}
