//react
import React from "react";
import QueueAnim from "rc-queue-anim";
import history from "../../router/history";
import config from "../../utils/config";
//redux
import { connect } from "react-redux";
import { signIn, currentUser } from "../../actions/Auth";
//ant
import { Button, Icon, Form, Input, Layout } from "antd";
//image
import logo from "./lg.jpg";
import des from "./des1.png";
//css
import styles from "./index.module.less";

const { Footer } = Layout;

const FormItem = Form.Item;

class Login extends React.Component {
  state = { loading: false };

  componentDidMount() {
    if (this.props.isSignedIn) {
      history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .signIn(values)
          .then(aa => {
            this.props.currentUser();
          })
          .catch(e => console.log(e));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isloaded } = this.props;
    return (
      <React.Fragment>
        <div className={styles.loginContainer}>
          <div className={styles.form}>
            <QueueAnim delay={200} type="top">
              <div className={styles.logo} key="1">
                <img alt="logo" src={logo} />
              </div>
              {/* <div className={styles.textdes} key="2">
                <span>Property Management System</span>
              </div> */}
            </QueueAnim>
            <div className={styles.formContainer}>
              <div className={styles.formLeft}>
                <div className={styles.des} key="1">
                  <img alt="logo" src={des} />
                </div>
              </div>
              <div className={styles.formRight}>
                <h2 style={{marginBottom: '10px'}}>Employee Login</h2>
                <form layout="vertical" onSubmit={this.handleSubmit}>
                  <QueueAnim delay={200} type="top">
                    <FormItem key="1">
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            type: "email",
                            message: "The input is not valid E-mail!"
                          },
                          {
                            required: true,
                            message: "Required username"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="mail"
                              style={{ color: "rgba(0,0,0,.25)" }}
                              theme="filled"
                            />
                          }
                          placeholder="User Name"
                        />
                      )}
                    </FormItem>
                    <FormItem key="2">
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Required password"
                          }
                        ]
                      })(
                        <Input.Password
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                              theme="filled"
                            />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      )}
                    </FormItem>
                    <FormItem key="3">
                      <Button
                        style={{
                          backgroundColor: "#757de8",
                          color: "white",
                          height: "45px",
                          borderRadius: "10px"
                        }}
                        htmlType="submit"
                        size="default"
                        loading={isloaded}
                      >
                        Login
                      </Button>
                    </FormItem>
                  </QueueAnim>
                </form>
              </div>
            </div>
          </div>
          {/* <div className={styles.footer}>
            <Footer style={{ textAlign: "center", background: "#fff" }}>
              {config.footerText}
            </Footer>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    lang: state.locale.lang,
    isSignedIn: state.auth.isSignedIn,
    roleid: state.auth.roleid,
    isloaded: state.loading.isloaded
  };
}
export default connect(
  mapStateToProps,
  { signIn, currentUser }
)(Form.create()(Login));
