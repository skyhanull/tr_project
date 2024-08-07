"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Place } from "@/utility/interface/listInterface";
import { searchPlaces } from "@/utility/kakao";

export const usePlaces = (
  filterChip: string,
  currentPage: number,
  search: string | undefined
) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = usePathname();

  const fetchData = async (collection: string = ""): Promise<void> => {
    setIsLoading(true);
    try {
      const url = collection
        ? `/api/mapArray?collectionName=${
            router?.split("/")[2]
          }_list&filter=${filterChip}`
        : `/api/mapArray`;
      const res = await fetch(url);
      const data = await res.json();
      setPlaces(data);
      setTotalPages(Math.ceil(data.length / 10)); // Adjust if your API provides total count
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlaces = async () => {
    setIsLoading(true);
    try {
      const options = {
        size: 10,
        page: currentPage,
        category_group_code: filterChip,
        filter: search,
      };
      const results = await searchPlaces(search, options);
      setTotalPages(Math.ceil(results.meta.total_count / 10));
      setPlaces(results.documents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filterChip === "loc" || filterChip === "fes") {
      fetchData(filterChip);
    } else {
      fetchPlaces();
    }
  }, [filterChip, currentPage, search]);

  return { places, totalPages, isLoading, error };
};
