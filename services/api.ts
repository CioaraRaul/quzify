const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST;

export async function fetchData(endpoint: string) {
  try {
    const headers: Record<string, string> = {};
    if (API_KEY) headers["X-RapidAPI-Key"] = API_KEY;
    if (API_HOST) headers["X-RapidAPI-Host"] = API_HOST;

    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function CatergortiesBySubject(subject_category: string) {
  try {
    const headers: Record<string, string> = {};
    if (API_KEY) headers["X-RapidAPI-Key"] = API_KEY;
    if (API_HOST) headers["X-RapidAPI-Host"] = API_HOST;

    const response = await fetch(
      `${API_URL}/subject-categories?subject=${subject_category}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching categories by subject:", error);
    throw error;
  }
}
//https://gk-quiz.p.rapidapi.com/api/v1/category-questions?categoryID=67a3757721723ec51501a1a3
export async function quizByCategoryID(categoryID: string) {
  try {
    const headers: Record<string, string> = {};
    if (API_KEY) headers["X-RapidAPI-Key"] = API_KEY;
    if (API_HOST) headers["X-RapidAPI-Host"] = API_HOST;

    const response = await fetch(
      `${API_URL}/category-questions?categoryID=${categoryID}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching quiz by category ID:", error);
    throw error;
  }
}
