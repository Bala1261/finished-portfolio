import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('education');
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const API_URL = 'http://localhost:5000/api';

  // Fetch data
  useEffect(() => {
    fetchEducation();
    fetchCertifications();
    fetchSkills();
  }, []);

  const fetchEducation = async () => {
    const res = await fetch(`${API_URL}/education`);
    const data = await res.json();
    if (data.success) setEducation(data.data);
  };

  const fetchCertifications = async () => {
    const res = await fetch(`${API_URL}/certifications`);
    const data = await res.json();
    if (data.success) setCertifications(data.data);
  };

  const fetchSkills = async () => {
    const res = await fetch(`${API_URL}/technical-skills`);
    const data = await res.json();
    if (data.success) setSkills(data.data);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'education' ? 'education' : 
                    activeTab === 'certifications' ? 'certifications' : 'technical-skills';
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${endpoint}/${editingId}` : `${API_URL}/${endpoint}`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setShowForm(false);
      setEditingId(null);
      setFormData({});
      fetchEducation();
      fetchCertifications();
      fetchSkills();
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    const endpoint = activeTab === 'education' ? 'education' : 
                    activeTab === 'certifications' ? 'certifications' : 'technical-skills';

    await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
    fetchEducation();
    fetchCertifications();
    fetchSkills();
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setShowForm(true);
  };

  // Render Education Form
  const renderEducationForm = () => (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
        placeholder="Degree"
        value={formData.degree || ''}
        onChange={(e) => setFormData({...formData, degree: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Institution"
        value={formData.institution || ''}
        onChange={(e) => setFormData({...formData, institution: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location || ''}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Start Year"
        value={formData.startYear || ''}
        onChange={(e) => setFormData({...formData, startYear: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="End Year"
        value={formData.endYear || ''}
        onChange={(e) => setFormData({...formData, endYear: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="CGPA (optional)"
        value={formData.cgpa || ''}
        onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
      />
      <textarea
        placeholder="Description (optional)"
        value={formData.description || ''}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          <FaSave /> {editingId ? 'Update' : 'Add'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => {
          setShowForm(false);
          setEditingId(null);
          setFormData({});
        }}>
          <FaTimes /> Cancel
        </button>
      </div>
    </form>
  );

  // Render Certification Form
  const renderCertificationForm = () => (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
        placeholder="Certificate Name"
        value={formData.name || ''}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Issuer"
        value={formData.issuer || ''}
        onChange={(e) => setFormData({...formData, issuer: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Issue Date (e.g., Jan 2024)"
        value={formData.issueDate || ''}
        onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Credential ID (optional)"
        value={formData.credentialId || ''}
        onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
      />
      <input
        type="url"
        placeholder="Credential URL (optional)"
        value={formData.credentialUrl || ''}
        onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})}
      />
      <textarea
        placeholder="Description (optional)"
        value={formData.description || ''}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          <FaSave /> {editingId ? 'Update' : 'Add'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => {
          setShowForm(false);
          setEditingId(null);
          setFormData({});
        }}>
          <FaTimes /> Cancel
        </button>
      </div>
    </form>
  );

  // Render Technical Skill Form
  const renderSkillForm = () => (
    <form onSubmit={handleSubmit} className="admin-form">
      <select
        value={formData.category || ''}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        required
      >
        <option value="">Select Category</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Database">Database</option>
        <option value="Tools">Tools</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Skill Name"
        value={formData.name || ''}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Icon Name (e.g., FaReact)"
        value={formData.icon || ''}
        onChange={(e) => setFormData({...formData, icon: e.target.value})}
      />
      <input
        type="number"
        placeholder="Proficiency (0-100)"
        min="0"
        max="100"
        value={formData.proficiency || ''}
        onChange={(e) => setFormData({...formData, proficiency: e.target.value})}
      />
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          <FaSave /> {editingId ? 'Update' : 'Add'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => {
          setShowForm(false);
          setEditingId(null);
          setFormData({});
        }}>
          <FaTimes /> Cancel
        </button>
      </div>
    </form>
  );

  const renderList = () => {
    const data = activeTab === 'education' ? education :
                 activeTab === 'certifications' ? certifications : skills;

    return (
      <div className="admin-list">
        {data.map((item) => (
          <motion.div
            key={item._id}
            className="admin-list-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className="item-content">
              {activeTab === 'education' && (
                <>
                  <h3>{item.degree}</h3>
                  <p>{item.institution} - {item.location}</p>
                  <p>{item.startYear} - {item.endYear}</p>
                </>
              )}
              {activeTab === 'certifications' && (
                <>
                  <h3>{item.name}</h3>
                  <p>{item.issuer}</p>
                  <p>{item.issueDate}</p>
                </>
              )}
              {activeTab === 'skills' && (
                <>
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  {item.proficiency && <p>Proficiency: {item.proficiency}%</p>}
                </>
              )}
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)} className="btn-icon">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn-icon danger">
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="admin-panel section">
      <div className="container">
        <h2 className="section-title">Admin Panel</h2>
        <p className="section-subtitle">Manage Your Portfolio Content</p>

        <div className="admin-tabs">
          <button
            className={activeTab === 'education' ? 'active' : ''}
            onClick={() => {setActiveTab('education'); setShowForm(false);}}
          >
            Education
          </button>
          <button
            className={activeTab === 'certifications' ? 'active' : ''}
            onClick={() => {setActiveTab('certifications'); setShowForm(false);}}
          >
            Certifications
          </button>
          <button
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={() => {setActiveTab('skills'); setShowForm(false);}}
          >
            Technical Skills
          </button>
        </div>

        <div className="admin-content">
          {!showForm && (
            <button
              className="btn btn-primary add-btn"
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormData({});
              }}
            >
              <FaPlus /> Add New
            </button>
          )}

          {showForm && (
            <div className="form-container">
              {activeTab === 'education' && renderEducationForm()}
              {activeTab === 'certifications' && renderCertificationForm()}
              {activeTab === 'skills' && renderSkillForm()}
            </div>
          )}

          {renderList()}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
