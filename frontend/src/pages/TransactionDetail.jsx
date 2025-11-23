import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import '../App.css'

function TransactionDetail({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTransaction()
  }, [id])

  const fetchTransaction = async () => {
    try {
      const response = await api.get(`/transactions/${id}`)
      setTransaction(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transaction')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className="container">
        <div className="card">
          <div className="error">{error || 'Transaction not found'}</div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Transaction Details</h1>
          {user?.role === 'bph' && (
            <button
              onClick={() => navigate(`/transaction/${id}/edit`)}
              className="btn btn-secondary"
            >
              Edit
            </button>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ 
            marginBottom: '10px',
            color: transaction.type === 'income' ? '#28a745' : '#dc3545'
          }}>
            {transaction.name}
          </h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>
            {transaction.description}
          </p>
        </div>

        <div style={{ 
          background: transaction.type === 'income' ? '#e8f5e9' : '#ffebee',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: '500' }}>Amount:</span>
            <span style={{ 
              fontSize: '28px', 
              fontWeight: 'bold',
              color: transaction.type === 'income' ? '#2e7d32' : '#c62828'
            }}>
              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p><strong>Type:</strong> {transaction.type === 'income' ? 'Income' : 'Expense'}</p>
          <p><strong>Created by:</strong> {transaction.createdBy?.name || 'Unknown'}</p>
          <p><strong>Created at:</strong> {formatDate(transaction.createdAt)}</p>
          {transaction.updatedAt !== transaction.createdAt && (
            <p><strong>Last updated:</strong> {formatDate(transaction.updatedAt)}</p>
          )}
        </div>

        {transaction.photo && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Photo/Document</h3>
            <div style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '10px',
              background: '#f9f9f9'
            }}>
              {transaction.photo.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img 
                  src={`http://localhost:5001/${transaction.photo}`} 
                  alt="Transaction" 
                  style={{ maxWidth: '100%', borderRadius: '4px' }}
                />
              ) : (
                <a 
                  href={`http://localhost:5001/${transaction.photo}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Document
                </a>
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail

