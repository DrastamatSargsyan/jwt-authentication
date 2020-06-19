import React, { Component } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      Username: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      Password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    let user = {
      Username: this.state.Username,
      Password: this.state.Password,
    };

    this.props.Login(user);
  };

  render() {
    return (
      <div className="LoginBox">
        <h1
          style={{
            color: "#fff",
            padding: "40px",
            fontSize: "60px",
            textAlign: "center",
          }}
        >
          Login
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="Username">
            <Form.Label style={{ color: "#fff", fontSize: "20px" }}>
              Username
            </Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter Username"
              onChange={this.onChangeUsername}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="Password">
            <Form.Label style={{ color: "#fff", fontSize: "20px" }}>
              Password
            </Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
              required
            />
          </Form.Group>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="danger" size="lg">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
