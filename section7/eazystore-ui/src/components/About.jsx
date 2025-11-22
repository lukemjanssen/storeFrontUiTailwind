function About() {
  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          About Eazy Store
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your one-stop destination for creative stickers that bring joy and personality to everything you touch.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Our Story
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Founded in 2024, Eazy Store began with a simple mission: to make everyday items extraordinary. 
              What started as a small collection of hand-designed stickers has grown into a vibrant community 
              of creative enthusiasts who believe that the little details matter.
            </p>
            <p className="leading-relaxed">
              We understand that stickers are more than just decorations—they're expressions of personality, 
              creativity, and individuality. That's why we've curated a diverse collection that speaks to 
              different tastes, interests, and styles.
            </p>
            <p className="leading-relaxed">
              Today, we're proud to serve thousands of customers worldwide, helping them add a personal touch 
              to laptops, water bottles, notebooks, and more. Every sticker tells a story, and we're here to 
              help you tell yours.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
            <div className="space-y-6">
              <div>
                <div className="text-5xl font-bold">10K+</div>
                <div className="text-indigo-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-5xl font-bold">500+</div>
                <div className="text-indigo-100">Unique Designs</div>
              </div>
              <div>
                <div className="text-5xl font-bold">50+</div>
                <div className="text-indigo-100">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Creativity First
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We celebrate originality and encourage self-expression through unique, 
              artist-designed stickers that stand out from the crowd.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Quality Matters
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every sticker is printed on premium vinyl with weather-resistant coating, 
              ensuring your designs stay vibrant and durable.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Sustainability
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We're committed to eco-friendly practices, using recyclable materials 
              and sustainable packaging for all our products.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Why Choose Eazy Store?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Fast Shipping</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Orders processed within 24 hours with tracking included
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Satisfaction Guaranteed</h4>
              <p className="text-gray-600 dark:text-gray-300">
                30-day money-back guarantee on all products
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Exclusive Designs</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Work with talented artists to bring you one-of-a-kind stickers
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Customer Support</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Friendly support team ready to help with any questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-indigo-600 dark:bg-indigo-700 rounded-xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Collection?
        </h2>
        <p className="text-xl mb-6 text-indigo-100">
          Browse our latest designs and find the perfect stickers for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Shop Now
          </a>
          <a 
            href="/contact" 
            className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors border-2 border-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
