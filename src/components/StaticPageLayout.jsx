const StaticPageLayout = ({ title, children }) => {
  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 md:px-16 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          {title}
        </h1>
        <div className="text-gray-600 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default StaticPageLayout;
