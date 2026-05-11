import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
      prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
      prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
      prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8 prose-p:my-4
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900 dark:prose-strong:text-white
      prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:rounded-xl prose-pre:p-0 prose-pre:my-6 prose-pre:overflow-hidden prose-pre:shadow-lg
      prose-pre:code:bg-transparent prose-pre:code:text-sm prose-pre:code:p-5 prose-pre:code:block prose-pre:code:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-indigo-400 dark:prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
      prose-table:border-collapse prose-table:w-full
      prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-semibold prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700
      prose-td:p-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:text-gray-700 dark:prose-td:text-gray-300
      prose-tr:even:bg-gray-50 dark:prose-tr:even:bg-gray-800/40
      prose-ul:my-4 prose-ol:my-4
      prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1.5
      prose-img:rounded-xl prose-img:shadow-md
      prose-hr:border-gray-200 dark:prose-hr:border-gray-700
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

