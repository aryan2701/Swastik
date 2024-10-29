import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { addBookSet } from '../services/api';
import '../styles/BookSetForm.css';

const BookSetForm = () => {
    const [bookSet, setBookSet] = useState({
        school: '',
        className: '',
        books: [{ name: '', price: '', quantity: '' }],
        setPrice: '',
        totalQuantity: '',
    });

    const [bookSets, setBookSets] = useState([]); // Store added book sets
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    const schoolOptions = [
        { value: 'Shivalik Public', label: 'Shivalik Public' },
        { value: 'Greenwood High', label: 'Greenwood High' },
        { value: 'Delhi Public School', label: 'Delhi Public School' },
        { value: 'St. Xavier’s School', label: 'St. Xavier’s School' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message

        // Get token from local storage or any other method you are using
        const token = localStorage.getItem('token'); // Adjust as necessary

        try {
            // API call to add book set with token in headers
            const response = await addBookSet(bookSet, token);
            
            // If the response does not indicate success, throw an error
            if (!response || !response.data) {
                throw new Error("Failed to add book set.");
            }
            
            // Update bookSets state to include the new book set
            setBookSets((prevBookSets) => [...prevBookSets, bookSet]);
            
            // Open success modal
            setIsModalOpen(true);

            // Clear form fields
            setBookSet({
                school: '',
                className: '',
                books: [{ name: '', price: '', quantity: '' }],
                setPrice: '',
                totalQuantity: '',
            });
        } catch (error) {
            console.error("Error adding book set:", error);
            setErrorMessage(error.response?.data || "An error occurred while adding the book set.");
        }
    };

    const handleBookChange = (index, field, value) => {
        const updatedBooks = bookSet.books.map((book, i) =>
            i === index ? { ...book, [field]: value } : book
        );
        setBookSet({ ...bookSet, books: updatedBooks });
    };

    const addBookField = () => {
        setBookSet({
            ...bookSet,
            books: [...bookSet.books, { name: '', price: '', quantity: '' }],
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage(''); // Clear error message when closing the modal
    };

    return (
        <div className="book-set-form-container">
            <form onSubmit={handleSubmit} className="book-set-form">
                <h2>Add Book Set</h2>

                <label>School:</label>
                <Select
                    options={schoolOptions}
                    onChange={(selectedOption) => setBookSet({ ...bookSet, school: selectedOption.value })}
                    placeholder="Select or search for a school"
                    value={schoolOptions.find(option => option.value === bookSet.school) || null}
                />

                <label>Class:</label>
                <select
                    value={bookSet.className}
                    onChange={(e) => setBookSet({ ...bookSet, className: e.target.value })}
                >
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                </select>

                {bookSet.books.map((book, index) => (
                    <div key={index} className="book-fields">
                        <input
                            type="text"
                            placeholder="Book Name"
                            value={book.name}
                            onChange={(e) => handleBookChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={book.price}
                            onChange={(e) => handleBookChange(index, 'price', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={book.quantity}
                            onChange={(e) => handleBookChange(index, 'quantity', e.target.value)}
                        />
                    </div>
                ))}

                <button type="button" onClick={addBookField}>Add Another Book</button>

                <input
                    type="number"
                    placeholder="Set Price"
                    value={bookSet.setPrice}
                    onChange={(e) => setBookSet({ ...bookSet, setPrice: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Total Quantity"
                    value={bookSet.totalQuantity}
                    onChange={(e) => setBookSet({ ...bookSet, totalQuantity: e.target.value })}
                />

                <button type="submit">Add Book Set</button>
                
                {/* Display error message if there is one */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>

            {/* Modal for success message */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Book Set added successfully!</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Display the added book sets */}
            <div className="added-book-sets">
                <h3>Added Book Sets</h3>
                {bookSets.length > 0 ? (
                    <ul>
                        {bookSets.map((set, index) => (
                            <li key={index}>
                                <strong>School:</strong> {set.school}, <strong>Class:</strong> {set.className}, <strong>Set Price:</strong> {set.setPrice}, <strong>Total Quantity:</strong> {set.totalQuantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No book sets added yet.</p>
                )}
            </div>
        </div>
    );
};

export default BookSetForm;
