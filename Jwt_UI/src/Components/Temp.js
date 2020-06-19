import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import LoginBox from "./LoginBox";
import DataBox from "./DataBox";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default class Temp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      token: null,
      items: [],
    };

    this.Login = this.Login.bind(this);
  }

  authError = () => {
    console.log("dwdwd");

    store.addNotification({
      title: "Fail",
      insert: "top",
      message: "Authentication Error",
      type: "danger", // 'default', 'success', 'info', 'warning'
      container: "top-center", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      CustomContent: "",
      slidingEnter: {
        duration: 300,
        timingFunction: "ease-out",
        delay: 0,
      },
      slidingExit: {
        duration: 1000,
        timingFunction: "ease-out",
        delay: 0,
      },
      dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover: true,
      },
      touchSlidingExit: {
        swipe: {
          duration: 400,
          timingFunction: "ease-out",
          delay: 0,
        },
        fade: {
          duration: 400,
          timingFunction: "ease-out",
          delay: 0,
        },
      },
    });
  };

  authSuccess = () => {
    store.addNotification({
      title: "Success",
      insert: "top",
      message: "Login Successed",
      type: "success", // 'default', 'success', 'info', 'warning'
      container: "top-center", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      CustomContent: "",
      slidingEnter: {
        duration: 300,
        timingFunction: "ease-out",
        delay: 0,
      },
      slidingExit: {
        duration: 1000,
        timingFunction: "ease-out",
        delay: 0,
      },
      dismiss: {
        duration: 3000,
        onScreen: true,
        pauseOnHover: true,
      },
    });
  };

  async Login(user) {
    let url = "http://localhost:50462/Login";

    let settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers":
          "origin, content-type, accept, authorization",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, settings);

    if (response.status === 200) {
      let data = await response.json();
      let token = data.token;

      this.setState({
        token,
      });
      this.authSuccess();
    } else {
      let token = null;

      this.setState({
        token,
      });
      this.authError();
    }
  }

  render() {
    return (
      <>
        <ReactNotification />
        <div className="App">
          <Grid container>
            <Grid item sm>
              <Paper style={{ padding: 20, margin: "20px 20px" }}>
                <Typography variant="h4" style={{ textAlign: "center" }}>
                  Data
                </Typography>

                <DataBox token={this.state.token} authError={this.authError} />
              </Paper>
            </Grid>
            <Grid item sm>
              <Paper style={{ padding: 20, margin: "20px 20px" }}>
                <Typography variant="h4" style={{ textAlign: "center" }}>
                  Login Form
                </Typography>
                <LoginBox Login={this.Login} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
