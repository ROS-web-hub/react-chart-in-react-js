import React from "react";
class PinSelectedIcon extends React.Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        {...this.props}
      >
        <path
          d="M18 3V5H17V11L19 14V16H13V23H11V16H5V14L7 11V5H6V3H18Z"
          fill="#000"
        ></path>
      </svg>
    );
  }
}
export default PinSelectedIcon;
