import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../services/apiServices";

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(async () => {
                    const result = await fetchDataFromApi<T>(url);
                    setData(result);
                    setLoading(false);
                }, 1000);
            } catch (error: unknown) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};
