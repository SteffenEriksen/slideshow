import React from "react";

import "./display.css";

const magicKeyword = "delete";

export default function ConfirmationModal(props) {
  const [keyword, setKeyword] = React.useState("");
  const [error, setError] = React.useState("");
  const [canSubmit, setCanSubmit] = React.useState(false);

  console.log("starting modal");

  const onSubmit = () => {
    // if (keyword === magicKeyword) {
    setKeyword("");
    setError("");
    props.confirmDelete(props.imageUrl);
    // } else {
    //   setError("keyword not correct.");
    //   setTimeout(() => setError(""), 3000);
    // }
  };

  const onChangeKeyword = e => {
    const newKeyword = e.target.value;
    const newKeywordInLower = newKeyword.toLowerCase();
    setKeyword(newKeyword);
    setCanSubmit(newKeywordInLower === magicKeyword);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close-modal" onClick={props.onClose}>
          &times;
        </span>
        <h3>Bekreft sletting</h3>
        <div style={{ padding: "20px" }}>
          <img
            src={props.imageUrl}
            alt="img"
            className="modal-image"
            // style={{ maxHeight: "200px", maxWidth: "200px" }}
          />
        </div>
        <span>Passord for sletting: </span>{" "}
        <input value={keyword} onChange={onChangeKeyword} />
        <button onClick={onSubmit} disabled={!canSubmit}>
          Slett
        </button>
        {error && (
          <div style={{ padding: "20px" }}>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
