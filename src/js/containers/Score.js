import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    if (file.part !== null && file.part !== undefined) {
      parts = file.part.map((part, index) =>
        <Part key={index} index={index} part={part} />
      );
    }
    return (
      <div className="score">
        {parts}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
