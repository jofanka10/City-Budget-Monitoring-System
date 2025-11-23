import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../utils/api'
import '../App.css'

function TransactionForm({ user }) {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    type: 'income'
  })
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchTransaction()
    }
  }, [id])

  const fetchTransaction = async () => {
    try {
      const response = await api.get(`/transactions/${id}`)
      const transaction = response.data
      setFormData({
        name: transaction.name,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type
      })
      if (transaction.photo) {
        setPhotoPreview(`http://localhost:5001/${transaction.photo}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transaction')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('amount', formData.amount)
      formDataToSend.append('type', formData.type)
      if (photo) {
        formDataToSend.append('photo', photo)
      }

      if (isEdit) {
        await api.put(`/transactions/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setSuccess('Transaction updated successfully!')
      } else {
        await api.post('/transactions', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setSuccess('Transaction created successfully!')
      }

      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction')
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'bph') {
    return (
      <div className="container">
        <div className="card">
          <div className="error">Only BPH members can create or edit transactions.</div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '24px' }}>
          {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
        </h1>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Transaction Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Monthly Dues Collection"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the transaction..."
            />
          </div>

          <div className="form-group">
            <label>Amount (IDR) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Photo/Document</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Transaction' : 'Create Transaction')}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm

