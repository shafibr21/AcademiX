import axios from "axios";

const summarizeAbstract = async (req, res) => {
  const { abstract } = req.body;

  if (!abstract) {
    return res.status(400).send({ error: "Abstract is required" });
  }

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "chatX",
      prompt: `Summarize the following abstract:\n${abstract}`,
      stream: false,
    });

    res.send({ summary: response.data.response });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to process the request" });
  }
};

export { summarizeAbstract };
