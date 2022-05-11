import React from "react";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import Can from "../../../../src/utils/Can";
import Forbidden from "../../Forbidden";

class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Can
          role="Admin"
          perform="role:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Role"
            subtitle="You can add Module data of company by entering New Model button."
            parent="User Management"
            child="Role"
          />
        </Can>
      </React.Fragment>
    );
  }
}

export default Role;
