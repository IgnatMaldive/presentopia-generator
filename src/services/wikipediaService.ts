const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

export async function fetchWikipediaContent(subject: string): Promise<string[]> {
  const url = new URL("https://en.wikipedia.org/w/api.php");
  const params = {
    origin: "*",
    action: "query",
    format: "json",
    prop: "extracts",
    exintro: "true",
    explaintext: "true",
    titles: subject,
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].extract;

    // Split content into sentences and filter out empty ones
    const sentences = content
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20 && s.length < 150)
      .slice(0, 10);

    return sentences;
  } catch (error) {
    console.error("Error fetching Wikipedia content:", error);
    return [];
  }
}