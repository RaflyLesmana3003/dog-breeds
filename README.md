# Dog Breeds React Project

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Firestore Data Structure](#firestore-data-structure)
- [Security](#security)
- [Refactoring with Node.js Firebase Function](#refactoring-with-nodejs-firebase-function)

## Introduction

This project is a React application that provides information about different dog breeds. It features:

- **Breed Information:** Detailed descriptions of various dog breeds, including their physical characteristics, temperament, and unique traits.
- **Breed Images:** A gallery of images for each breed, allowing users to visualize their appearance.
- **Favorite Breeds:** Users can save their favorite breeds to a personalized list.
- **Games:** Interactive games related to dog breeds, such as a breed guessing game. (Coming soon)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://RaflyLesmana3003/dog-breeds.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd dog-breeds
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.

## Demo

You can view a live demo of the application at https://dog-breeds-2d28a.web.app/user.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Firebase:** Backend services for authentication, database, and storage.
- **@tanstack/react-router:** Routing library for navigation.
- **@google/generative-ai:** Library for using Gemini AI models to generate detailed breed information.
- **shadcn:** UI components library for building beautiful and accessible user interfaces.

## Firestore Data Structure

**Favorites Collection:**

| Field | Data Type | Description |
|---|---|---|
| `breed` | String | The name of the dog breed. |
| `imageUrl` | String | The URL of the breed's image. |
| `id` | String | The unique ID of the document. |
| `userId` | String | The user's ID who added the favorite. |
| `userName` | String | The user's display name. |
| `totalLikes` | Number | The total number of likes the breed has received. |
| `createdAt` | Timestamp | The timestamp when the favorite was added. |
| `updatedAt` | Timestamp | The timestamp when the favorite was last updated. |
| `likedBy` | Array of Strings | An array of user IDs who have liked the breed. |

**Example Document:**

```json
{
  "breed": "Golden Retriever",
  "imageUrl": "https://images.dog.ceo/breeds/goldenretriever/n02099712_1003.jpg",
  "id": "some-unique-id",
  "userId": "user123",
  "userName": "John Doe",
  "totalLikes": 10,
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z",
  "likedBy": ["user123", "user456"]
}
```

## Security

The solution is secure because:

- **Authentication:** Users must be authenticated before they can add favorites or like breeds. This prevents unauthorized access to user data.
- **Firestore Security Rules:** Firestore security rules can be implemented to restrict access to data based on user roles or permissions. For example, only authenticated users can read and write to the `favorites` collection.
- **Data Validation:** Data validation can be implemented to ensure that only valid data is stored in the database. For example, the `breed` field can be validated to ensure that it is a valid dog breed.

## Refactoring with Node.js Firebase Function

**Task:**

Create a Node.js Firebase function that connects to the `dog.ceo` API endpoint (`https://dog.ceo/api/breeds/list/all`) and fattens the data into a single array of strings.

**Considerations:**

- **API Request:** The function should make a request to the `dog.ceo` API endpoint to retrieve the list of all dog breeds.
- **Data Parsing:** The response from the API should be parsed and transformed into a single array of strings, where each string represents a dog breed.
- **Error Handling:** The function should handle potential errors during the API request or data parsing.
- **Deployment:** The function should be deployed to Firebase to be accessible from the application.

**Unit Test Approach:**

**Example Unit Test:**

```javascript
import { getBreeds } from './getBreeds'; 
describe('getBreeds', () => {
  it('should return an array of dog breeds', async () => {
    const breeds = await getBreeds();
    expect(breeds).toBeInstanceOf(Array);
    expect(breeds.length).toBeGreaterThan(0);
    expect(breeds[0]).toBeTypeOf('string');
  });
});
```

**Parts of the Code to Test:**

- **API Request:** Verify that the function makes a request to the correct API endpoint.
- **Data Parsing:** Ensure that the response from the API is parsed correctly and transformed into a single array of strings.
- **Error Handling:** Test the function's ability to handle errors during the API request or data parsing.

**Conclusion:**

By implementing these security measures, refactoring the solution with a Node.js Firebase function, and writing unit tests, we can ensure that the application is secure, reliable, and scalable.
