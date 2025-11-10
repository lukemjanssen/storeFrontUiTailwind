import { useRouteError, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faHome } from "@fortawesome/free-solid-svg-icons";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <FontAwesomeIcon 
            icon={faExclamationTriangle} 
            className="text-red-500 dark:text-red-400 text-6xl mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Oops!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Something went wrong
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {error?.statusText || error?.message || "Page not found"}
          </p>
          {error?.status && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Error {error.status}
            </p>
          )}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faHome} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
