import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Price from "./Price";

export default function ProductDetails() {
  const location = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = location.state?.product;

  // If no product data in state, redirect back to home
  if (!product) {
    return (
      <div className="max-w-[1152px] mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The product you're looking for doesn't exist or the link is invalid.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold mb-6 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Products
      </button>

      {/* Product Details Grid */}
      <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative bg-gray-100 dark:bg-gray-700 h-96 md:h-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <h1 className="text-4xl font-bold text-primary dark:text-purple-400 mb-4">
              {product.name}
            </h1>

            {/* Product Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Additional Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Product ID:</span>
                <span className="text-gray-900 dark:text-gray-100">#{product.productId}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Popularity:</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {"⭐".repeat(Math.min(product.popularity, 5))}
                  <span className="ml-2 text-sm">({product.popularity})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Price:</span>
              </div>
              <div className="text-5xl font-bold text-primary dark:text-purple-400">
                <Price currency="$" price={product.price} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg">
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
              </button>
              <button className="px-6 py-4 rounded-lg font-semibold border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 space-y-2">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ Premium quality stickers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Product Info Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Product Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              High-quality vinyl material with vibrant colors
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-4xl mb-3">💧</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Waterproof</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Weather-resistant coating for long-lasting use
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy to Apply</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Peel and stick - applies smoothly without bubbles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
