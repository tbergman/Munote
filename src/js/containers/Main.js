import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileProcessor from 'react-file-processor';

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

export default class Main extends React.Component {

  handleClick(e) {
    this.refs.myFileInput.chooseFile();
  }

  handleFileSelect(e, file) {
    console.log('This is file: ' + file[0].path)
    this.props.importFile(file[0].path);
    this.props.history.push('score');
  }

  render() {
    return (
      <div className="file-menu text-center">
        <FileProcessor ref="myFileInput" onFileSelect={this.handleFileSelect.bind(this)}>
          <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>
            Open File
          </button>
        </FileProcessor>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
