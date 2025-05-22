const axios = require("axios");

let todos = [];

exports.summarizeAndSend = async (req, res) => {
  try {
    const todosText = todos.map(t => `- ${t.task}`).join("\n");
    const prompt = `Summarize the following to-do list:\n${todosText}`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content;

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Todo Summary:*\n${summary}`,
    });

    res.json({ message: "Summary sent to Slack." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize or send to Slack." });
  }
};