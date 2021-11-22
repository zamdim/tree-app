import React, { Component } from "react";

import "./input-panel.scss";

class InputPanel extends Component {
  state = {
    trim: "",
  };

  onChangeTrim = (e) => {
    let trim = e.target.value;
    this.setState({ trim });
  };

  onAddItem = (trim, itemId) => {
    this.setState(() => {
      return { trim: "" };
    });

    if (trim) {
      this.props.onAddItem(trim, itemId);
    }
  };

  render() {
    const { added, itemId } = this.props;
    const { trim } = this.state;
    const addedClass = added === itemId ? "input-panel open" : "input-panel";

    return (
      <li className={addedClass}>
        <input
          type="text"
          value={trim}
          placeholder="Add item"
          onChange={this.onChangeTrim}
        />
        <button className="btn" onClick={() => this.onAddItem(trim, itemId)}>
          Add
        </button>
      </li>
    );
  }
}

export default InputPanel;
