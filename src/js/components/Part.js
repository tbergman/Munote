import React from 'react';
import Vex from 'vexflow';

export default class Part extends React.Component {
  componentDidMount() {
    const { part, font, timeSignature, measures } = this.props;
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
    let barX = 20;
    let barY = 0;

    // Generate Staves with Notes according to JSON file.
    for(let i = 0; i < measures; i++) {
      // New Bar
      let stave;
      if (i === 0) {
        // First Bar
        stave = new VF.Stave(barX, barY, barWidth);
        stave.addClef(part.clef).addTimeSignature(timeSignature);
      } else if (i >= 1) {
        // Not First Bar and Create new bar over at end of previous bar
        stave = new VF.Stave(barX += barWidth, barY, barWidth);

        // Check to see if part measures length is as long as Score measures.
        if(part.measures[i] !== undefined) {
          // Add new time signature if time signature != piece signature or last bar signature
          if (timeSignature !== part.measures[i].timeSignature || part.measures[i - 1].timeSignature !== part.measures[i].timeSignature) {
            stave.addTimeSignature(part.measures[i].timeSignature);
          }
        }

        // Lengthen renderer for more measures
        renderer.resize(barWidth + barX, 200);
      }

      if (measures - 1 === i) {
        // If last put double barline
        stave.setEndBarType(VF.Barline.type.END);
      } else {
        // Put normal bar line if not last measure
        stave.setEndBarType(VF.Barline.type.SINGLE);
      }

      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();

      let beatsPerMeasure = parseInt(timeSignature.substring(0, 1));

      let notes = [];
      // ToDo: Make sure adding measures adds new measures to every part.
      // If Measure does not exist make a measure with rests.
      // if (part.measures[i] === undefined) {
      //   for(let j = 0; j < beatsPerMeasure; j++) {
      //     notes.push(new VF.StaveNote({
      //       keys: ["b/4"],
      //       duration: "qr"
      //     }))
      //   }
      // } else {
        // Measure exists, create notes.
        for(let j = 0; j < part.measures[i].notes.length; j++) {
          notes.push(new VF.StaveNote({
            keys: part.measures[i].notes[j].keys,
            duration: part.measures[i].notes[j].duration
          }))
        }
      // }

      // console.log(notes);
      // create the beams
      var beams = new VF.Beam.generateBeams(notes, {
        beam_rests: true,
        show_stemlets: true
      });

      VF.Formatter.FormatAndDraw(context, stave, notes);
      beams.forEach(function(b) {b.setContext(context).draw()});
    }
  }

  render() {
    let partClassName = `part-${this.props.index} ${this.props.part.instrument}`;

    return (
      <div>
        <span className="instrument">Instrument: {this.props.part.instrument}</span>
        <div ref="part" className={partClassName}></div>
      </div>
    );
  }
}
