function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="max-w-2xl text-gray-600 dark:text-gray-300">
          We'd love to hear from you. Fill out the form and our team will respond promptly.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {/* Form */}
        <div className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y"
                placeholder="Tell us how we can help..."
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">We'll never share your information.</p>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        {/* Contact Info Panel */}
        <div className="space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Reach Us Directly</h2>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">support@eazystore.dev</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">Mon - Fri, 9am - 6pm EST</p>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Response time typically under 24 hours. For urgent issues include the word URGENT in your subject.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
