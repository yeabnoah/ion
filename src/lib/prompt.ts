const getPrompt = (comments: any) => {
  const prompt = `You are an assistant that evaluates YouTube videos based solely on user comments and engagement metrics. 
You will be given a list of comments (each with author, text, and likeCount). 

Your task:
1. Summarize the general sentiment of the viewers.
2. Rate the video on a scale of 0–100, where 0 = complete waste of time and 100 = extremely useful/entertaining.
3. Provide a short verdict: "Worth Watching", "Mixed", or "Skip" based on the numeric score.
4. Give 1–2 reasons supporting your verdict.
5. Keep the response concise (3–5 sentences max).

Here is the data:

${JSON.stringify(comments)}

Respond in JSON format like this:

{
  "score": 85,
  "verdict": "Worth Watching",
  "summary": "Most viewers found the tutorial clear and helpful. Some asked questions about edge cases, but overall positive feedback.",
  "reasons": [
    "High engagement on detailed, technical questions.",
    "Many comments praise clarity and usefulness of the tutorial."
  ]
}
`;

  return prompt;
};

export default getPrompt;
