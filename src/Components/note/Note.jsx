import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CREATE_NOTES, DELETE_NOTES, GET_NOTES } from "../GraphQl/GraphQL";

const Note = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   ======================================
  //  ============================================================================
  const { data, loading } = useQuery(GET_NOTES);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const handelChange = ({ target }) => {
    setNote({ ...note, [target.name]: target.value });
  };
  // ==================================================================================
  let [create_note] = useMutation(CREATE_NOTES);
  let [delete_note] = useMutation(DELETE_NOTES);

  const sendData = () => {
    create_note({
      variables: { ...note },
      refetchQueries: [{ query: GET_NOTES }],
    });
  };
  // ============================================
  const deleteNote = ({ id }) => {
    delete_note({ variables: { id }, refetchQueries: [{ query: GET_NOTES }] });
  };
  // ============================================

  // =============================
  return (
    <>
      <div className="container">
        <div className="row gy-5">
          <div className="col-md-12">
            <button
              className="btn  float-end"
              onCanPlayCapture={setNote}
              onClick={handleShow}
            >
              Add Note
            </button>
            <div className="clearfix"></div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <h3>Note</h3>
              </Modal.Header>
              <div className=" p-2">
                <input
                  onChange={handelChange}
                  className="form-control my-2"
                  type="text"
                  name="title"
                  placeholder="title"
                />
                <div>
                  <textarea
                    onChange={handelChange}
                    name="description"
                    className="form-control"
                    placeholder="description"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div className="m-3">
                <button
                  className="btn float-end"
                  onClick={sendData}
                  onClickCapture={handleClose}
                >
                  Add
                </button>
                <button
                  className="btn btnClose float-end mx-3"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
              <div className="clearfix"></div>
            </Modal>
          </div>

          {!loading ? (
            //   =============================
            data.getNotes?.map((elm, index) => (
              <div key={index} className="col-md-3">
                <div className=" p-2 border border-1">
                  <div className=" text-center my-3">
                    {elm.title}
                    <i
                      onClick={() => deleteNote(elm)}
                      className="fas fa-trash-can text-danger float-end"
                    ></i>
                  </div>
                  <div className="clearfix"></div>

                  <div className="">{elm.description}</div>
                </div>
              </div>
            ))
          ) : (
            // ========================================
            <p>Loading............</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
