import React from "react";

import "./display.css";

const magicKeyword = "delete";

interface Props {
  imageUrl: string;
  confirmDelete: (imgUrl: string) => void;
  onClose: () => void;
}

export default function ConfirmationModal(props: Props) {
  const [keyword, setKeyword] = React.useState("");
  const [error, setError] = React.useState("");
  const [canSubmit, setCanSubmit] = React.useState(false);

  console.log("starting modal");

  const onSubmit = () => {
    setKeyword("");
    setError("");
    props.confirmDelete(props.imageUrl);
  };

  const onChangeKeyword = (e: any) => {
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
          <img src={props.imageUrl} alt="img" className="modal-image" />
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
