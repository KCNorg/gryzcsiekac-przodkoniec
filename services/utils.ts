export const apiCall = async (endpoints: string) => {
  try {
    const response = await fetch(endpoints);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
