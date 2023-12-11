import React from "react";
import "./header.scss";

export default function Header() {
  return (
    <div className="headers">
      <div className="headersTitles">
        <span className="headersTitlesSm">Datamind</span>
        <span className="headersTitlesLg">Blog</span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1547841243-eacb14453cd9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="headersImg"
      />
    </div>
  );
}
