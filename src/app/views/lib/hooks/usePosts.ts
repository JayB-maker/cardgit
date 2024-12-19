import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function usePosts() {
  const fetchPosts = `/api/posts`;

  const { data, error, isLoading, mutate } = useSWR<[]>(fetchPosts, fetcher, {
    revalidateOnFocus: false, // Prevents refetching when the page regains focus
    revalidateOnReconnect: true, // Refetches if the network reconnects
    dedupingInterval: 10000, // Cache data for 60 seconds before considering revalidation
  });

  return { data, error, isLoading };
}
