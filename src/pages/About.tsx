import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Coffee } from "lucide-react";

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        返回首页
      </Link>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl flex-shrink-0">
            👨‍💻
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              关于我
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              一个热爱代码与写作的开发者
            </p>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium"
              >
                Twitter
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed">
          <p className="text-gray-700 dark:text-gray-300">
            你好！我是一名全栈开发者，专注于 Web 开发和开源技术。喜欢探索新的工具和技术，也热衷于将复杂的概念用通俗的语言表达出来。
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            这个博客是我记录技术学习、分享读书心得和日常思考的地方。写作对我而言是梳理思路的过程，如果我的文章对你有帮助，那将是我最大的欣慰。
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          技能栈
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "TypeScript", "React", "Next.js", "Vite",
            "Node.js", "Python", "Tailwind CSS",
            "PostgreSQL", "Docker", "Git",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Info */}
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            关于这个博客
          </h2>
        </div>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">▸</span>
            使用 <strong className="text-gray-900 dark:text-white">React + Vite + Tailwind CSS</strong> 构建
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">▸</span>
            部署于 <strong className="text-gray-900 dark:text-white">GitHub Pages</strong>，自动 CI/CD
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">▸</span>
            文章以 <strong className="text-gray-900 dark:text-white">Markdown</strong> 编写，支持代码高亮、表格、GFM 语法
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">▸</span>
            新增文章只需在 <code className="text-xs bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">public/posts/</code> 目录下添加 MD 文件
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">▸</span>
            支持 <strong className="text-gray-900 dark:text-white">暗色模式</strong>、响应式布局
          </li>
        </ul>
      </div>
    </main>
  );
}
