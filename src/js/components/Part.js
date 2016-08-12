import React from 'react';
import Vex from 'vexflow';

// Components
import Measure from './Measure';

export default class Part extends React.Component {
  componentDidMount() {
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(
      this.refs.part,
      VF.Renderer.Backends.SVG
    );
    // Configure the rendering context.
    // renderer.resize(500, 200);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);
    // Add a clef and time signature.
    let clef = this.props.part.measure[0].attributes[0].clef[0].sign[0] == 'G' ?
      'treble' : 'bass';

    stave.addClef(clef).addTimeSignature("4/4");
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  }

  render() {
    const { part } = this.props;

    let measures = '';
    if (part.measure !== null && part.measure !== undefined) {
      measures = part.measure.map((measure, index) =>
        <Measure key={index} index={index} measure={measure} />
      );
    }
    return (
      <div ref="part" className="part">

      </div>
    );
  }
}
