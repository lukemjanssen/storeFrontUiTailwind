import { Form, useActionData, useNavigation } from "react-router-dom";
import apiClient from "../../api/apiClient";

// Action function to handle form submission
export async function contactAction({ request }) {
  try {
    const formData = await request.formData();
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobileNumber: formData.get("mobileNumber"),
      message: formData.get("message"),
    };

    const response = await apiClient.post("/contacts", contactData);
    
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: response.data,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send message. Please try again.",
      error: error.message,
    };
  }
}

function Contact() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

      {/* Success/Error Message */}
      {actionData && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            actionData.success
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              actionData.success
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}
          >
            {actionData.message}
          </p>
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-3">
        {/* Form */}
        <div className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-sm">
          <Form method="post" className="space-y-6" aria-label="Contact form">
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
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y"
                placeholder="Tell us how we can help..."
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">We'll never share your information.</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </Form>
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
