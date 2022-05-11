import React from "react";

import { Card, Tabs, Select } from "antd";
import api from "../../apis";
import moment from "moment";
import { connect } from "react-redux";
import { fetchSchedules } from "../../actions/Schedule";

import DailyReportItem from "./daily-report-item";

// style
import "./index.css";

const { TabPane } = Tabs;
const Option = { Select };

class DailyReportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: ""
    };
  }

  componentDidMount() {
    this.getSchedules();
  }

  getSchedules() {
    this.props.fetchSchedules();
  }

  onJobChange = value => {
    // api
    //   .get(`schedules/schedule/${value}`)
    //   .then(response => {
    //     this.setState({
    //       job: response.data.data
    //     })
    //   })
    //   .catch(e => console.log(e));
    this.setState({
      job: value
    })
  };

  getTabs() {
    const tabs = (
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: "auto" }}>
        {[...Array(3).keys(1)].map(i => (
          <TabPane tab={`Day ${i + 1}`} key={i + 1}>
            <DailyReportItem />
          </TabPane>
        ))}
      </Tabs>
    );
    return tabs;
  }

  render() {
    const jobArray = [...this.props.schedules];
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "#ffffff", padding: "16px" }}>
          <Select
            style={{ width: "180px", marginLeft: "80%", marginTop: "16px" }}
            placeholder="Select Job"
            onChange={value => this.onJobChange(value)}
          >
            {jobArray.map(job => (
              <Option key={job.job_code}>{job.job_code}</Option>
            ))}
          </Select>

          <Card
            style={{
              marginTop: "16px",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "10px",
              width: "90%",
              borderTop: "1px solid #222222",
              borderLeft: "1px solid #222222",
              borderRight: "1px solid #222222",
              borderBottom: "1px solid #222222"
            }}
          >
            {this.getTabs()}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedules: state.schedule.list
  };
}

export default connect(
  mapStateToProps,
  { fetchSchedules }
)(DailyReportComponent);
