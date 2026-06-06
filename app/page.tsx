import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  const latest = posts.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E84C1E' }}>
            Building in Public
          </span>
        </div>
        <h1 className="text-4xl font-black leading-tight mb-4 text-gray-900">
          Gut Health. Agentic AI.<br />
          <span style={{ color: '#E84C1E' }}>Building a startup from zero.</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
          I train for Hyrox, build AI-powered coaching tools for athletes, and document everything —
          the science, the strategy, and the failures.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full transition-opacity hover:opacity-90"
            style={{ background: '#E84C1E' }}
          >
            Read All Posts →
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Who am I?
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Latest</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Posts */}
      {latest.length === 0 ? (
        <p className="text-gray-400 text-sm">No posts yet. First one coming soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {latest.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      )}

      {posts.length > 3 && (
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            View all {posts.length} posts →
          </Link>
        </div>
      )}
    </div>
  )
}
