import UploadFile from '../components/UploadFile/UploadFile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadFile } from '../actions/fileMenager';

const mapStateToProps = state => {
  return {
    file: state.fileMenager.file
  }
}
const mapDispatchtoProps = dispatch => ({
  actions: bindActionCreators({uploadFile}, dispatch)
})

export default connect(mapStateToProps, mapDispatchtoProps)(UploadFile);