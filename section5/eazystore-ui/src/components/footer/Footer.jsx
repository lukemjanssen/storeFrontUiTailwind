import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import "./footer.css";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 font-primary text-lg text-gray-800">
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className="text-red-500 mx-2 animate-pulse"
        aria-hidden="true"
      />
      by
      <a href="https://github.com/lukemjanssen" target="_blank" rel="noreferrer" className="ml-2 text-blue-600 hover:underline">
        Luke Janssen
      </a>
    </footer>
  );
}
