
import { useState, useEffect } from "react";
import { PostMeta, Post } from "../types";

// Vite exposes BASE_URL at build time
declare const __VITE_BASE__: string;
const BASE = (typeof import.meta !== "undefined" && (import.meta as any).env?.BASE_URL || "/").replace(/\/$/, "");

export function usePostList() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE}/posts/index.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load post index");
        return r.json();
      })
      .then((data: PostMeta[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sorted);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setPost(null);

    const metaPromise = fetch(`${BASE}/posts/index.json`).then((r) => {
      if (!r.ok) throw new Error("Failed to load post index");
      return r.json() as Promise<PostMeta[]>;
    });

    const contentPromise = fetch(`${BASE}/posts/${slug}.md`).then((r) => {
      if (!r.ok) throw new Error("Post not found");
      return r.text();
    });

    Promise.all([metaPromise, contentPromise])
      .then(([metas, rawContent]) => {
        const meta = metas.find((m) => m.slug === slug);
        if (!meta) throw new Error("Post metadata not found");
        // Strip front matter
        const content = rawContent.replace(/^---[\s\S]*?---\n?/, "");
        setPost({ ...meta, content });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
