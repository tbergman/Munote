import React from 'react';
import Vex from 'vexflow';

// Components
import Measure from './Measure';

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
    // Configure the rendering context.
    // renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont(font.name, font.size, "").setBackgroundFillStyle("#eed");

    // Notes
    let barWidth = 200;
    let barX = 10;
    let barY = 0;

    for(let i = 0; i < part.measures.length; i++) {
      // New Bar
      let stave;
      if (i === 0) {
        stave = new VF.Stave(barX, barY, barWidth);
        stave.addClef(part.clef).addTimeSignature(part.timeSignature);
      } else if (i >= 1) {
        stave = new VF.Stave(barX += 200, barY, barWidth);
        if (part.timeSignature !== part.measures[i].timeSignature || part.measures[i - 1].timeSignature !== part.measures[i].timeSignature) {
          stave.addTimeSignature(part.measures[i].timeSignature);
        }
        renderer.resize(barWidth + barX, 200);
      }
      console.log(stave.width);
      console.log(stave.x);
      console.log(stave.y);

      stave.setEndBarType(VF.Barline.type.SINGLE);

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
      // Create a voice in Time signature and add above notes
      // let measureSig = part.measures[i].timeSignature;
      // let num_beats = parseInt(measureSig.substring(0, 1));
      // let beat_value = parseInt(measureSig.substring(measureSig.lenth - 1));
      // let voice = new VF.Voice({num_beats: num_beats,  beat_value: beat_value});
      // voice.setStrict(false);
      // voice.addTickables(notes);

      // Helper function to justify and draw a 4/4 voice
      VF.Formatter.FormatAndDraw(context, stave, notes);
      // Format and justify the notes to 400 pixels.
      // let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

      // Render voice
      // voice.draw(context, stave);
    }


  }

  render() {
    return (
      <div ref="part" className="part">

      </div>
    );
  }
}
