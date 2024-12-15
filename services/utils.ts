export const apiCall = async (endpoints: string) => {
  try {
    const response = await fetch(endpoints);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const objectToQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    searchParams.append(key, params[key]);
  });
  return searchParams.toString();
};
