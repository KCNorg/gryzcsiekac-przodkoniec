export const apiCall = async (endpoints: string) => {
  try {
    const response = await fetch(endpoints);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
