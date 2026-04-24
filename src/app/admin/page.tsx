'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { FaMusic, FaFileAlt, FaBlog, FaImage, FaCog } from 'react-icons/fa';

/**
 * Simple Admin Dashboard
 * 
 * This is a lightweight admin interface for managing your content.
 * For now, it provides instructions on how to edit content.
 * 
 * Future enhancements:
 * - Visual editor for lyrics
 * - Blog post editor
 * - Image uploader
 * - Settings manager
 */

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Manage your website content
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: FaCog },
            { id: 'lyrics', label: 'Lyrics', icon: FaMusic },
            { id: 'songs', label: 'Songs', icon: FaMusic },
            { id: 'blog', label: 'Blog', icon: FaBlog },
            { id: 'images', label: 'Images', icon: FaImage },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-gold text-background-dark'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'lyrics' && <LyricsTab />}
          {activeTab === 'songs' && <SongsTab />}
          {activeTab === 'blog' && <BlogTab />}
          {activeTab === 'images' && <ImagesTab />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="elevated" padding="lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-gold/10 rounded-full mb-4">
            <FaMusic className="text-3xl text-primary-gold" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10</h3>
          <p className="text-gray-600 dark:text-text-secondary">Songs with Lyrics</p>
        </div>
      </Card>

      <Card variant="elevated" padding="lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-red/10 rounded-full mb-4">
            <FaMusic className="text-3xl text-accent-red" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">12</h3>
          <p className="text-gray-600 dark:text-text-secondary">Total Songs</p>
        </div>
      </Card>

      <Card variant="elevated" padding="lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-tech-teal/10 rounded-full mb-4">
            <FaBlog className="text-3xl text-tech-teal" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">0</h3>
          <p className="text-gray-600 dark:text-text-secondary">Blog Posts</p>
        </div>
      </Card>

      <Card variant="elevated" padding="lg" className="md:col-span-2 lg:col-span-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/CharlesJasema/Charles-Jasema-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Edit on GitHub</h4>
            <p className="text-sm text-gray-600 dark:text-text-secondary">
              Edit configuration files directly on GitHub
            </p>
          </a>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">View Analytics</h4>
            <p className="text-sm text-gray-600 dark:text-text-secondary">
              Check visitor stats and download counts
            </p>
          </a>
          <a
            href="https://dashboard.flutterwave.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">View Donations</h4>
            <p className="text-sm text-gray-600 dark:text-text-secondary">
              Check donation history on Flutterwave
            </p>
          </a>
          <a
            href="https://www.paypal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">View PayPal</h4>
            <p className="text-sm text-gray-600 dark:text-text-secondary">
              Check international donations on PayPal
            </p>
          </a>
        </div>
      </Card>
    </div>
  );
}

function LyricsTab() {
  return (
    <Card variant="elevated" padding="lg">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Lyrics</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">📝 How to Edit Lyrics</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>Open your code editor (VS Code)</li>
            <li>Navigate to: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">src/config/lyrics.ts</code></li>
            <li>Find the song you want to edit</li>
            <li>Update the lyrics in the <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">verses</code> array</li>
            <li>Save the file</li>
            <li>Website updates automatically!</li>
          </ol>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">➕ How to Add New Lyrics</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-green-800 dark:text-green-400">
            <li>Open: <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">src/config/lyrics.ts</code></li>
            <li>Copy an existing song object</li>
            <li>Paste it at the end of the <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">lyrics</code> array</li>
            <li>Update all fields (id, title, artist, verses, etc.)</li>
            <li>Save the file</li>
          </ol>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Documentation</h4>
          <p className="text-sm text-gray-600 dark:text-text-secondary mb-3">
            For detailed instructions, see:
          </p>
          <a
            href="/ADD_YOUR_LYRICS.md"
            className="inline-block px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm font-medium"
          >
            View Lyrics Guide
          </a>
        </div>
      </div>
    </Card>
  );
}

function SongsTab() {
  return (
    <Card variant="elevated" padding="lg">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Songs</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">🎵 How to Edit Songs</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>Open your code editor (VS Code)</li>
            <li>Navigate to: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">src/config/music.ts</code></li>
            <li>Find the song in <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">audioSongs</code> array</li>
            <li>Update title, description, release date, etc.</li>
            <li>Save the file</li>
          </ol>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">➕ How to Add New Song</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-green-800 dark:text-green-400">
            <li>Open: <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">src/config/music.ts</code></li>
            <li>Copy an existing song object from <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">audioSongs</code></li>
            <li>Paste it in the array</li>
            <li>Update all fields (id, title, duration, releaseDate, etc.)</li>
            <li>Add <code className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">isNew: true</code> for new releases</li>
            <li>Save the file</li>
          </ol>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Documentation</h4>
          <p className="text-sm text-gray-600 dark:text-text-secondary mb-3">
            For detailed instructions, see:
          </p>
          <a
            href="/ADD_YOUR_SONGS.md"
            className="inline-block px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm font-medium"
          >
            View Songs Guide
          </a>
        </div>
      </div>
    </Card>
  );
}

function BlogTab() {
  return (
    <Card variant="elevated" padding="lg">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Blog</h3>
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">🚧 Coming Soon</h4>
          <p className="text-sm text-yellow-800 dark:text-yellow-400">
            Blog management interface is under development. For now, you can create blog posts manually.
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">📝 How to Create Blog Post (Manual)</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>Create folder: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">src/app/blog/[slug]</code></li>
            <li>Create file: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">page.tsx</code> in that folder</li>
            <li>Write your blog post content</li>
            <li>Save the file</li>
          </ol>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Recommendation</h4>
          <p className="text-sm text-gray-600 dark:text-text-secondary">
            For easier blog management, consider using a platform like Medium or Substack and linking to it from your website.
          </p>
        </div>
      </div>
    </Card>
  );
}

function ImagesTab() {
  return (
    <Card variant="elevated" padding="lg">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Images</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">🖼️ How to Add Images</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>Add your image to: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">public/images/</code> folder</li>
            <li>Open: <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">src/config/images.ts</code></li>
            <li>Add the image path to the config</li>
            <li>Use the image in your components</li>
          </ol>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">✅ Best Practices</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-green-800 dark:text-green-400">
            <li>Use .jpg for photos</li>
            <li>Use .png for logos and graphics</li>
            <li>Optimize images before uploading (use TinyPNG.com)</li>
            <li>Use descriptive filenames (e.g., "album-cover-mercy.jpg")</li>
            <li>Keep images under 500KB for fast loading</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Documentation</h4>
          <p className="text-sm text-gray-600 dark:text-text-secondary mb-3">
            For detailed instructions, see:
          </p>
          <a
            href="/IMAGE_USAGE_GUIDE.md"
            className="inline-block px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm font-medium"
          >
            View Image Guide
          </a>
        </div>
      </div>
    </Card>
  );
}
