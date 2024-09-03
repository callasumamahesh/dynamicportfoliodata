import React, { useState } from 'react';

function ExperiencePage() {
  // State for form fields
  const [formData, setFormData] = useState({
    companyImage: '',
    companyName: '',
    companyDuration: '',
    companyDescription: '',
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes and convert image to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // Show uploading status
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          companyImage: reader.result, // Set Base64 URL
        }));
        setUploading(false); // Hide uploading status
      };

      reader.readAsDataURL(file); // Convert image to Base64 URL
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company Name is required';
    if (!formData.companyDuration) newErrors.companyDuration = 'Company Duration is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      // Submit form data
      try {
        const data = await fetch('http://localhost:5000/experiences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const res = await data.json()
          alert(res.message)
        // Reset form
        setFormData({
          companyImage: '',
          companyName: '',
          companyDuration: '',
          companyDescription: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>Experience Details</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='companyImage'>Upload Company Image: </label>
          <input
            type='file'
            id='companyImage'
            name='companyImage'
            accept='image/*'
            onChange={handleFileChange}
            style={{ width: '200px' }}
            disabled={uploading} // Disable input while uploading
          />
          {uploading && <p>Uploading...</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='companyName'>Company Name: </label>
          <input
            type='text'
            id='companyName'
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            placeholder='Company Name'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.companyName && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.companyName}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='companyDuration'>Company Duration: </label>
          <input
            type='text'
            id='companyDuration'
            name='companyDuration'
            value={formData.companyDuration}
            onChange={handleChange}
            placeholder='Company Duration'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.companyDuration && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.companyDuration}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='companyDescription'>Company Description: </label>
          <textarea
            id='companyDescription'
            name='companyDescription'
            value={formData.companyDescription}
            onChange={handleChange}
            placeholder='Company Description'
            style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '100px', resize: 'vertical' }}
          />
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default ExperiencePage;
