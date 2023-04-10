import React from "react";
import { connect } from "react-redux";
import Graph from "../components/graph";
import styles from "../styles/home.module.scss";
import CascadeTree from "../components/cascade-tree";
import { Cascade, TreeItem, TreeWraper } from "../components/cascade-tree";
import response3 from "../constant/response3.json";
import DataPayloadResponse from "../constant/DataPayloadResponse.json";
import CPINSAAll_Country from "../constant/CPINSAAll_Country.json";
import extractGroup from "../utils/extractGroup";
import extractData from "../utils/extractData";
import extractCountry from "../utils/extractCountry";
import TreeItemComponent from "../components/tree-item";
import ContentBox from "../components/content-box";
import Dropdown from "../components/dropdown";
import { addCountryPin } from "../store/slices/tabs";

const categories = [
  { value: "1", label: "Commodities" },
  { value: "2", label: "Catalog" },
  { value: "3", label: "Consumer" },
];

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      country: "USA",
      category: "Commodities",
    };
    this.updateState = (key, value) => {
      this.setState({
        [key]: value,
      });
    };
  }

  render() {
    // EXTRACT MEASURE GROUP
    const array = extractGroup(response3);
    // EXTRACT MEASURE DATA
    const lineData = extractData(DataPayloadResponse);

    const data = extractCountry(CPINSAAll_Country);

    return (
      <>
        <div className={styles.graphtab}>
          <div className={styles.tabs}>
            {this.props.tabs.colorPin.length > 0 && (
              <div className={styles["selected-chips"]}>
                <ul>
                  {this.props.tabs.colorPin.map((item, index) => {
                    return <li key={index}>{item?.name}</li>;
                  })}
                </ul>
              </div>
            )}
            <CascadeTree>
              <TreeItem>
                <Cascade>Col</Cascade>
                <TreeWraper>
                  {array.map((item, _index) => {
                    return (
                      <TreeItemComponent
                        label={item.label}
                        options={item.options}
                        tabs={this.props.tabs}
                        dispatch={this.props.dispatch}
                      />
                    );
                  })}
                </TreeWraper>
              </TreeItem>
            </CascadeTree>
          </div>
          <div className={styles.raectselectbox}>
            <div className={styles.reactgraph}>
              <ul>
                <li>
                  <Dropdown
                    onSelect={(value) =>
                      this.props.dispatch(addCountryPin(value.pinned))
                    }
                    items={data.Country.map((item, index) => {
                      return {
                        id: index,
                        name: item.DisplayName,
                      };
                    })}
                  />
                </li>
              </ul>
              {/* <ul>
                <li>
                  <select
                    defaultValue={this.state.country}
                    onChange={({ target }) =>
                      this.updateState("country", target.value)
                    }
                  >
                    {data.Country.map((item, index) => {
                      return (
                        <option key={index} value={item.DisplayName}>
                          {item.DisplayName}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li>
                  <select
                    defaultValue={this.state.category}
                    onChange={({ target }) =>
                      this.updateState("category", target.value)
                    }
                  >
                    {categories.map((item, index) => {
                      return (
                        <option key={index} value={item.label}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul> */}
              <Graph
                lineData={lineData}
                country={this.state.country}
                category={this.state.category}
              />
            </div>
            <div>
              <ContentBox
                tabs={this.props.tabs}
                dispatch={this.props.dispatch}
                country={this.state.country}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tabs: state.tabs,
});
export default connect(mapStateToProps)(App);
