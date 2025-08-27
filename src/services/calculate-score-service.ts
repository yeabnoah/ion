import aiVideoAnalysis from "./ai-video-anlysis-service";
import getVideoInfo from "./get-video-info-service";

const calculateScore = async (videoInfo: any) => {
  const { likes, dislikes, viewCount } = await getVideoInfo(videoInfo.videoId);

  const aiResponse = await aiVideoAnalysis(videoInfo.comments);

  const likeDislikeRatio = Math.min((likes / (likes + dislikes)) * 50, 50);
  const likeViewRatio = Math.min((likes / viewCount) * 30, 30);
  const aiScore = Math.min(aiResponse.score * 20, 20);

  const score = Math.min(likeDislikeRatio + likeViewRatio + aiScore, 100);

  return {
    score,
    verdict: aiResponse.verdict,
    summary: aiResponse.summary,
    reasons: aiResponse.reasons,
  };
};

export default calculateScore;
