import React from "react";
import styles from "../styles/home.module.scss";
import { removeColorPin } from "../store/slices/tabs";
import CloseIcon from "../components/icons/CloseIcon";

class ContentBox extends React.Component {
  render() {
    return (
      <ul className={styles["content-box"]}>
        {this.props.tabs.colorPin.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                color: `#${item.color}`,
              }}
            >
              Global Commodity Price Index For {item.name} [
              {this.props.tabs.countryPin[index]?.name}
              ],{" "}
              <a
                href="/"
                style={{
                  // color: "#3F51B5",
                  fontWeight: "500",
                }}
              >
                Link to data (external)
              </a>
              <span
                className={styles["close-icon"]}
                onClick={() => this.props.dispatch(removeColorPin(item))}
              >
                <CloseIcon height={16} width={16} fill="#555" />
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ContentBox;
