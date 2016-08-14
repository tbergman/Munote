import React from 'react';
import Vex from 'vexflow';

export default class Part extends React.Component {
  componentDidMount() {
    const { part, font } = this.props;
    console.log(part);
    // Staves
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(
      this.refs.part,
      VF.Renderer.Backends.SVG
    );
    const context = renderer.getContext();
    context.setFont(font.name, font.size, "").setBackgroundFillStyle("#eed");

    // Bar Params
    let barWidth = 200;
    let barX = 10;
    let barY = 0;

    // Generate Staves with Notes according to JSON file.
    for(let i = 0; i < part.measures.length; i++) {
      // New Bar
      let stave;
      if (i === 0) {
        // First Bar
        stave = new VF.Stave(barX, barY, barWidth);
        stave.addClef(part.clef).addTimeSignature(part.timeSignature);
      } else if (i >= 1) {
        // Not First Bar
        stave = new VF.Stave(barX += 200, barY, barWidth);
        // Add new time signature if time signature != piece signature or last bar signature
        if (part.timeSignature !== part.measures[i].timeSignature || part.measures[i - 1].timeSignature !== part.measures[i].timeSignature) {
          stave.addTimeSignature(part.measures[i].timeSignature);
        }
        renderer.resize(barWidth + barX, 200);
      }

      if (part.measures.length - 1 === i) {
        // If last put double barline
        stave.setEndBarType(VF.Barline.type.END);
      } else {
        stave.setEndBarType(VF.Barline.type.SINGLE);
      }

      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();

      let notes = [];
      for(let j = 0; j < part.measures[i].notes.length; j++) {
        notes.push(new VF.StaveNote({
          keys: part.measures[i].notes[j].keys,
          duration: part.measures[i].notes[j].duration
        }))
      }
      console.log(notes);
      // create the beams
      var beams = new VF.Beam.generateBeams(notes);

      VF.Formatter.FormatAndDraw(context, stave, notes);
      beams.forEach(function(b) {b.setContext(context).draw()});

      // Create a voice in Time signature and add above notes
      // let measureSig = part.measures[i].timeSignature;
      // let num_beats = parseInt(measureSig.substring(0, 1));
      // let beat_value = parseInt(measureSig.substring(measureSig.lenth - 1));
      // let voice = new VF.Voice({num_beats: num_beats,  beat_value: beat_value});
      // voice.setStrict(false);
      // voice.addTickables(notes);

      // Helper function to justify and draw a 4/4 voice

      // Format and justify the notes to 400 pixels.
      // let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

      // Render voice
      // voice.draw(context, stave);
    }
  }

  render() {
    return (
      <div>
        <span className="instrument">Instrument: {this.props.part.instrument}</span>
        <div ref="part" className="part"></div>
      </div>
    );
  }
}
