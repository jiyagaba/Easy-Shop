import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Section */}
        <section className="md:col-span-2 space-y-8">
          <div className="space-y-2">
            <img
              src="https://images.unsplash.com/photo-1573164574392-70d8c88c296a"
              alt="Blog Hero"
              className="rounded-lg w-full object-cover h-64"
            />
            <p className="text-sm text-gray-500">Jan 20, 2024 · Michael de Santa</p>
            <h2 className="text-xl font-semibold">Crafting Seamless Experiences: The Art of Intuitive UI Design</h2>
            <p className="text-gray-600">
              Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive digital journey for your audience.
            </p>
          </div>

          {/* Extra Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1581091012184-7e0cdfbb6791"
              alt="Blog 1"
              className="rounded-lg h-40 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec7f89b48f0"
              alt="Blog 2"
              className="rounded-lg h-40 w-full object-cover"
            />
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* About Author */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img
                src="https://avatars.githubusercontent.com/u/583231?v=4"
                alt="Author"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Jennifer Taylor</h3>
                <p className="text-sm text-gray-500">UI Kit Creator from Chile</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Hello! My name is Jennifer Taylor, working from Chile. I create some UI Kits and Design Systems for Figma and also, I offer live support to designers.
            </p>
            <a
              href="https://figma.com"
              target="_blank"
              className="inline-block mt-4 text-sm text-purple-600 hover:underline"
              rel="noreferrer"
            >
              Find me on Figma Community
            </a>
          </div>

          {/* Join Us Backstage */}
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Join us backstage</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to Canny Backstage to get an email when we post new content
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 p-2 rounded-l-md border border-gray-300"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
                Get Started
              </button>
            </div>
          </div>
        </aside>
      </main>

      <Footer/>
    </div>
  );
};

export default BlogPage;
