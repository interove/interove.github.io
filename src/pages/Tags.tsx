
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Tag, Calendar } from "lucide-react";
import { usePostList } from "../hooks/usePosts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default function Tags() {
  const { posts, loading, error } = usePostList();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  // Collect tags with counts
  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const tagColors = [
    "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  ];

  const getTagColor = (_tag: string, idx: number) => tagColors[idx % tagColors.length];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        返回首页
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
          <Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            标签分类
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            共 {allTags.length} 个标签
          </p>
        </div>
      </div>

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSearchParams({})}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                !activeTag
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400"
              }`}
            >
              全部 ({posts.length})
            </button>
            {allTags.map(([tag, count], idx) => (
              <button
                key={tag}
                onClick={() => setSearchParams({ tag })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeTag === tag
                    ? getTagColor(tag, idx) + " border-current font-semibold"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400"
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
                <span className="text-xs opacity-70">({count})</span>
              </button>
            ))}
          </div>

          {/* Posts under tag */}
          {activeTag && (
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              标签「<span className="text-gray-900 dark:text-white font-medium">{activeTag}</span>」下共 {filtered.length} 篇文章
            </div>
          )}

          <div className="space-y-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/post/${post.slug}`}
                className="flex items-start justify-between gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 line-clamp-1">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(post.date), "yyyy年M月d日", { locale: zhCN })}
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-1.5 py-0.5 rounded border ${getTagColor(tag, allTags.findIndex(([t]) => t === tag))}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
