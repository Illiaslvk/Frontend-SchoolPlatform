import { Link } from 'react-router-dom'
function Navigation() {
    return (
        <nav>
            <ul>
              <li><Link to="/">Main page</Link></li>
              <li><Link to="/teachers">Teachers</Link></li>
              <li><Link to="/students">Students</Link></li>
              <li><Link to="/grades">Grades</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation