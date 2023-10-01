import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { FileDrop } from 'react-file-drop';
import ReactTooltip from 'react-tooltip';

class MultipleFileUpload extends Component {
    constructor(props) {
        super(props);

    }

    docNameUi = () => {

        const { documentObject, removeDoc } = this.props;
        let uiArry = []
        if (documentObject.length > 0) {
            documentObject.map((value, i) => {
                uiArry.push(
                    <div key={i} className="docNameUiRow">
                        {value.hasOwnProperty('file_name') ? <div className="file_name_inner_box file_name_inner_box_local" data-tip={value.hasOwnProperty('file_name') ? value.file_name : ""}><span className="file_name_length">{value.hasOwnProperty('file_name') && (value.file_name).length > 20 ? (value.file_name).substring(0, 20) + '...' : (value.file_name)}</span>
                            <span className="file_close_icon" onClick={() => { removeDoc(i) }}><svg width="10" height="10" viewBox="0 0 22 22" fill="none"><path d="M21 1L1 21M1 1L21 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></div> : ""}
                        <ReactTooltip place="bottom" />
                    </div>
                )
            })
        }
        return uiArry;

    }

    render() {
        const { t, submit, documentObjName, onChange, onDrop, documentError } = this.props;
        //console.log('documentObjName=======props==============>', documentObjName);

        return (
            <>
                <div className="modalinnerbody">
                    <div className="fileDropBox">
                        <div className="filedragdropinner">
                            <FileDrop onDrop={(files, event) => { onDrop(files, event) }}>
                                <img src={require('../../Utility/Public/images/filedownicon.png')} />
                                <p className="droplabel">{documentObjName == "Choose file" ? "Drag and drop" : documentObjName}</p>
                            </FileDrop>
                        </div>
                        <div className="docError">{documentError}</div>
                    </div>
                    <div className="fileUploadBox">
                        <div className="uploadfiledoc">
                            <label className="orlabel">or :</label>
                            <div className="file_name_property">
                                <label className="custom-file-upload">
                                    <span>
                                        {documentObjName}
                                    </span>
                                    <input type="file" onChange={onChange} />
                                </label>
                            </div>
                            <div className="uploadeddocRow">
                                {this.docNameUi()}
                            </div>
                        </div>
                    </div>

                    <div className="clearfix"></div>

                </div>
                <ReactTooltip place="bottom" />
            </>
        );
    }
}

MultipleFileUpload.defaultProps = {

}

const mapStateToProps = (globalState) => {
    return {

    };
}

// export default withRouter(connect(mapStateToProps, {})(withTranslation()(MultipleFileUpload)));
export default connect(mapStateToProps)(withRouter(MultipleFileUpload));