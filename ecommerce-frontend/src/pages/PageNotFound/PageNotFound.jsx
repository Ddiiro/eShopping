import React from 'react'
import '../PageNotFound/PageNotFound.css'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <div class="error-message">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button>
                <Link to="/">Go to Home Page</Link>
            </button>
        </div>
    </div>
  )
}

export default PageNotFound