import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Contact = () => {
  const formRef = useRef(null);
  const contactSites = [
    { icon: faInstagram, link: "https://instagram.com", label: "Instagram" },
    { icon: faFacebook, link: "https://facebook.com", label: "Facebook" },
    { icon: faXTwitter, link: "https://twitter.com", label: "X" },
    { icon: faLinkedin, link: "https://linkedin.com", label: "LinkedIn" }
  ];
  const handleFakeSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    toast.success(`Thanks for reaching out, ${name}! We'll get back to you soon.`);
    formRef.current.reset();
  };
  
  
  return (
    <div className="py-25 px-4">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 border border-gray-300">

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
          Contact Us
        </h2>

        <form ref={formRef} onSubmit={handleFakeSubmit} className="space-y-6">


          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            placeholder="Name"
          />

          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            placeholder="Email"
          />

          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            placeholder="Your Message"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition hover:bg-blue-700 hover:shadow-lg"
          >
            Send Message
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-8">
          {contactSites.map((site, index) => (
            <a
              key={index}
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={site.label}
            >
              <FontAwesomeIcon
                icon={site.icon}
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
