import { NavLink } from 'react-router-dom';

<NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>

export default function Home() {
    return (
      <div className="home">
        <h1>Welcome to the About Page</h1>
        <p></p>
      </div>
    )
  }