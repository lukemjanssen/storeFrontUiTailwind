import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";


export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary dark:text-purple-400 py-2 transition-colors duration-200";

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
        <a href="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Stickers</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <button 
            className="mr-6 w-10 h-10 flex items-center justify-center text-yellow-500 dark:text-gray-300 rounded-full transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600" 
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} className="w-5 h-5" />
          </button>
          <ul className="flex space-x-6">
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
              <a href="/cart" className="text-primary py-2">
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
