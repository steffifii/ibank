import React, { useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";

const NewBookModal = ({ isNewBookMode, setIsNewBookMode, API_ENDPOINT }) => {

    const handleAddBook = e => {
        e.preventDefault();
        const newBook = {
            title: e.target.title.value,
            author: e.target.author.value,
            genre: e.target.genre.value,
            subject: e.target.subject.value,
            language: e.target.language.value,
            publicationDate: e.target.publicationDate.value,
            imageName: e.target.imageName.value
        }
        axios({
            method: "post",
            url: `${API_ENDPOINT}/transactions/create`,
            data: newBook
        })
            .then(res => {
                console.log(`Book with name ${newBook.title} created successfully. `, res);
                setIsNewBookMode(!isNewBookMode);
            })
            .catch(err => console.error(`Error creating book with name ${newBook.title}: `, err));
    }

    useEffect(() => {
        ReactModal.setAppElement("#root");
    }, []);

    return(
    <ReactModal isOpen={isNewBookMode} closeTimeoutMS={200}>
        <i className="fa-solid fa-xmark position-absolute end-0 pe-3" onClick={()=>setIsNewBookMode(false)} style={{ cursor: 'pointer' }}></i>
        <h4 className="position-absolute start-50 translate-middle-x">Create Book</h4>
        <div className="">
            <form className="text-center w-100" onSubmit={e=>handleAddBook(e)}>
                <div className="row py-0 pt-5 mt-4 mx-sm-5 px-sm-5">
                    <div className="col-sm-6">
                        <p>
                            <label htmlFor="create-title-input">Title: </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="create-title-input" name="title" maxLength="255" required/>
                        </p>
                        <p>
                            <label htmlFor="create-author-input">Author: </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="create-author-input" name="author" maxLength="100" required/>
                        </p>
                        <p>
                            <label htmlFor="create-genre-input">Genre: </label> <br />
                            <select id="create-genre-input" name="genre" className="rounded-4 ps-sm-2" required>
                            <option className="text-center text-md-start" value="" disabled selected hidden></option>
                            <option className="text-center text-md-start" value="Non-fiction">Non-fiction</option>
                            <option className="text-center text-md-start" value="Fiction">Fiction</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="create-subject-input">Subject: </label> <br />
                            <select id="create-subject-input" name="subject" className="rounded-4 ps-sm-2" required>
                            <option className="text-center text-md-start" value="" disabled selected hidden></option>
                            { ["Literature", "Science", "History", "Art", "Technology", "Mathematics", "Philosophy", "Psychology", "Business", "Health", "Self-help", "Poetry", "Thriller", "Romance", "Horror", "Mystery", "Fantasy"].map( (sj,k) => <option key={k} className="text-center text-md-start" value={sj}>{sj}</option>) }
                            </select>
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <p>
                            <label htmlFor="create-language-input">Language: </label> <br />
                            <select id="create-language-input" name="language" className="rounded-4 ps-sm-2" required>
                            <option className="text-center text-md-start" value="" disabled selected hidden></option>
                            { ["English", "Chinese", "Tamil", "Malay", "Others"].map( (lg,l) => <option key={l} className="text-center text-md-start" value={lg}>{lg}</option>) }
                            </select>
                        </p>
                        <p>
                            <label htmlFor="create-publication-date-input">Publication Date: </label> <br />
                            <input type="date" className="text-center text-md-start ps-sm-2 rounded-4" id="create-publication-date-input" name="publicationDate"required/>
                        </p>
                        <p>
                            <label htmlFor="create-image-path-input">Image path: </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="create-image-path-input" name="imageName" maxLength="255" required/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-success rounded-5 mt-4" type="submit"><i className="fa-solid fa-check"></i></button>
            </form>
        </div>
    </ReactModal>
    )
}

export default NewBookModal;