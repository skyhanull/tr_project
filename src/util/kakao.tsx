interface SearchOptions {
  category_group_code?: string;
  page?: number;
  size?: number;
}

export async function searchPlaces(
  query?: string,
  options: SearchOptions = {}
): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY;
  let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;
  if (options.category_group_code) {
    url += `&category_group_code=${options.category_group_code}`;
  }
  if (options.page) {
    url += `&page=${options.page}`;
  }
  if (options.size) {
    url += `&size=${options.size}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = await response.json();

  return data;
}
