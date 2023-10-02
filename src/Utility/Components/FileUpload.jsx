import React, { Component } from 'react';
//import CancelConfirmModal from './CancelConfirmModal';
import PropTypes from 'prop-types';
import { loaderStateTrue, loaderStateFalse } from '../../Actions/AllAction';
import { setToken, setUserCredentials, logOutApp, userrole } from '../../Login/Actions/LoginAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class FileUpload extends Component {
    constructor(props) {
        super(props);
		this.state={
			removeFileModalShow:false,
			fileIndex:"",
			fileValue:"",
			fileType:"",
            fileId:""
		}
       
    }

    componentDidMount=()=>{
        //console.log("this.propsthis.propsthis.props",this.props);
    }

    
    removefileNameCompoent=()=>{
        this.props.removefileName(this.state.fileIndex,this.state.fileId,this.props.index);
        this.closeFileRemoveModal();
		
    }
	closeFileRemoveModal = () => {
        this.setState({
            removeFileModalShow: false,
			fileIndex: "",
            fileValue: "",
            fileType: "",
            fileId:""
        })
    }

    fileuploadModal = (index,type,fileId) => {
        this.setState({
            removeFileModalShow: true,
            fileIndex: index,
            //fileValue: value,
            fileType: type,
            fileId:fileId
        })

    }

    fileNameDisplayUi=()=>{
        const { type,leaveFileUpload,fileNameDisplay,parentClassName,labelClassName,errorClassName,errorLabel } = this.props;
        let fileNameDisplayUi = [];        

        if(fileNameDisplay.length>0){
            fileNameDisplay.map((value, index) => {
                //console.log('value',value)
                fileNameDisplayUi.push(<div key={index} className="file_name_inner_box file_name_inner_box_local"><span className="file_name_length">{value}</span><span onClick={this.fileuploadModal.bind(this,index,value,this.props.fileIds[index])} className="file_close_icon"><svg width="10" height="10" viewBox="0 0 22 22" fill="none">
                <path d="M21 1L1 21M1 1L21 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </span></div>); 
                        
            })
        }

        return fileNameDisplayUi;
    }

    render() {
        const { type,fileUpload,fileNameDisplay,parentClassName,labelClassName,errorClassName,errorLabel, labelName } = this.props;
        return (  
            <div>  
                <div className={parentClassName}>
                    <label className={labelClassName}>
                        <span >{labelName}</span>
                        <input onChange={fileUpload} type={type} />
                    </label>

                    {this.fileNameDisplayUi()}
                    
                </div>
                <div className="clearfix"></div>
                <div className={errorClassName}>{errorLabel}</div>

            </div>
        );
    }
}

FileUpload.propTypes = {
    type:PropTypes.string,
	fileUpload:PropTypes.func,
	fileNameDisplay:PropTypes.array,
	parentClassName:PropTypes.string,
	labelClassName:PropTypes.string,
	errorClassName:PropTypes.string,
	errorLabel:PropTypes.string,
}

FileUpload.defaultProps = {
    fileIds:[],
    index:"",
    type: "file",
    parentClassName: "file_name_property",
    errorClassName: "col-md-12 errorClass file_error_text",
    errorLabel: "",
    labelClassName: "custom-file-upload",
    fileNameDisplay:[],
    fileLinkDisplay:[],
    comment_title_ClassName:"",
    CommentAndAttachmentTitle:"",
    comment_label_ClassName:"",
    CommentTitle:"",
    CommentInputParentDivClassName:"",
    CommentInputUi:[],
    uploadeFileTitle:"",
    uploadeFileTitleh6ClassName : "",
    labelName : "Choose file",
}

const mapStateToProps = (globalState) => {
	return {
		userCredentials: globalState.LoginReducer.userCredentials
	};
}

export default withRouter(connect(mapStateToProps, { loaderStateTrue, loaderStateFalse, setToken, setUserCredentials, logOutApp })(FileUpload));
