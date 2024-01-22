function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-700">My Dashboard</span>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 17h5l-1.5 1.5M9 11l-5 5m0 0l5-5m-5 5V6m6 6l6-6m0 0l-6 6m6-6v12"></path>
              </svg>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://via.placeholder.com/32"
                  alt="Your avatar"
                />
              </button>
              {/* You can add a dropdown here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
