import React, { Fragment, useState, useEffect } from "react";
import "./ToolBar.css";

const ToolBar: React.FC<any> = () => {
  const dragging = (e: React.DragEvent) => {
    const elm = e.target as HTMLElement;
    e.dataTransfer.setData("text", elm.id);
  }

  return (
    <div className="toolbar">
      <div id="shape-circle" draggable="true" className="toolbar-item circle" onDragStart={dragging}></div>
      <div id="shape-rect" draggable="true" className="toolbar-item rect" onDragStart={dragging}></div>
    </div>
  );
};

export default ToolBar;
