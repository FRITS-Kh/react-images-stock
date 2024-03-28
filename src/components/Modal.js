function Modal({
  id,
  title,
  confirmButtonText = 'Confirm',
  confirmButtonType = 'primary',
  onConfirm,
  cancelButtonText = 'Cancel',
  children,
}) {
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {children && <div className="modal-body">{children}</div>}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {cancelButtonText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmButtonType}`}
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
