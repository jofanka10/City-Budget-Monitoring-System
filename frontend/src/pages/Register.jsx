import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import '../App.css'

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'resident'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Client-side validation
    if (!formData.name.trim()) {
      setError('Name is required')
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/auth/register', formData)
      console.log('Registration response:', response.data)
      
      if (response.data && response.data.user && response.data.token) {
        onLogin(response.data.user, response.data.token)
        navigate('/dashboard')
      } else {
        setError('Invalid response from server. Please try again.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      let errorMessage = 'Registration failed. Please try again.'
      
      if (err.isNetworkError || !err.response) {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 5001.'
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Register</h1>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="resident">Resident</option>
              <option value="bph">BPH (Board Member)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register

