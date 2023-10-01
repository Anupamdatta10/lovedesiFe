import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import Utility from './../Utility';

class PopoverStickOnHover extends Component {
  state = {
    destroyTooltipOnHide: false,
    trigger: {
      hover: 1,
    }
  };

  render() {
    const { data, placement } = this.props
    //console.log("data----->>>", data)
    let user_first_name = data.hasOwnProperty('first_name') && data.first_name
    let user_last_name = ""
    user_last_name = data.hasOwnProperty('last_name') ? data.last_name : user_first_name.split(" ")[1]

    return (<div>
      <Tooltip
        placement={placement}
        mouseEnterDelay={0}
        mouseLeaveDelay={0.1}
        destroyTooltipOnHide={this.state.destroyTooltipOnHide}
        trigger={Object.keys(this.state.trigger)}
        overlay={<div className="empDetailsShow">
          <div className="cardviewboxinner">
            <div className="cardviewboxleftpanel">
              {typeof data.profile_img_temp === 'object' && data.profile_img_temp !== null ?
                <div className="userPopupRowIcon">{`${user_first_name.charAt(0)}${user_last_name.charAt(0)}`}</div> :
                <div className="userPopupRow"><img src={data.profile_img_temp} /></div>
              }
            </div>
            <div className="cardviewboxrightpanel">
              {/* <div className="userPopupRow usernamelabel">{`${data.first_name} ${data.last_name}`}</div> */}
              <div className="userPopupRow usernamelabel">{Utility.displayNameFormat(data.first_name, data.last_name)}</div>
              <div className="userPopupRow">{data.email}</div>
              <div className="userPopupRow">{data.contact_number}</div>
              {/* <div className="userPopupRow">{`${data.function ? data.function.function_name : ""},${data.division ? data.division.div_name : ""}`}</div> */}

            </div>
          </div>
        </div>}
      >
        {data.profile_img_temp.length > 0 ?
          <div className='111'><img src={data.profile_img_temp} /></div> :
          <div className='user_name_box_start'><div className="user_name_box">{`${user_first_name.charAt(0)}${user_last_name.charAt(0)}`}</div></div>
        }
      </Tooltip>
    </div>);
  }
}

PopoverStickOnHover.defaultProps = {
  placement: 'right',
  data: {
    profile_img_temp: "",
    first_name: "",
    last_name: "",
    function: {
      function_name: ""
    },
    division: {
      div_name: ""
    },
    contact_number: ""
  }
}
export default PopoverStickOnHover;
