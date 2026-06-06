import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const all = getAllPosts()
  const category = searchParams?.category
  const posts = category ? all.filter(p => p.category === category) : all

  const categories = [
    { key: undefined,        label: 'All Posts'   },
    { key: 'gut-health',    label: 'Gut Health'  },
    { key: 'books',         label: 'Books'       },
    { key: 'personal',      label: 'Personal'    },
    { key: 'agentic-ai',   label: 'Agentic AI'  },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black mb-2">All Posts</h1>
      <p className="text-gray-500 mb-8">
        {all.length} post{all.length !== 1 ? 's' : ''} · gut health, building a startup, learning AI
      </p>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map(c => {
          const active = category === c.key
          return (
            <a
              key={c.label}
              href={c.key ? `/blog?category=${c.key}` : '/blog'}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                active
                  ? 'text-white border-transparent'
                  : 'text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
              style={active ? { background: '#E84C1E', borderColor: '#E84C1E' } : {}}
            >
              {c.label}
            </a>
          )
        })}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No posts in this category yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      )}
    </div>
  )
}
