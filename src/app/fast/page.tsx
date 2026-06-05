export default function FastPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Charles Jasema Portfolio
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">🎵 Music</h2>
            <p className="text-gray-600">Gospel artist and songwriter</p>
            <a href="/music" className="text-blue-600 hover:underline">View Music →</a>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">💼 Portfolio</h2>
            <p className="text-gray-600">Software development projects</p>
            <a href="/portfolio" className="text-green-600 hover:underline">View Projects →</a>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">📝 Blog</h2>
            <p className="text-gray-600">Thoughts and insights</p>
            <a href="/blog" className="text-purple-600 hover:underline">Read Blog →</a>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">🎤 Lyrics</h2>
            <p className="text-gray-600">Song lyrics and meanings</p>
            <a href="/lyrics" className="text-red-600 hover:underline">View Lyrics →</a>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">📞 Contact</h2>
            <p className="text-gray-600">Get in touch</p>
            <a href="/contact" className="text-yellow-600 hover:underline">Contact Me →</a>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">⚙️ Admin</h2>
            <p className="text-gray-600">Content management</p>
            <a href="/admin" className="text-gray-600 hover:underline">Admin Panel →</a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">Fast loading test page</p>
          <a href="/" className="text-blue-600 hover:underline">← Back to full site</a>
        </div>
      </div>
    </div>
  )
}