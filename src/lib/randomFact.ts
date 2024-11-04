const randomFacts = [
  "Dogs can hear sounds four times farther away than humans can.",
  "The Basenji dog breed doesn't bark; it makes yodel-like sounds.",
  "A Greyhound can reach speeds up to 45 miles per hour.",
  "Dalmatians are born completely white, developing spots as they grow.",
  "Dogs have three eyelids, including one that moisturizes their eyes.",
  "A dog's sense of smell is 10,000 to 100,000 times stronger than a human's.",
  "Dogs can't sweat like humans; they pant to cool down.",
  "The average lifespan of a dog is 10-13 years.",
  "Dogs can understand up to 250 words and gestures.",
  "The world's smallest dog breed is the Chihuahua.",
  "Dogs have a special organ in their noses called the vomeronasal organ, which helps them detect pheromones.",
  "A dog's tail wagging doesn't always mean they're happy; it can also indicate excitement or anxiety.",
  "Dogs can be trained to detect medical conditions like cancer and low blood sugar.",
  "The oldest dog breed is the Saluki, which dates back over 7,000 years.",
  "Dogs can experience emotions like joy, sadness, fear, and anger.",
];

export function getRandomFact() {
  const randomIndex = Math.floor(Math.random() * randomFacts.length);
  return randomFacts[randomIndex];
}
