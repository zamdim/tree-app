import React, { useState } from "react";
import InputPanel from "../input-panel";
import Icons from "../icons";

import "./tree.scss";
import { TreeArr, TreeNode } from "../../types-common";

interface TreeProps {
  onAddItem: (trim: string, itemId: string) => void;
  data: TreeArr | null;
  onDelete: (id: string) => void;
}

export default function Tree({
  onAddItem,
  data,
  onDelete,
}: TreeProps): JSX.Element {
  const [opened, setOpened] = useState<string[]>([]);
  const [added, setAdded] = useState<string>("");
  const [edited, setEdited] = useState<string>("");

  const onOpen = (item: string): void => {
    setOpened((prevOpened) => {
      if (prevOpened.indexOf(item) === -1) {
        return [...prevOpened, item];
      } else {
        return prevOpened.filter((el) => el !== item);
      }
    });
  };

  const onAddInput = (added: string): void => {
    setAdded((prevAdded) => {
      return prevAdded !== added ? added : "";
    });
  };

  const onAddItemTree = (trim: string, itemId: string): void => {
    onAddInput("");
    if (opened.indexOf(itemId) === -1) {
      onOpen(itemId);
    }
    onAddItem(trim, itemId);
  };

  const onEdit = (edited: string): void => {
    setEdited((prevEdited) => {
      return edited !== prevEdited ? edited : "";
    });
    setAdded("");
  };

  const getPath = (itemId: string): void => {
    const findPath = (
      arr: TreeArr,
      itemId: string,
      currentPath: string
    ): void => {
      arr.forEach((a) => {
        if (a.id === itemId) {
          console.log(currentPath + a.name);
        } else if (a.children) {
          let nextCurrentPath = currentPath + a.name + "/";
          findPath(a.children, itemId, nextCurrentPath);
        }
      });
    };

    data && findPath(data, itemId, "");
  };

  let tree = null;

  if (data !== null) {
    tree = data.map((item) => {
      const createList = (item: TreeNode): React.ReactNode => {
        const editedClass =
          item.id === edited ? "actions-edit active" : "actions-edit";

        const actions = (
          <div className="actions">
            <div className={editedClass} onClick={() => onEdit(item.id)}>
              ...
            </div>
            <div className="actions-item" onClick={() => onAddInput(item.id)}>
              <Icons name="create" />
            </div>
            <div className="actions-item" onClick={() => onDelete(item.id)}>
              <Icons name={"trash"} />
            </div>
            <div className="actions-item" onClick={() => getPath(item.id)}>
              Path
            </div>
          </div>
        );

        const inputPanel: JSX.Element = (
          <InputPanel
            added={added}
            itemId={item.id}
            onAddItemTree={onAddItemTree}
          />
        );

        if (item.children) {
          let openedClass =
            opened.indexOf(item.id) !== -1 ? "item group opened" : "item group";
          return (
            <ul key={item.id}>
              <li className={openedClass} key={item.name}>
                <div className="item-name" onClick={() => onOpen(item.id)}>
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
                onClick={() => onOpen(item.name)}
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
        <div className="actions-item" onClick={() => onAddInput("root")}>
          <Icons name={"create"} />
        </div>
        <InputPanel
          added={added}
          itemId={"root"}
          onAddItemTree={onAddItemTree}
        />
        {tree}
      </div>
    </div>
  );
}
