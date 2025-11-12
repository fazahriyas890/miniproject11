// This service no longer uses the YouTube Data API to avoid API key issues and client-side exposure.
// Instead, it uses a public oEmbed provider (noembed.com) which is more suitable for client-side applications.

interface VideoDetails {
    title: string;
    thumbnail: string;
}

/**
 * Fetches YouTube video details using a public oEmbed endpoint (via noembed.com), which does not require an API key.
 * This is a more robust and secure method for client-side applications, avoiding CORS issues.
 * @param url The full YouTube video URL.
 * @returns A promise that resolves to the video's title and thumbnail URL.
 */
export const getYouTubeVideoDetails = async (url: string): Promise<VideoDetails> => {
    // Using noembed.com as a CORS-friendly proxy for oEmbed data.
    const apiUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Handles HTTP errors like 500 from the oEmbed service.
            throw new Error(`Could not connect to the video details service (Status: ${response.status}). Please try again later.`);
        }

        const data = await response.json();
        
        if (data.error) {
            // Handles cases where oEmbed service finds the URL invalid or can't access the video.
            throw new Error("Video not found. Please check the URL. The video may be private, age-restricted, or deleted.");
        }

        const title = data.title;
        const thumbnail = data.thumbnail_url;

        if (!title || !thumbnail) {
             throw new Error("Could not retrieve complete details for this video. Please ensure it's a valid YouTube video URL.");
        }

        return { title, thumbnail };
    } catch (error: any) {
        console.error("Error fetching YouTube video details:", error);

        // This catch block handles network errors (e.g. TypeError from fetch failing)
        // and re-throws the user-friendly messages from the try block.
        if (error.message) {
            // Re-throw our specific, user-friendly messages.
            throw new Error(error.message);
        }
        
        // Fallback for unexpected errors.
        throw new Error("An unexpected error occurred while fetching video details. Please check your internet connection and the URL.");
    }
};
