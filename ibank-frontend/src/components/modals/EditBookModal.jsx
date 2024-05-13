import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import _ from "lodash";

const EditBookModal = ( { isEditBookMode, setIsEditBookMode, book, API_ENDPOINT } ) => {

    const [ editedBook, setEditedBook ] = useState({});
    const [ borrowerEmail, setBorrowerEmail ] = useState("");

    const handleUpdateBook = e => {
        if(!_.isEqual(book, editedBook)) {
            axios({
                method: "put",
                url: `${API_ENDPOINT}/transactions/${editedBook.bookId}`,
                data: editedBook
            })
                .then(res => console.log(`Book with title ${book.title} updated successfully. `, res.data))
                .catch(err => console.error(`Cannot update book with ID ${editedBook.bookId}: `, err));
            setIsEditBookMode(!isEditBookMode);
        }
    }
    
    const handleDeleteBook =  () => {
        axios({
            method: "delete",
            url: `${API_ENDPOINT}/transactions/delete/${book.bookId}`
        })
            .then(res => console.log(`Book with ID ${book.bookId} deleted successfully. `, res))
            .catch(err => console.error(`Error deleting book with ID ${book.bookId}: `, err));
    }

    useEffect(()=>{
        setEditedBook(book);
    },[book])
    
    return(
        <ReactModal isOpen={isEditBookMode} closeTimeoutMS={200}>
            <i className="fa-solid fa-xmark position-absolute end-0 pe-3 close-modal" onClick={()=>{setIsEditBookMode(false)}}></i>
            <h4 className="position-absolute start-50 translate-middle-x">Edit Book</h4>
            <div className="">
                <form className="text-center w-100">
                    <div className="row py-0 pt-4 mt-5 mx-sm-5 px-sm-5">
                        <div className="col-sm-6 px-5">
                            <p>
                                <label htmlFor="update-title-input">Title </label> <br />
                                <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-title-input" name="title" maxLength="255" required defaultValue={book.title} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}/>
                            </p>
                            <p>
                                <label htmlFor="update-id-input">Id </label> <br />
                                <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="update-id-input" name="bookId" disabled value={book.bookId}/>
                            </p>
                            <p>
                                <label htmlFor="update-author-input">Author </label> <br />
                                <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-author-input" name="author" maxLength="100" required defaultValue={book.author} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}/>
                            </p>
                            <p>
                                <label htmlFor="update-genre-input">Genre </label> <br />
                                <select id="update-genre-input" name="genre" className="rounded-4 ps-sm-2" required defaultValue={book.genre} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}>
                                <option className="text-center text-md-start" hidden></option>
                                <option className="text-center text-md-start" value="Non-fiction">Non-fiction</option>
                                <option className="text-center text-md-start" value="Fiction">Fiction</option>
                                </select>
                            </p>
                            { book.isAvailable ? <p>
                                <label htmlFor="update-book-user-email-input">Borrower Email </label> <br />
                                <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="update-book-user-email-input" name="borrowerEmail" maxLength="100" onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}/>
                            </p> : null}
                        </div>
                    <div className="col-sm-6 px-5">
                        <p>
                            <label htmlFor="update-subject-input">Subject </label> <br />
                            <select id="update-subject-input" name="subject" className="rounded-4 ps-sm-2" required defaultValue={book.subject} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}>
                            <option className="text-center text-md-start" value="" hidden></option>
                            { ["Literature", "Science", "History", "Art", "Technology", "Mathematics", "Philosophy", "Psychology", "Business", "Health", "Self-help", "Poetry", "Thriller", "Romance", "Horror", "Mystery", "Fantasy"].map( (sj,k) => <option key={k} className="text-center text-md-start" value={sj}>{sj}</option>) }
                            </select>
                        </p>
                        <p>
                            <label htmlFor="update-language-input">Language </label> <br />
                            <select id="update-language-input" name="language" className="rounded-4 ps-sm-2" required defaultValue={book.language} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}>
                                <option className="text-center text-md-start" hidden></option>
                                { ["English", "Chinese", "Tamil", "Malay", "Others"].map( (lg,l) => <option key={l} className="text-center text-md-start" value={lg}>{lg}</option>) }
                            </select>
                        </p>
                        <p>
                            <label htmlFor="update-image-path-input">File image name </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-image-path-input" name="imageName" maxLength="255" required defaultValue={book.imageName} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}/>
                        </p>
                        <p>
                            <label htmlFor="update-publication-date-input">Publication Date </label> <br />
                            <input type="date" className="text-center text-md-start ps-sm-2 rounded-4" id="update-publication-date-input" name="publicationDate"required defaultValue={book.publicationDate} onChange={e=>setEditedBook(prevBook=>({...prevBook, [e.target.name]:e.target.value}))}/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-success me-1 mt-4 text-white" onClick={e=>handleUpdateBook(e)}>Save</button>
                <button className="btn btn-danger mt-4" onClick={()=>handleDeleteBook()}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </form>
        </div>
    </ReactModal>
    )
}

export default EditBookModal;