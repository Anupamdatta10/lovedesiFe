import React from "react";
import { connect } from 'react-redux';

const DefaultLayout = (props) => {
  //console.log("props===", props)
  return (
    <>
      <div>{props.children}</div>
    </>
  );

}
const mapStateToProps = (globalState) => {
  return {
    leftbar: globalState.mainReducerData.leftbar
  };
}

export default connect(mapStateToProps)(DefaultLayout);
