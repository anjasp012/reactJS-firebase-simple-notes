import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    addDataToAPI,
    getDataFromAPI,
    removeDataAPI,
    updateDataAPI,
} from "../../../config/redux/action";
import "./style.css";

function Dashboard(props) {
    const userId = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
        props.getNotes(userId.id);
    }, []);

    const [notes, setNotes] = useState({
        title: "",
        content: "",
        date: "",
        noteId: "",
    });

    // console.log(notes);
    const [textButton, setTextButton] = useState("tambah");

    const getOnChange = (e, type) => {
        setNotes({
            ...notes,
            [type]: e.target.value,
        });
    };

    const handleSaveNotes = () => {
        const { title, content, noteId } = notes;
        const { saveNote, updateNotes } = props;
        const userData = JSON.parse(localStorage.getItem("userData"));
        const data = {
            userId: userData.id,
            noteId: noteId,
            title: title,
            content: content,
            date: new Date().getTime(),
        };

        if (textButton === "tambah") {
            if (data.title === "") {
                alert("isi dulu");
            } else {
                saveNote(data);
            }
        } else {
            updateNotes(data);
        }
        setNotes({
            title: "",
            content: "",
            date: "",
            noteId: "",
        });
        setTextButton("tambah");
    };

    const handleUpdateNotes = (note) => {
        setNotes({
            title: note.data.title,
            content: note.data.content,
            noteId: note.id,
        });
        setTextButton("perbaharui");
    };

    const handleCancel = () => {
        setNotes({
            title: "",
            content: "",
        });
        setTextButton("tambah");
    };

    const handleDeleteNote = (e, note) => {
        e.stopPropagation();
        const { removeNotes } = props;
        const userData = JSON.parse(localStorage.getItem("userData"));
        const data = {
            userId: userData.id,
            noteId: note.id,
        };

        removeNotes(data);
    };

    const { title, content } = notes;
    return (
        <div className="container">
            <p>Dashboard</p>
            <div className="form">
                <input
                    onChange={(e) => {
                        getOnChange(e, "title");
                    }}
                    value={title}
                    className="title"
                    type="text"
                    placeholder="title"
                />
                <textarea
                    onChange={(e) => {
                        getOnChange(e, "content");
                    }}
                    value={content}
                    placeholder="content"
                    className="content"
                    name="content"
                    cols="30"
                    rows="10"
                ></textarea>
                <div
                    className={`btn-display ${
                        textButton === "tambah"
                            ? "justify-end"
                            : "justify-between"
                    }`}
                >
                    {textButton === "tambah" ? null : (
                        <button
                            className="btn btn-cancel"
                            onClick={handleCancel}
                        >
                            Batal
                        </button>
                    )}
                    <button className="btn btn-oke" onClick={handleSaveNotes}>
                        {textButton}
                    </button>
                </div>
            </div>
            <hr />
            {props.notes.length > 0 ? (
                <div>
                    {props.notes.map((note) => {
                        return (
                            <div
                                className="notes"
                                key={note.id}
                                onClick={() => handleUpdateNotes(note)}
                            >
                                <p className="title">{note.data.title}</p>
                                <p className="date">{note.data.date}</p>
                                <p className="content">{note.data.content}</p>
                                <button
                                    className="btn-delete"
                                    onClick={(e) => handleDeleteNote(e, note)}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
    saveNote: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    removeNotes: (data) => dispatch(removeDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
