import * as types from '../constants/actionTypes';
import axios from "axios";

export const uploadSuccess = (value) => {
	return {
		type: types.UPLOAD_FILE_SUCCESS,
		value
	};
};
export const uploadFail = (error) => {
	return {
		type: types.UPLOAD_FILE_FAIL,
		error
	};
}
export const deleteFile = () => ({
	type: types.DELETE_FILE
})

export const uploadFile = (file) => {
	return async (dispatch) => {
    // this.props.actions.uploadfile;
    // axios.post('/files', data)...
    axios.post( 'http://localhost:8000/files', file)
      .then(function(res){
				console.log('server RESPONS :',res);
				dispatch(uploadSuccess(res.data));
				console.log('SUCCESS!!');
			})
    .catch(function(error){
			dispatch(uploadFail(error));
			console.log('FAILURE!!');
		});
  }
}
