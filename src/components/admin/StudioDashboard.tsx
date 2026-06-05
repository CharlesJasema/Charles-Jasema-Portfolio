'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity.client'
import { FaMusic, FaVideo, FaProjectDiagram, FaBlog, FaStar, FaEye, FaCalendar } from 'react-icons/fa'
import Link from 'next/link'

interface DashboardStats {
  totalSongs: number
  totalVideos: number
  totalProjects: number
  totalBlogPosts: number
  featuredSongs: number
  featuredProjects: number
  featuredBlogs: number
  newSongs: number
  recentActivity: any[]
}

export function StudioDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          songs,
          videos,
          projects,
          blogPosts,
          featuredSongs,
          featuredProjects,
          featuredBlogs,
          newSongs,
          recentActivity
        ] = await Promise.all([
          client.fetch('count(*[_type == "song"])'),
          client.fetch('count(*[_type == "musicVideo"])'),
          client.fetch('count(*[_type == "project"])'),
          client.fetch('count(*[_type == "blogPost"])'),
          client.fetch('count(*[_type == "song" && featured == true])'),
          client.fetch('count(*[_type == "project" && featured == true])'),
          client.fetch('count(*[_type == "blogPost" && featured == true])'),
          client.fetch('count(*[_type == "song" && isNew == true])'),
          client.fetch(`
            *[_type in ["song", "musicVideo", "project", "blogPost"]] 
            | order(_updatedAt desc) [0...5] {
              _type,
              title,
              _updatedAt,
              featured
            }
          `)
        ])

        setStats({
          totalSongs: songs,
          totalVideos: videos,
          totalProjects: projects,
          totalBlogPosts: blogPosts,
          featuredSongs: featuredSongs,
          featuredProjects: featuredProjects,
          featuredBlogs: featuredBlogs,
          newSongs: newSongs,
          recentActivity: recentActivity
        })
      } catch (err) {
        setError('Failed to load dashboard statistics')
        console.error('Dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Dashboard Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!stats) return null

  const statCards = [
    {
      title: 'Songs',
      value: stats.totalSongs,
      icon: FaMusic,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Videos',
      value: stats.totalVideos,
      icon: FaVideo,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      icon: FaProjectDiagram,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      icon: FaBlog,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              🎵 Charles Jasema Portfolio CMS
            </h2>
            <p className="text-gray-600">Professional Content Management System</p>
          </div>
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
          >
            <FaEye className="w-4 h-4" />
            View Website
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Content Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaStar className="w-5 h-5 text-yellow-500" />
          Featured Content
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.featuredSongs}</p>
            <p className="text-sm text-gray-600">Featured Songs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.featuredProjects}</p>
            <p className="text-sm text-gray-600">Featured Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.featuredBlogs}</p>
            <p className="text-sm text-gray-600">Featured Blogs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.newSongs}</p>
            <p className="text-sm text-gray-600">New Songs</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaCalendar className="w-5 h-5 text-gray-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {item._type === 'song' && <FaMusic className="w-4 h-4 text-blue-500" />}
                    {item._type === 'musicVideo' && <FaVideo className="w-4 h-4 text-red-500" />}
                    {item._type === 'project' && <FaProjectDiagram className="w-4 h-4 text-green-500" />}
                    {item._type === 'blogPost' && <FaBlog className="w-4 h-4 text-purple-500" />}
                    <span className="text-sm font-medium text-gray-900">{item.title}</span>
                  </div>
                  {item.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <FaStar className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(item._updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  )
}