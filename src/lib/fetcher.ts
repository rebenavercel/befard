type FetcherOptions = {
  query?: string;
  variables?: object;
  cache?: RequestCache;
  method?: "GET" | "POST";
  headers?: HeadersInit;
  apiUrl?: string;
  next?: NextFetchRequestConfig;
  operationName?: string;
};

type ResponseWithError<T> = T & { error: any };

const wpApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}graphql`;

export async function fetcher<T>({
  query,
  variables,
  method = "POST",
  cache = "force-cache",
  headers: initHeaders,
  apiUrl = wpApiUrl,
  next,
}: FetcherOptions): Promise<ResponseWithError<T> | never> {
  const headers = new Headers(initHeaders);
  headers.set("Content-Type", "application/json");

  try {
    const response = await fetch(apiUrl, {
      method,
      headers,
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      ...(cache && { cache }),
      next: {
        ...(next?.revalidate && { revalidate: next?.revalidate }),
        tags: ["graphql", ...(next?.tags || [])],
      },
    });

    const json = await response.json();

    if (json.errors) {
      return {
        ...json.data,
        error: json.errors[0],
      };
    }

    return json.data;
  } catch (e) {
    console.error("Fetcher error:", e);
    throw e;
  }
}
