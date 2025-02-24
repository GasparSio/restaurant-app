export const fetchDataFromApi = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
};