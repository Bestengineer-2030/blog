import Link from 'next/link'
import type { Post } from '@/lib/posts'

const categoryConfig = {
  'gut-health': { label: 'Gut Health', color: '#E84C1E' },
  'personal':   { label: 'Personal',   color: '#2563EB' },
  'agentic-ai': { label: 'Agentic AI', color: '#7C3AED' },
  'books':      { label: 'Books',      color: '#059669' },
}

export default function PostCard({ post }: { post: Post }) {
  const cat = categoryConfig[post.category] ?? categoryConfig.personal
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="border border-gray-100 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ color: cat.color, background: cat.color + '18' }}
          >
            {cat.label}
          </span>
          <span className="text-xs text-gray-400">{post.readingTime}</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#E84C1E] transition-colors leading-snug mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <div className="mt-4 text-xs text-gray-400">
          {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </article>
    </Link>
  )
}
