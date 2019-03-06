import App from '../components/App'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import { uploadFile, deleteFile, uploadSuccess, uploadFail } from '../actions/fileMenager'

const mapStateToProps = state => {
	return {
		file: state.fileMenager.file
	}
}
const mapDispatchtoProps = dispatch => ({
    actions: bindActionCreators({uploadFile, deleteFile, uploadSuccess, uploadFail}, dispatch)
})

export const AppContainer = connect(mapStateToProps, mapDispatchtoProps)(App)
