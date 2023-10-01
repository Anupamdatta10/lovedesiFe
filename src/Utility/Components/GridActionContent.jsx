import React, { Component } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class GridActionContent extends Component {
    render() {
        const { t, styleWidth, styleHight, gridObjData, editButtonShow, deleteButtonShow } = this.props;
        return (
            <div className="actionableInnerBox" style={{ position: 'absolute', left: `${styleWidth}`, top: `${styleHight}` }} ref={this.props.codeOutsideClickRef}>
                <div className="actionableBtnCenter">
                    {editButtonShow ? <div className="actionableRow">
                        <button className="actionableIcon" onClick={() => { this.props.modefier(gridObjData, "") }}><span><i className="fa fa-pencil" ></i></span> Edit</button>
                    </div> : null}
                    {deleteButtonShow ? <div className="actionableRow">
                        <button className="actionableIcon" onClick={this.props.delete.bind(this, gridObjData)}><span><i className="fa fa-trash-o"></i></span> Delete</button>
                    </div> : null}
                </div>
            </div>
        );
    }
}
GridActionContent.defaultProps = {
    editButtonShow: true,
    deleteButtonShow: true,
}
const mapStateToProps = (globalState) => {
    return {

    };
}

export default withRouter(connect(mapStateToProps, {})
    (withTranslation()(GridActionContent)));