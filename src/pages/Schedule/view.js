import React from "react";
import Can from "../../utils/Can";
import PageHeaderWrapper from "../../components/PageHeaderWrapper";
import Forbidden from "../Forbidden";
import api from "apis";
import {
  Icon,
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  Input,
  Radio,
  Button
} from "antd";
import {
  fetchSchedules,
  postSchedule,
  putSchedule
} from "../../actions/Schedule";
import { putComplain, putComplainByComplainNo } from "../../actions/Complain";
import { connect } from "react-redux";
import MachineHistory from "../MachineHistory";
import AvailableServiceMan from "../ServiceMan/available-serviceman";
import moment from "moment";

import styles from "../../styles/custom.module.less";
import { amountPattern } from "../../utils/validate-pattern";
import { stat } from "fs";
import { Link } from "react-router-dom";

import iconPersonalInformation from "../../assets/img/menu/portfolio.svg";
import iconMachineHistory from "../../assets/img/menu/machine.svg";
import iconComplainInformation from "../../assets/img/menu/complain.svg";
import iconServiceManInformation from "../../assets/img/menu/couple.svg";

const FormItem = Form.Item;
const { TextArea } = Input;

// Start Date ~ End date
const { MonthPicker, RangePicker } = DatePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  };
}

function disabledRangeTime(_, type) {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56]
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56]
  };
}

class DetailSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      complain_no: this.props.match.params.complain_no,
      data: {},
      complainData: {},
      start_date: "",
      end_date: "",
      watching_list: 0,
      inspection: 0
    };
  }

  componentDidMount() {
    this.getScheduleData();
    this.getComplainData();
  }

  async getScheduleData() {
    const response = await api.get(`schedules/${this.state.id}`);
    if (response && response.status == 200) {
      this.setState({ data: response.data.data });
    }
  }

  async getComplainData() {
    const response = await api.get(
      `complains/complain/${this.state.complain_no}`
    );
    if (response && response.status == 200) {
      this.setState({
        complainData: response.data.data
      });
    }
  }

  onStartEndDateChange = (value, dateString) => {
    console.log(dateString[0]);
    console.log(dateString[1]);
    this.setState({
      start_date: dateString[0],
      end_date: dateString[1]
    });
  };

  render() {
    const { data, complainData } = this.state;
    return (
      <div>
        <Can
          role="Admin"
          perform="schedule:list"
          no={() => {
            return <Forbidden />;
          }}
        >
          <PageHeaderWrapper
            title="Accept Schedule"
            subtitle="Complain list here."
            parent="Schedule"
            child="View Schedule"
            subchild="Edit Schedule"
          />

          <Card bordered={false}>
            <span style={{ color: "#222222" }}>Complain No : </span>
            {complainData.complain_no}
            <br />
            <span style={{ color: "#222222" }}>FUP No : </span>
            {complainData.fup_no}
            <br />
            <span style={{ color: "#222222" }}>Model No : </span>
            {complainData.model_no}
          </Card>

          <Card bordered={false}>
            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconComplainInformation}
              />{" "}
              Complain Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Warranty :</h3>
                  <p style={{ color: "blue" }}>
                    {complainData.warranty_year} years
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Working Hour :</h3>
                  <p style={{ color: "blue" }}>
                    {complainData.working_hr} hours
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Title :</h3>
                  <p style={{ color: "blue" }}>{complainData.job_title}</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={12}>
                  <h3>Warranty Description :</h3>
                  <p style={{ color: "blue" }}>
                    {complainData.warranty_description}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={12}>
                  <h3>Job Description :</h3>
                  <p style={{ color: "blue" }}>{complainData.description}</p>
                </Col>
              </Row>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconPersonalInformation}
              />{" "}
              Customer Personal Information
            </h2>
            <Card bordered={true}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Name :</h3>
                  <p style={{ color: "blue" }}>{complainData.customer_name}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Customer Phone No :</h3>
                  <p style={{ color: "blue" }}>
                    {complainData.customer_phone_no}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Distance :</h3>
                  <p style={{ color: "blue" }}>{complainData.distance} miles</p>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Date :</h3>
                  <p style={{ color: "blue" }}>
                    {moment(complainData.date).format("YYYY/MM/DD")}
                  </p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Amount :</h3>
                  <p style={{ color: "blue" }}>{complainData.amount} kyat</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Location :</h3>
                  <p style={{ color: "blue" }}>{complainData.location}</p>
                </Col>
              </Row>
            </Card>
            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconMachineHistory}
              />{" "}
              Machine History Information
            </h2>
            <MachineHistory />

            <h2 style={{ textAlign: "center", color: "#0277BD" }}>
              Assign Schedule
            </h2>
            <Card bordered={true}>
              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconPersonalInformation}
                />{" "}
                Service Information
              </h3>
              <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Interval :</h3>
                    <p style={{ color: "blue" }}>{data.interval}</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Amount :</h3>
                    <p style={{ color: "blue" }}>{data.ammount} MMK</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Service Charge :</h3>
                    <p style={{ color: "blue" }}>{data.service_charge} MMK</p>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Inspection :</h3>
                    <p style={{ color: "blue" }}>{data.inspection}</p>
                  </Col>

                  <Col xs={24} sm={24} md={6} lg={6}>
                    <h3>Watching List :</h3>
                    <p style={{ color: "blue" }}>{data.watching_list}</p>
                  </Col>
                </Row>
              </div>

              <h3>
                <img
                  style={{ margin: "5px", height: 20, width: 20 }}
                  src={iconPersonalInformation}
                />{" "}
                Job Information
              </h3>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Code :</h3>
                  <p style={{ color: "blue" }}>{data.job_code}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Status :</h3>
                  <p style={{ color: "blue" }}>{data.schedule_job_status}</p>
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <h3>Job Title :</h3>
                  <p style={{ color: "blue" }}>{data.schedule_job_title}</p>
                </Col>
              </Row>
            </Card>

            <h2>
              <img
                style={{ margin: "5px", height: 20, width: 20 }}
                src={iconServiceManInformation}
              />{" "}
              Service Man Information
            </h2>
            <AvailableServiceMan showAvail={false} />
          </Card>

          <Card bordered={false}>
            <span style={{ marginLeft: "30%" }}> </span>
            <Button
              type="primary"
              style={{
                borderRadius: "20px",
                width: "150px",
                backgroundColor: "yellow",
                color: "#222222"
              }}
            >
              Payment Done
            </Button>
            <span style={{ marginLeft: "30px" }}> </span>
            <Link
              to={`/schedules/schedule/edit/${data.id}/${
                complainData.complain_no
              }`}
            >
              <Button
                type="primary"
                style={{ borderRadius: "20px", width: "150px" }}
              >
                Edit
              </Button>
            </Link>
            <span style={{ marginLeft: "30px" }}> </span>
            <Link to={`/schedule`}>
              <Button
                type="add"
                style={{ borderRadius: "20px", width: "150px" }}
              >
                Cancel
              </Button>
            </Link>
          </Card>
        </Can>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedules: state.schedule.list,
    complains: state.complain.list
  };
}

export default connect(
  mapStateToProps,
  { postSchedule, putSchedule, putComplain, putComplainByComplainNo }
)(DetailSchedule);
