export default function TestPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Test Page</h1>
        <p className="text-gray-300 mb-4">This is a simple test page to check if basic content renders.</p>
        
        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-primary-gold mb-4">Test Section</h2>
          <p className="text-gray-300">If you can see this content, React is working properly.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Card 1</h3>
            <p className="text-gray-300">Test content 1</p>
          </div>
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Card 2</h3>
            <p className="text-gray-300">Test content 2</p>
          </div>
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold text-white mb-2">Card 3</h3>
            <p className="text-gray-300">Test content 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}