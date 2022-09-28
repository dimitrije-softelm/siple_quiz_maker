import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.style.css"

function Header() {
  return (
    <nav className={'navbar-container'}>
      <h1>Quiz app</h1>
      <div className={'links-container'}>
        <Link to={'/'}>Questions</Link>
        <Link to={'/quizzes'}>Quizzes</Link>
      </div>
    </nav>
  );
}

export default Header;
