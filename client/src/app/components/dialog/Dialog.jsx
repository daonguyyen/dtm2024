function Dialog({ message, onDialog }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "50px",
          borderRadius: "10px",
          gap: "25px",
        }}
      >
        <h3 stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        {/* <h1 style={{ color: "blue", fontSize: "24px" }}>{nameProduct}</h1> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onDialog(true)}
            style={{
              background: "tomato",
              color: "white",
              padding: "10px 25px",
              marginRight: "15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => onDialog(false)}
            style={{
              background: "teal",
              color: "white",
              padding: "10px 25px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
