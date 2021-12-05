import React, { useState, useEffect } from "react";
import { removeObject, appendProps, returnFound } from "find-and";
import Tree from "../tree";
import TreeService from "../../services/tree-service";
import Spinner from "../spinner";

import "./app.scss";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const treeService = new TreeService();

  useEffect(() => {
    treeService
      .getData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (id) => {
    setData((prevData) => {
      let newArr = removeObject(prevData, { id: id });
      setData(newArr);
    });
  };

  const onAddItem = (trim, itemId) => {
    setData((prevData) => {
      const currentItem = returnFound(prevData, { id: itemId });
      let newArr;

      if (itemId === "root") {
        newArr = prevData.concat([
          { id: trim + Math.floor(Math.random() * 1000), name: trim },
        ]);
      } else if (currentItem.children) {
        let children = currentItem.children;
        children.push({
          id: trim + Math.floor(Math.random() * 1000),
          name: trim,
        });
        newArr = appendProps(prevData, { id: itemId }, { children });
      } else {
        newArr = appendProps(
          prevData,
          { id: itemId },
          {
            children: [
              { id: trim + Math.floor(Math.random() * 1000), name: trim },
            ],
          }
        );
      }

      return newArr;
    });
  };

  const content = loading ? (
    <Spinner />
  ) : (
    <Tree data={data} onDelete={onDelete} onAddItem={onAddItem} />
  );

  return <>{content}</>;
}
