import axios from "axios";

const fetchComments = async (videoId: string) => {
  try {
    const API_KEY = process.env.YOUTUBE_DATA_API;
    const VIDEO_ID = videoId;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads`,
      {
        params: {
          key: API_KEY,
          part: "snippet",
          videoId: VIDEO_ID,
          order: "relevance",
          maxResults: 20,
        },
      }
    );

    const comments = response.data.items
      .map((item: any) => {
        const snippet = item.snippet.topLevelComment.snippet;
        return {
          author: snippet.authorDisplayName,
          text: snippet.textDisplay,
          likeCount: snippet.likeCount,
        };
      })
      .sort((a: any, b: any) => b.likeCount - a.likeCount)
      .slice(0, 10);

    return comments;
  } catch (err) {
    console.error(err);
    return { error: "Failed to fetch comments" };
  }
};

export default fetchComments;
