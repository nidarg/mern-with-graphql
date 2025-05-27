import logo from './assets/logo.ico'

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
        <div className="container">
            <a href="/" className="navbar-brand">
            <div >
                <img src={logo} alt="logo"  />
            </div>
            </a>

        </div>
      
    </nav>
  )
}

export default Header
