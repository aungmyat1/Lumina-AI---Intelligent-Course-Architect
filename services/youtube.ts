
// In a real app, this would use the YouTube Data API v3
// For this demo, we'll return a deterministic "educational" video ID based on the title
// and mock the search results.

export const searchYouTubeVideo = async (query: string): Promise<string> => {
  // Simple hashing to get a "relevant" looking mock video from a pool of educational IDs
  const educationalVideos = [
    "L_oK-L6L27E", // AI explained
    "S0_qX4VJhMQ", // React Tutorial
    "kumT5T76C48", // Python for Beginners
    "pQN-pnXPaVg", // Web Dev Roadmap
    "aircAruvnKk", // Science
    "yN7ypxC7838", // History
    "8hP9D6kZseM", // Math
  ];
  
  const index = Math.abs(query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % educationalVideos.length;
  return educationalVideos[index];
};
