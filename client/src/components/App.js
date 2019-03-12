import React, { Component } from "react";
import FileInput from '../containers/UploadFileCont';
// import CKEDITOR from '../containers/CKEditorCont';
import DisplayState from '../containers/DisplayStateContainer'


class App extends Component {

  render() {
    return (
      <div>
        <FileInput />
        <DisplayState />
      </div>
    );
  }
}
export default App;