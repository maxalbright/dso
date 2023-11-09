import React, { useState } from 'react';

const FamilyMemberForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        deathDate: '',
        motherId: '',
        fatherId: '',
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            birthDate: '',
            deathDate: '',
            motherId: '',
            fatherId: '',
            // Reset other fields as necessary
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="birthDate">Birth Date:</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="deathDate">Death Date:</label>
                <input
                    type="date"
                    id="deathDate"
                    name="deathDate"
                    value={formData.deathDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="motherId">Mother's ID:</label>
                <input
                    type="text"
                    id="motherId"
                    name="motherId"
                    value={formData.motherId}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="fatherId">Father's ID:</label>
                <input
                    type="text"
                    id="fatherId"
                    name="fatherId"
                    value={formData.fatherId}
                    onChange={handleChange}
                />
            </div>
            {/* Add other input fields as necessary */}
            <div>
                <button type="submit">Add Family Member</button>
            </div>
        </form>
    );
};

export default FamilyMemberForm;