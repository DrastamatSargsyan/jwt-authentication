import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";

export default class DataBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authError: false,
      items: [],
    };
    this.getData = this.getData.bind(this);
  }

  async getData() {
    let token = this.props.token;

    let url = "http://localhost:50462/Value";

    let settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, settings);

    if (response.status !== 401) {
      const data = await response.json();

      this.setState({
        items: data,
        authError: false,
      });
    } else {
      this.setState({
        items: [],
        authError: false,
      });
      this.props.authError();

    }

    console.log(this.state.items);
  }

  render() {
    return (
      <>
        <div className="DataBox">
          <Typography variant="h5" color="error" style={{ marginBottom: 40 }}>
            You can get data, only if you are authorized
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.getData}>
            GetData
          </Button>
          <ul style={{ color: "#fff", marginTop: "40px" }}>
            {this.state.items.map((item) => (
              <li key={item.name}>{item}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
