import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navLinkClass = "text-center text-lg font-primary text-gray-800 hover:text-blue-600 transition duration-300 nav-link";
  return (
    <header className="border-b border-gray-300 py-4 mb-8 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <FontAwesomeIcon icon={faTags} className="text-gray-600" />
          <span className="text-center text-lg font-primary">Eazy Stickers</span>
        </a>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className={navLinkClass}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" className={navLinkClass}>
                About
              </a>
            </li>
            <li>
              <a href="/contact" className={navLinkClass}>
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className={navLinkClass}>
                Login
              </a>
            </li>
            <li>
              <a href="/cart" className="nav-link">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
