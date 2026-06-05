import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Charles Jasema Portfolio CMS',
  description: 'Content Management System for Charles Jasema Portfolio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  )
}