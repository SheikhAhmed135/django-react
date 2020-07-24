import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as actions from "../store/actions/auth";

class LoginForm extends React.Component {
    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        const onFinish = (values) => {
            this.props.onAuth(values.username, values.password);
            this.props.history.push("/");
        };

        return (
            <div>
                {errorMessage}
                {this.props.loading ? (
                    <Spin />
                ) : (
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: "10px" }}
                            >
                                Login
                            </Button>
                            Or
                            <NavLink
                                style={{ marginRight: "10px" }}
                                to="/signup/"
                            >
                                {" "}
                                Signup
                            </NavLink>
                        </Form.Item>
                    </Form>
                )}
            </div>
        );
    }
}

const WrappedLoginForm = LoginForm;

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapsDispatchToProps = (dispatchEvent) => {
    return {
        onAuth: (username, password) =>
            dispatchEvent(actions.authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapsDispatchToProps)(WrappedLoginForm);
