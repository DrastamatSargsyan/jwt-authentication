import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Temp from "./Temp";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      demo: false,
    };
  }

  handleDemo = () => {
    this.setState({
      demo: true,
    });
  };

  render() {
    const demo = this.state.demo;
    return (
      <>
        {!demo ? (
          <div className="HomeBox">
            <Typography
              variant="h2"
              style={{
                paddingTop: 100,
                color: "#fff",
                fontSize: "80px",
                fontFamily: "Comic Neue, cursive",
              }}
            >
              Welcome To JWT Application
            </Typography>
            <Button
              onClick={this.handleDemo}
              size="large"
              variant="contained"
              color="default"
              style={{marginTop: 100}}
            >
              TO JWT DEMONSTRATION PAGE
            </Button>
          </div>
        ) : (
          <Temp />
        )}
      </>
    );
  }
}
