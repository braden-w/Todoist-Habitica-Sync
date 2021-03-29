// Require express and body-parser
const express = require("express")
const app = express()
const PORT = 3000
const axios = require("axios")

// Tell express to use body-parser's JSON parsing
app.use(express.json())

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

app.get("/", (req, res) => {
  res.send("Hello!")
})

app.post("/hook", async (req, res) => {
  const { event_data, event_name } = req.body
  console.log(event_data, event_name)
  let apiURL = ""
  switch (event_name) {
    case "item:added":
      apiURL = "https://habitica.com/api/v3/tasks/user"
      break
    case "item:updated":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}`
      break
    case "item:completed":
      apiURL = `habitica.com/api/v3/tasks/${event_data.id}/score/up`
      break
    case "item:uncompleted":
      apiURL = `habitica.com/api/v3/tasks/${event_data.id}/score/down`
      break
    case "item:deleted":
      apiURL = `habitica.com/api/v3/tasks/${event_data.id}`
      break
  }
  const payload = {
    text: event_data.content,
    type: "todo",
    notes: "",
    priority: event_data.priority,
  }
  try {
    const res = await axios.post(
      "https://habitica.com/api/v3/tasks/user",
      payload,
    )
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  } catch (error) {
    console.error(error)
  }
  res.status(200).end() // Responding is important
})
// Generated by https://quicktype.io
