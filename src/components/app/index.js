import React, { Component } from "react";
import { removeObject, appendProps, returnFound } from "find-and";
import Tree from "../tree";
import TreeService from "../../services/tree-service";
import Spinner from "../spinner";

import "./app.scss";

class App extends Component {
  state = {
    data: null,
    loading: true,
  };

  treeService = new TreeService();

  componentDidMount() {
    this.treeService
      .getData()
      .then((data) => {
        this.setState(() => {
          return { data: data, loading: false };
        });
      })
      .catch((error) => console.error(error));
  }

  onDelete = (id) => {
    this.setState(({ data }) => {
      let newArr = removeObject(data, { id: id });
      return { data: newArr };
    });
  };

  onAddItem = (trim, itemId) => {
    this.setState(({ data }) => {
      const currentItem = returnFound(data, { id: itemId });
      let newArr;

      if (itemId === "root") {
        newArr = data.concat([
          { id: trim + Math.floor(Math.random() * 1000), name: trim },
        ]);
      } else if (currentItem.children) {
        let children = currentItem.children;
        children.push({
          id: trim + Math.floor(Math.random() * 1000),
          name: trim,
        });
        newArr = appendProps(data, { id: itemId }, { children });
      } else {
        newArr = appendProps(
          data,
          { id: itemId },
          {
            children: [
              { id: trim + Math.floor(Math.random() * 1000), name: trim },
            ],
          }
        );
      }

      return { data: newArr };
    });
  };

  render() {
    const { data, loading } = this.state;
    const content = loading ? (
      <Spinner />
    ) : (
      <Tree data={data} onDelete={this.onDelete} onAddItem={this.onAddItem} />
    );
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default App;
