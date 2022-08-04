export const fetchData = async <T>(url: URL): Promise<T> => {
  const response = await fetch(url);
  const { ok, status, statusText } = response;

  if (!ok)
    throw new Error(`Failed to fetch the table data: ${status}, ${statusText}`);

  return response.json();
};
