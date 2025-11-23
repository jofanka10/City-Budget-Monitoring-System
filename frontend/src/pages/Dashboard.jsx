import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import Graph from '../components/Graph'
import '../App.css'

function Dashboard({ user }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions')
      setTransactions(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return
    }

    try {
      await api.delete(`/transactions/${id}`)
      fetchTransactions()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete transaction')
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
      day: 'numeric'
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

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="container">
      <div className="card">
        <Graph transactions={transactions} />
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Transaction Dashboard</h1>
          {user?.role === 'bph' && (
            <Link to="/transaction/new" className="btn btn-primary">
              Add Transaction
            </Link>
          )}
        </div>

        {error && <div className="error">{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid rgba(46, 125, 50, 0.2)'
          }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>Total Pemasukan</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32', margin: 0 }}>
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid rgba(198, 40, 40, 0.2)'
          }}>
            <h3 style={{ color: '#c62828', marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>Total Pengeluaran</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#c62828', margin: 0 }}>
              {formatCurrency(totalExpense)}
            </p>
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid rgba(21, 101, 192, 0.2)'
          }}>
            <h3 style={{ color: '#1565c0', marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>Saldo</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1565c0', margin: 0 }}>
              {formatCurrency(totalIncome - totalExpense)}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>All Transactions</h2>
        
        {transactions.length === 0 ? (
          <p>No transactions found. {user?.role === 'bph' && 'Add your first transaction!'}</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {transactions.map(transaction => (
              <div 
                key={transaction._id} 
                className="card"
                style={{ 
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  borderLeft: `4px solid ${transaction.type === 'income' ? '#28a745' : '#dc3545'}`,
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  marginBottom: '0'
                }}
                onClick={() => navigate(`/transaction/${transaction._id}`)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '8px' }}>{transaction.name}</h3>
                    <p style={{ color: '#666', marginBottom: '8px' }}>{transaction.description}</p>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: transaction.type === 'income' ? '#28a745' : '#dc3545'
                      }}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </span>
                      <span style={{ color: '#999', fontSize: '14px' }}>
                        {formatDate(transaction.createdAt)}
                      </span>
                      <span style={{ color: '#999', fontSize: '14px' }}>
                        By: {transaction.createdBy?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  {user?.role === 'bph' && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/transaction/${transaction._id}/edit`)
                        }}
                        className="btn btn-edit"
                        style={{ padding: '5px 10px', fontSize: '14px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(transaction._id)
                        }}
                        className="btn btn-danger"
                        style={{ padding: '5px 10px', fontSize: '14px' }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

