import React, { useState } from "react";

import "./input-panel.scss";

export default function InputPanel({ onAddItemTree, added, itemId }) {
  const [trim, setTrim] = useState("");

  const onChangeTrim = (e) => {
    const trim = e.target.value;
    setTrim(trim);
  };

  const onAddItemInput = (trim, itemId) => {
    setTrim("");

    if (trim.trim()) {
      onAddItemTree(trim, itemId);
    }
  };

  const addedClass = added === itemId ? "input-panel open" : "input-panel";

  return (
    <li className={addedClass}>
      <input
        type="text"
        value={trim}
        placeholder="Add item"
        onChange={onChangeTrim}
      />
      <button className="btn" onClick={() => onAddItemInput(trim, itemId)}>
        Add
      </button>
    </li>
  );
}
