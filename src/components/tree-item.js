import React from "react";
import { Cascade, TreeItem, TreeWraper } from "./cascade-tree";
import {
  addPin,
  updateTab,
  addContent,
  addColorPin,
} from "../store/slices/tabs";
import colors from "../utils/colors";
import getRandomInt from "../utils/random-number";

class TreeItemComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      tabOne: false,
    };
    this.whenOpen = (key, value) => {
      this.setState({
        [key]: value,
      });
    };
    this.whenPin = (event, value) => {
      event.stopPropagation();
      this.props.dispatch(addPin(value));
    };
    this.whenColorPin = (event, value) => {
      event.stopPropagation();
      this.props.dispatch(addColorPin(value));
    };
  }

  render() {
    return (
      <>
        <TreeItem>
          <Cascade
            checked={this.state.tabOne}
            onClick={() => this.whenOpen("tabOne", !this.state.tabOne)}
          >
            {this.props.label}
          </Cascade>
          <TreeWraper
            style={{
              maxHeight: this.state.tabOne ? "1200px" : "0px",
              overflow: "hidden",
              transition: "all 200ms ease",
            }}
          >
            {this.props.options.map((item) => {
              const active = this.props.tabs.tab === item.label;
              return (
                <TreeItem
                  onClick={() => {
                    this.props.dispatch(
                      updateTab({
                        key: "tab",
                        value: item.label,
                      })
                    );
                    this.props.dispatch(addContent(item));
                  }}
                >
                  <Cascade
                    active={active}
                    pinned={this.props.tabs.colorPin.some((v) =>
                      v?.name?.includes(item?.label)
                    )}
                    pinProps={{
                      show: active,
                      onClick: (event) => {
                        this.whenColorPin(event, {
                          name: item.label,
                          color: colors[getRandomInt(0, colors.length - 1)],
                        });
                      },
                    }}
                  >
                    {item.label}
                  </Cascade>
                </TreeItem>
              );
            })}
          </TreeWraper>
        </TreeItem>
      </>
    );
  }
}

export default TreeItemComponent;
