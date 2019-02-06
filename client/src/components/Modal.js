import React from "react";

function Modal(props) {
  const showHideStyle = props.show ? "block" : "none";
  return (
    <div className="modal" role="dialog" style={{ display: showHideStyle }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          <button type="button" className="close white" onClick={props.handleClose} data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body"><h5>{props.textString}</h5>
        </div>
        <div className="modal-footer">
          <button type="button" className="button grey" onClick={props.handleClose} data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
