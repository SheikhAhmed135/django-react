import React from "react";
import { Form, Input, Button } from "antd";

import axios from "axios";

class CustomForm extends React.Component {
    handleFormSubmit = (e, requestType, articleID) => {
        const title = e.target.elements.title.value;
        const content = e.target.elements.content.value;

        switch (requestType) {
            case "post":
                return axios
                    .post("http://127.0.0.1:8000/api/", {
                        title: title,
                        content: content,
                    })
                    .then((res) => console.log(res))
                    .catch((error) => console.error(error));
            case "put":
                return axios
                    .put(`http://127.0.0.1:8000/api/${articleID}/`, {
                        title: title,
                        content: content,
                    })
                    .then((res) => console.log(res))
                    .catch((error) => console.error(error));
        }
    };

    reloadPage = () => {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <hr />
                <br/>
                <Form
                    onSubmitCapture={(event) =>
                        this.handleFormSubmit(
                            event,
                            this.props.requestType,
                            this.props.articleID
                        )
                    }
                >
                    <Form.Item label="Title">
                        <Input
                            name="title"
                            placeholder="Input your Title here ..."
                        />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input
                            name="content"
                            placeholder="Input your Content here ..."
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.reloadPage}>
                        {this.props.btnText}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CustomForm;
