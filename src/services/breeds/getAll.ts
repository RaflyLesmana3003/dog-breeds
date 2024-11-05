export type BreedResponse = {
  message: {
    [breed: string]: string[];
  };
  status: 'success';
};

export async function getAllBreeds(): Promise<BreedResponse> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
}

