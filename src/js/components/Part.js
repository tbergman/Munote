import React from 'react';
import Measure from './Measure';

export default class Part extends React.Component {
  render() {
    const { part } = this.props;
    let measures = '';
    if (part.measure !== null && part.measure !== undefined) {
      measures = part.measure.map((measure, index) =>
        <Measure key={index} index={index} measure={measure} />
      );
    }
    return (
      <span className="part">
        {measures}
      </span>
    );
  }
}
