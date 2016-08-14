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
        <Part key={index} index={index} part={part} font={file.font}/>
      );
    }

    return (
      <div ref="score" className="score">
        <h2 className="text-center">{file.title}</h2>
        <div className="subtitle col-xs-6 text-center">Subtitle: {file.subtitle}</div>
        <div className="composer col-xs-6 text-center">Composer: {file.composer}</div>
        <br />
        {parts}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
