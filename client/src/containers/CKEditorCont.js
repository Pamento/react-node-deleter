import CKEDITOR from '../components/CKEditor/CKEditor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadFile, uploadSuccess } from '../actions/fileMenager';

const mapStateToProps = state => {
  console.log('cKEditor container state',state.fileMenager.file);
  
  return {
    file: state.fileMenager.file
  }
}
const mapDispatchtoProps = dispatch => ({
  actions: bindActionCreators({uploadFile, uploadSuccess}, dispatch)
})

export default connect(mapStateToProps, mapDispatchtoProps)(CKEDITOR);