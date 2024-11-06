export async function getRandomImage(): Promise<string> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching random dog image:', error);
    throw error;
  }
}
