// components/Loader.js
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <svg
        className="animate-spin h-10 w-10 mr-3 border-t-4 border-gray-500 border-solid rounded-full"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};

export default Loader;
