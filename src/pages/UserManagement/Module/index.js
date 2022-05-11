import React from "react";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";

class Module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="module:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Module"
            subtitle="You can add Module data of company by entering New Model button."
            parent="User Management"
            child="Module"
          />
        </Can>
      </React.Fragment>
    );
  }
}

export default Module;
