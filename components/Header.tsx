import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-black text-lg tracking-tight hover:opacity-80 transition-opacity">
          <span style={{ color: '#E84C1E' }}>///</span> SACHI
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/blog" className="hover:text-black transition-colors">All Posts</Link>
          <Link href="/blog?category=gut-health" className="hover:text-black transition-colors">Gut Health</Link>
          <Link href="/blog?category=personal" className="hover:text-black transition-colors">Personal</Link>
          <Link href="/about" className="hover:text-black transition-colors">About</Link>
        </nav>
      </div>
    </header>
  )
}
