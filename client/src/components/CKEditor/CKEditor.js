import React, {Component} from 'react';
import CKEditor from 'react-ckeditor-component';
/**
 * https://github.com/codeslayer1/react-ckeditor
 */
export default class CKEDITOR extends Component {
    constructor(props) {
      super(props);
      this.updateContent = this.updateContent.bind(this);
      this.state = {
          content: 'Message :\n\n' +this.props.file
      }
    }

    // nodejs pass doc here
    updateContent = (newContent) => {
      this.setState({
          content: newContent
      })
    }

    onChange = (evt) => {
      // console.log("onChange fired with event info: ", evt);
      console.log('CKEditor this.props ',this.props);
      var newContent = evt.editor.getData();
      this.setState({
        content: newContent
      })
    }

    onBlur = (evt) => {
      // console.log("onBlur event called with event info: ", evt);
    }

    afterPaste = (evt) => {
      // console.log("afterPaste event called with event info: ", evt);
    }

    render() {
      return (
        <CKEditor
          activeClass="p10"
          content={this.state.content}
          events={{
            "blur": this.onBlur,
            "afterPaste": this.afterPaste,
            "change": this.onChange
          }}
        />
      );
    }
}