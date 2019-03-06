import React, { Component } from "react";
import FileInput from '../containers/UploadFileCont';
import CKEDITOR from '../containers/CKEditorCont';


class App extends Component {

  render() {
    return (
      <div>
        <FileInput />
        <CKEDITOR />
      </div>
    );
  }
}
export default App;