import React from "react";

class UnknownEndpoint extends React.Component {

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { setData } = this.props;
      const r1 = await fetch("http://localhost:3030/api/unknown", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      console.log('r1', r1);
      console.log('headers', r1.headers);
      console.log('status', r1.status);
      console.log('statusText', r1.statusText)
      console.log('url', r1.url);
      
      
      
      
      if (!r1.ok) {
        throw new Error(`HTTP error, status = ${r1.status}`);
      }
      const r2 = await r1.json();
      setData(r2);
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Unknown Endpoint" />
      </form>
    );
  }
}

export default UnknownEndpoint
