import React, { useState } from 'react';

function Skills() {
  // State for form fields
  const [formData, setFormData] = useState({
    skillName: '',
    skillPercentage: '',
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!formData.skillName) newErrors.skillName = 'Skill Name is required';
    if (!formData.skillPercentage || isNaN(formData.skillPercentage) || formData.skillPercentage < 0 || formData.skillPercentage > 100) {
      newErrors.skillPercentage = 'Skill Percentage must be a number between 0 and 100';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const FetchData = async () => {
        try {
          const data = await fetch('http://localhost:5000/skills',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
          })
          const res = await data.json()
          alert(res.message)
        } catch (error) {
          console.log(error)
        }
      }
      FetchData()
      setFormData({
        skillName: '',
        skillPercentage: '',
      });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>Skills</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='skillName'>Skill Name: </label>
          <input
            type='text'
            id='skillName'
            name='skillName'
            value={formData.skillName}
            onChange={handleChange}
            placeholder='Skill Name'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.skillName && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.skillName}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='skillPercentage'>Skill Percentage: </label>
          <input
            type='number'
            id='skillPercentage'
            name='skillPercentage'
            value={formData.skillPercentage}
            onChange={handleChange}
            placeholder='Skill Percentage'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.skillPercentage && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.skillPercentage}</p>}
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default Skills;
