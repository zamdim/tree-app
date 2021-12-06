import React, { useState } from "react";
import "./input-panel.scss";

interface InputPanelProps {
  onAddItemTree: (trim: string, itemId: string) => void;
  added: string;
  itemId: string;
}

export default function InputPanel({
  onAddItemTree,
  added,
  itemId,
}: InputPanelProps): JSX.Element {
  const [trim, setTrim] = useState<string>("");

  const onChangeTrim = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const trim = e.target.value;
    setTrim(trim);
  };

  const onAddItemInput = (trim: string, itemId: string): void => {
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
