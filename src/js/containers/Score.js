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
