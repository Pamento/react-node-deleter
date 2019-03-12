import DisplayState from '../components/DisplayState/DisplayState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { uploadFile } from '../actions/fileMenager';

const mapStateToProps = state => {
  return {
    file: state.fileMenager.file
  }
}
const mapDispatchtoProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchtoProps)(DisplayState);