import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { usePostList } from "../hooks/usePosts";
import { format } from "date-fns";

export default function Archive() {
  const { posts, loading, error } = usePostList();

  // Group by year
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

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
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            文章归档
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            共 {posts.length} 篇文章
          </p>
        </div>
      </div>

      {loading && (
        <div className="space-y-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 mb-4" />
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="h-12 bg-gray-100 dark:bg-gray-800/60 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
          ⚠️ 加载失败：{error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          {years.map((year) => (
            <section key={year}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {year}
                </h2>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {grouped[year].length} 篇
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="space-y-2">
                {grouped[year].map((post) => (
                  <Link
                    key={post.slug}
                    to={`/post/${post.slug}`}
                    className="flex items-start sm:items-center justify-between gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs text-gray-400 dark:text-gray-500 w-14 flex-shrink-0 mt-1 sm:mt-0 font-mono">
                        {format(new Date(post.date), "MM-dd")}
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {post.title}
                      </span>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-1 flex-shrink-0">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
