import React, { useState } from 'react';

function ProjectDetails() {
  // State for form fields
  const [formData, setFormData] = useState({
    projectName: '',
    projectImage: '',
    projectDescription: '',
    projectGit: '',
    projectUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

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
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          projectImage: reader.result, // Set Base64 URL
        }));
      };

      reader.readAsDataURL(file); // Convert image to Base64 URL
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = 'Project Name is required';
    if (!formData.projectGit) newErrors.projectGit = 'Project Git URL is required';
    if (!formData.projectUrl) newErrors.projectUrl = 'Project URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      // Submit form data
      try {
        const data = await fetch('http://localhost:5000/projects', {
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
          projectName: '',
          projectImage: '',
          projectDescription: '',
          projectGit: '',
          projectUrl: '',
        });
        setImageFile(null);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>Project Details</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='projectName'>Project Name: </label>
          <input
            type='text'
            id='projectName'
            name='projectName'
            value={formData.projectName}
            onChange={handleChange}
            placeholder='Project Name'
            style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.projectName && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.projectName}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='projectImage'>Upload Project Image: </label>
          <input
            type='file'
            id='projectImage'
            name='projectImage'
            accept='image/*'
            onChange={handleFileChange}
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='projectDescription'>Project Description: </label>
          <textarea
            id='projectDescription'
            name='projectDescription'
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder='Project Description'
            style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', height: '100px', resize: 'vertical' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='projectGit'>Project Git URL: </label>
          <input
            type='url'
            id='projectGit'
            name='projectGit'
            value={formData.projectGit}
            onChange={handleChange}
            placeholder='Project Git URL'
            style={{ width: '300px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.projectGit && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.projectGit}</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor='projectUrl'>Project URL: </label>
          <input
            type='url'
            id='projectUrl'
            name='projectUrl'
            value={formData.projectUrl}
            onChange={handleChange}
            placeholder='Project URL'
            style={{ width: '300px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.projectUrl && <p style={{ color: 'red', fontSize: '0.875em', marginTop: '4px' }}>{errors.projectUrl}</p>}
        </div>
        <button type='submit' style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default ProjectDetails;
