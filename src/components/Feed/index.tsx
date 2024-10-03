import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '../../types/feedTypes';
import ErrorMessage from '../ErrorMessage';
import PostItem from '../PostItem';
import {
  API_URL,
  DATA_TYPE_ERROR,
  FETCH_FAIL_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE
} from './constants';
import './index.css';

export default function Feed() {
  const dataFetchedRef = useRef(false);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?skip=${page * 6}`);
      if (!response.ok) {
        setError(FETCH_FAIL_MESSAGE);
        return;
      }

      const json = await response.json();

      if (Array.isArray(json?.data)) {
        setPosts((prevPosts) => [...prevPosts, ...json.data]);
        setHasMore(json.hasMore ?? false);
      } else {
        console.error(DATA_TYPE_ERROR);
        setError(DATA_TYPE_ERROR);
        setHasMore(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(UNEXPECTED_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
      dataFetchedRef.current = false
    }
  }, [page]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    fetchData();
  }, [fetchData]);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prev => prev + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <main>
      <div className="posts">
        {posts.map((post, index) =>
          <div
            key={post.id}
            {...(index === posts.length - 1 ? { ref: lastPostElementRef } : {})}
          >
            <PostItem post={post} />
          </div>
        )}
      </div>
    </main>
  );
}
