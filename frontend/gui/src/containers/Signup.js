import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

const Signup = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        this.props.onAuth(values.userName, values.email, values.password, values.confirm);
        this.props.history.push("/");
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="E-mail"
                />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                >
                    Signup
                </Button>
                Or
                <NavLink style={{ marginRight: "10px" }} to="/login/">
                    {" "}
                    Login
                </NavLink>
            </Form.Item>
        </Form>
    );
};

const WrappedSignupForm = Signup;

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapsDispatchToProps = (dispatchEvent) => {
    return {
        onAuth: (username, email, password1, password2) =>
            dispatchEvent(actions.authSignup(username, email, password1, password2)),
    };
};

export default connect(
    mapStateToProps,
    mapsDispatchToProps
)(WrappedSignupForm);
