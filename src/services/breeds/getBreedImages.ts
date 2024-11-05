export async function getBreedImages(breed: string): Promise<string> {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching random breed image:', error);
    throw error;
  }
}
