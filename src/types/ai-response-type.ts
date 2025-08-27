type VideoEvaluationType = {
  score: number;
  verdict: "Worth Watching" | "Mixed" | "Skip";
  summary: string;
  reasons: string[];
};

export default VideoEvaluationType;
