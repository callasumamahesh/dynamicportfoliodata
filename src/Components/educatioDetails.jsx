import React, { useState } from 'react';

function EducationDetails() {
  // State for form fields
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionImage: '',
    institutionGrade: '',
    institutionDescription: '',
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
          institutionImage: reader.result, // Set Base64 URL
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
    if (!formData.institutionName) newErrors.institutionName = 'Institution Name is required';
    if (!formData.institutionGrade) newErrors.institutionGrade = 'Institution Grade is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      // Submit form data
      try {
        const data = await fetch('http://localhost:5000/education', {
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
          institutionName: '',
          institutionImage: '',
          institutionGrade: '',
          institutionDescription: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>Education Details</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='institutionName'>Institution Name: </label>
          <input
            type='text'
            id='institutionName'
            name='institutionName'
            value={formData.institutionName}
            onChange={handleChange}
            placeholder='Institution Name'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.institutionName && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.institutionName}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='institutionImage'>Upload Institution Image: </label>
          <input
            type='file'
            id='institutionImage'
            name='institutionImage'
            accept='image/*'
            onChange={handleFileChange}
            style={{ width: '200px' }}
            disabled={uploading} // Disable input while uploading
          />
          {uploading && <p>Uploading...</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='institutionGrade'>Institution Grade: </label>
          <input
            type='text'
            id='institutionGrade'
            name='institutionGrade'
            value={formData.institutionGrade}
            onChange={handleChange}
            placeholder='Institution Grade'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.institutionGrade && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.institutionGrade}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='institutionDescription'>Institution Description: </label>
          <textarea
            id='institutionDescription'
            name='institutionDescription'
            value={formData.institutionDescription}
            onChange={handleChange}
            placeholder='Institution Description'
            style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '100px', resize: 'vertical' }}
          />
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default EducationDetails;
