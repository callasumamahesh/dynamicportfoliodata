import React, { useState } from 'react';

function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    image: '',
    resume: '',
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState({ image: false, resume: false });

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes and convert files to Base64
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    if (file) {
      setUploading((prev) => ({ ...prev, [name]: true }));
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result, // Set Base64 URL
        }));
        setUploading((prev) => ({ ...prev, [name]: false }));
      };

      reader.readAsDataURL(file); // Convert file to Base64 URL
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    // if (!formData.resume) newErrors.resume = 'Resume is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const data = await fetch('http://localhost:5000/about', {
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
          name: '',
          position: '',
          description: '',
          image: '',
          resume: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>About You</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='position'>Position: </label>
          <input
            type='text'
            id='position'
            name='position'
            value={formData.position}
            onChange={handleChange}
            placeholder='Your Position'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='description'>Description: </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '100px', resize: 'vertical' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='image'>Upload Image: </label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            disabled={uploading.image}
            style={{ width: '200px' }}
          />
          {uploading.image && <p>Uploading image...</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='resume'>Upload Resume: </label>
          <input
            type='file'
            id='resume'
            name='resume'
            accept='.pdf'
            onChange={handleFileChange}
            disabled={uploading.resume}
            style={{ width: '200px' }}
          />
          {uploading.resume && <p>Uploading resume...</p>}
          {errors.resume && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.resume}</p>}
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default AboutPage;
