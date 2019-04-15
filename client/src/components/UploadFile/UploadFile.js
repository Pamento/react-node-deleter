import React, { Component } from 'react';
import './UploadFile.css';

class FileInput extends Component {

  // constructor(props) {
  //   super(props)
  //   this.fileToUpload = this.fileToUpload.bind(this);
  // }

  fileToUpload = (e) => {
    let file = e.target.files[0];
    /**
     * @var styles values in the pixels
     * @key fontFamily: according to user choice
     * @key fontSize: normal current velue = 16px
     * @key lineHeight: default __'null'__ because this value is/(must by...) in proportional relation with fontSize.
     * Example for font-family 'Arial': font-size = 16px, proportionaly lineHeight = 20.
     * @key letterSpacing: default value = 0.
     * @key wordSpacing: default value = 4px;
     */
    // let styles = {
    //   'fontFamily': 'URW Gothic L',
    //   'fontSize': 24,
    //   'lineHeight': 30,
    //   'letterSpacing': 10,
    //   'wordSpacing': 14
    // }
    let styles = {};
    let data = new FormData();
    data.append('converted',file);
    data.append('styles',JSON.stringify(styles));
    this.props.actions.uploadFile(data);
    console.log('THIS.props __in__ UPLOADFILE ',this.props)
    // let head = file.name;
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (e) => {
    //   let data = new FormData();
    //   data.append('file',e.target.result);
    //   data.append('name', file.name)
    //   this.props.actions.uploadFile(data,head);
    // }
    // console.log('??????????????????????? \n',
    // this.props.actions.uploadFile(e)
    // );
    // console.log('UpF____file__: ', file);
    // if (file) {
    // console.log(file);
    // console.log('UpF____props.actions ',this.props.actions);
    
    //   this.props.actions.uploadFile({file});
    // }
  }

  render() {
    return (
      <div className="browseFile">
        <span>
          <input type="file"
          name="myFile"
          method="post"
          onChange={(f)=>{this.fileToUpload(f)}} />
        </span>
      </div>
    );
  }
}
export default FileInput;

/**
 * otherwise you can use multipart/form-data or application/x-www-form-urlencoded
 * but
 * application/x-www-form-urlencoded will be more efficient
 * https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean
 */