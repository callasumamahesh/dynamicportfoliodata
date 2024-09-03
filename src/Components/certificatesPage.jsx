import React, { useState } from 'react';

function CertificatesPage() {
  const [formData, setFormData] = useState({
    certificateName: '',
    certificateURL: null, // Base64 URL
  });

  const [uploading, setUploading] = useState(false);

  const handleTextChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      certificateName: event.target.value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // Show uploading status
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          certificateURL: reader.result, // Set Base64 URL
        }));
        setUploading(false); // Hide uploading status
      };

      reader.onerror = () => {
        console.error('Error reading file');
        setUploading(false); // Hide uploading status on error
      };

      reader.readAsDataURL(file); // Convert file to Base64 URL
    } else {
      setFormData((prevState) => ({
        ...prevState,
        file: null,
        certificateURL: null,
      }));
    }
  };

  const handleSubmit = (event) => {
    console.log(formData)
    event.preventDefault();
    const fetchData = async () => {
        try {
            const data = await fetch('http://localhost:5000/certificates',{
                method:'POST',
                headers:{
                    'Content-Type':'Application/JSON'
                },
                body: JSON.stringify(formData)
            });
            const res = await data.json()
            alert(res.message)
            
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()
  };

  return (
    <div>
      <h1>Certificates Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="certificateName">Text Input:</label>
          <input
            type="text"
            id="certificateName"
            value={formData.certificateName}
            onChange={handleTextChange}
            placeholder="Enter text"
          />
        </div>
        <div>
          <label htmlFor="fileInput">File Input:</label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CertificatesPage;
