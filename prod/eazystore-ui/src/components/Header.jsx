import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import { NavLink } from "react-router-dom";


export default function Header() {
  const navLinkClass = ({ isActive }) =>
    `text-center text-lg font-primary font-semibold py-2 transition-colors duration-200 ${
      isActive
        ? "text-purple-600 dark:text-purple-300 underline underline-offset-4"
        : "text-primary dark:text-purple-400"
    }`;

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let newTheme;

      if (prevTheme === "light") {
        newTheme = "dark";
        document.documentElement.classList.add("dark");
      } else {
        newTheme = "light";
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <header className="border-b border-gray-300 dark:border-gray-700 sticky top-0 z-20 bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <NavLink to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Stickers</span>
        </NavLink>
        <nav className="flex items-center py-2 z-10">
          <button 
            className="mr-6 w-10 h-10 flex items-center justify-center text-yellow-500 dark:text-gray-300 rounded-full transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600" 
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} className="w-5 h-5" />
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// export default Header;
