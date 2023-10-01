import React, { Component } from 'react'

export default class ExportModalContent extends Component {
    constructor(props){
        super(props);
        // console.log("====props====>>",this.props)
    }
  render() {
    return (
      <div><button onClick={(e)=>{this.props.UserExportApiCall("user")}}>user</button><button onClick={(e)=>{this.props.UserExportApiCall("medical")}}>Medical insurance</button></div>
    )
  }
}
