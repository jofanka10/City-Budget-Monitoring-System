import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          City Budget Monitoring System
        </Link>
        <div className="navbar-menu">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          {user?.role === 'bph' && (
            <Link to="/transaction/new" className="navbar-link">
              Add Transaction
            </Link>
          )}
          <div className="navbar-user">
            <span>{user?.name} ({user?.role === 'bph' ? 'Pengurus' : 'Resident'})</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

