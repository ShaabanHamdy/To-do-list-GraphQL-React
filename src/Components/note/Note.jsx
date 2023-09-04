import Spinner from "react-bootstrap/Spinner";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CREATE_NOTES, DELETE_NOTES, GET_NOTES } from "../GraphQl/GraphQL";
import "./note.css";
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
console.log(data);
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

          {loading ? (
            //   =============================

            // ========================================
            <div className="text-center p-5">
              <Spinner variant="primary" animation="border" role="status">
                {" "}
              </Spinner>
            </div>
          ) : (
            data?.getNotes?.length > 0 ? data?.getNotes?.map((elm, index) => (
              <div key={index} className="col-md-3 cartCol">
                <div className="cart">
                  <div className=" mb-4 text-center">
                    <span className="h2 ">{elm.title}</span>
                    <i
                      onClick={() => deleteNote(elm)}
                      className="fas fa-trash-can  text-danger float-end"
                    ></i>

                    <div className="clearfix"></div>
                  </div>
                  <div className="fs-4">{elm.description}</div>
                </div>
              </div>

            )) :
            <div className="NoteEmpty"> 
              <h2 className=" text-center ">Note Empty</h2>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
