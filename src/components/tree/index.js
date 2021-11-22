import React, { Component } from "react";
import InputPanel from "../input-panel";
import Icons from "../icons";

import "./tree.scss";

class Tree extends Component {
  state = {
    opened: [],
    added: "",
    edited: "",
  };

  onOpen = (item) => {
    this.setState(({ opened }) => {
      if (opened.indexOf(item) === -1) {
        let newArr = opened.map((el) => el);
        newArr.push(item);
        return { opened: newArr };
      } else {
        return { opened: opened.filter((el) => el !== item) };
      }
    });
  };

  onAddInput = (added) => {
    if (this.state.added !== added) {
      this.setState({ added });
    } else {
      this.setState(() => {
        return { added: "" };
      });
    }
  };

  onAddItem = (trim, itemId) => {
    this.onAddInput("");
    if (this.state.opened.indexOf(itemId) === -1) {
      this.onOpen(itemId);
    }
    this.props.onAddItem(trim, itemId);
  };

  onEdit = (edited) => {
    if (this.state.edited !== edited) {
      this.setState(() => {
        return { edited: edited, added: "" };
      });
    } else {
      this.setState(() => {
        return { edited: "", added: "" };
      });
    }
  };

  getPath = (itemId) => {
    const data = this.props.data;

    const findPath = (obj, itemId, currentPath) => {
      obj.forEach((a) => {
        if (a.id === itemId) {
          console.log(currentPath + a.name);
        } else if (a.children) {
          let nextCurrentPath = currentPath + a.name + "/";
          findPath(a.children, itemId, nextCurrentPath);
        }
      });
    };
    findPath(data, itemId, "");
  };

  render() {
    const { opened, added, edited } = this.state;
    const { data, onDelete } = this.props;
    let tree = null;

    if (data !== null) {
      tree = data.map((item) => {
        const createList = (item) => {
          const editedClass =
            item.id === edited ? "actions-edit active" : "actions-edit";

          const actions = (
            <div className="actions">
              <div className={editedClass} onClick={() => this.onEdit(item.id)}>
                ...
              </div>
              <div
                className="actions-item"
                onClick={() => this.onAddInput(item.id)}
              >
                <Icons name="create" />
              </div>
              <div className="actions-item" onClick={() => onDelete(item.id)}>
                <Icons name={"trash"} />
              </div>
              <div
                className="actions-item"
                onClick={() => this.getPath(item.id)}
              >
                Path
              </div>
            </div>
          );

          const inputPanel = (
            <InputPanel
              added={added}
              itemId={item.id}
              onAddItem={this.onAddItem}
            />
          );

          if (item.children) {
            let openedClass =
              opened.indexOf(item.id) !== -1
                ? "item group opened"
                : "item group";
            return (
              <ul key={item.id}>
                <li className={openedClass} key={item.name}>
                  <div
                    className="item-name"
                    onClick={() => this.onOpen(item.id)}
                  >
                    {item.name}
                  </div>
                  {actions}
                </li>
                {inputPanel}
                <ul key={item.id}>
                  {item.children.map((item) => {
                    return createList(item);
                  })}
                </ul>
              </ul>
            );
          } else {
            return (
              <ul key={item.id}>
                <li
                  className="item"
                  onClick={() => this.onOpen(item.name)}
                  key={item.name}
                >
                  <div className="item-name">{item.name}</div>
                  {actions}
                </li>
                {inputPanel}
              </ul>
            );
          }
        };
        return createList(item);
      });
    }

    return (
      <div className="tree">
        <div className="tree-container container">
          <div className="actions-item" onClick={() => this.onAddInput("root")}>
            <Icons name={"create"} />
          </div>
          <InputPanel
            added={added}
            itemId={"root"}
            onAddItem={this.onAddItem}
          />
          {tree}
        </div>
      </div>
    );
  }
}

export default Tree;
