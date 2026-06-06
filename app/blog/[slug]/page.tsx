import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  'gut-health': { label: 'Gut Health', color: '#E84C1E' },
  'personal':   { label: 'Personal',   color: '#2563EB' },
  'agentic-ai': { label: 'Agentic AI', color: '#7C3AED' },
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul]|<blockquote|<hr)(.+)$/gm, '$1')
    .replace(/^<\/p><p>$/, '')
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const cat = categoryConfig[post.category] ?? categoryConfig.personal
  const html = `<p>${renderMarkdown(post.content)}</p>`

  return (
    <article>
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
      >
        ← All Posts
      </Link>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ color: cat.color, background: cat.color + '18' }}
        >
          {cat.label}
        </span>
        <span className="text-xs text-gray-400">{post.readingTime}</span>
        <span className="text-xs text-gray-400">
          {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black leading-tight mb-10 text-gray-900">
        {post.title}
      </h1>

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/blog"
          className="text-sm font-medium hover:text-gray-900 transition-colors"
          style={{ color: '#E84C1E' }}
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
