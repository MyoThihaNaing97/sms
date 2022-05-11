import React from "react";
import { Form, Input, Button } from "antd";
import moment from "moment";

const { TextArea } = Input;
const FormItem = Form.Item;

class DailyReportItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    };
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Date" {...formItemLayout}>
            <span style={{ color: "blue" }}>{moment().format("DD/MM/YYYY")}</span>
          </FormItem>

          <FormItem label="FUP No" {...formItemLayout}>
            {getFieldDecorator("fup_no", {
              rules: [
                {
                  required: true,
                  message: "Enter FUP No "
                }
              ]
            })(<Input style={{ width: "50%" }} placeholder="Enter FUP No" />)}
          </FormItem>

          <FormItem label="Working Hours" {...formItemLayout}>
            {getFieldDecorator("working_hr", {
              rules: [
                {
                  required: true,
                  message: "Enter FUP No "
                }
              ]
            })(
              <Input
                style={{ width: "50%" }}
                placeholder="Enter Working Hours"
              />
            )}
          </FormItem>

          <FormItem label="Description" {...formItemLayout}>
            {getFieldDecorator("description", {
              rules: [
                {
                  required: false,
                  message: "Enter Description "
                }
              ]
            })(<TextArea rows={4} cols={60} style={{ width: "50%" }} />)}
          </FormItem>

          <FormItem label="Remark" {...formItemLayout}>
            {getFieldDecorator("remark", {
              rules: [
                {
                  required: false,
                  message: "Enter FUP No "
                }
              ]
            })(<Input style={{ width: "50%" }} placeholder="Remark" />)}
          </FormItem>

          <span style={{ marginLeft: "20%" }}>
            <Button
              style={{ borderRadius: "20px", width: "90px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <span style={{marginLeft: '20px'}}/>
            <Button
              style={{
                borderRadius: "20px",
                width: "90px"
              }}
              type="add"
              htmlType="reset"
            >
              Cancel
            </Button>
          </span>
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(DailyReportItem);
