require("dotenv").config()

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
  // console.log(event_data, event_name)
  const authHeaders = {
    headers: {
      "x-api-user": process.env.api_user,
      "x-api-key": process.env.api_key,
    },
  }
  let apiURL = ""
  let payload = {}
  let axiosFunction = axios.post
  switch (event_name) {
    case "item:added":
      apiURL = "https://habitica.com/api/v3/tasks/user"
      payload = {
        text: event_data.content,
        type: "todo",
        alias: event_data.id,
        notes: "",
        priority: event_data.priority,
      }

      console.log(await axios.post(apiURL, payload, authHeaders))
      break
    case "item:updated":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}`
      payload = {
        text: event_data.content,
        notes: "",
        priority: event_data.priority,
      }
      console.log(await axios.put(apiURL, payload, authHeaders))
      break
    case "item:completed":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}/score/up`
      console.log(await axios.post(apiURL, payload, authHeaders))
      break
    case "item:uncompleted":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}/score/down`
      console.log(await axios.post(apiURL, payload, authHeaders))
      break
    case "item:deleted":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}`
      console.log(await axios.delete(apiURL, payload, authHeaders))
      break
  }
  res.status(200).end() // Responding is important
})
// Generated by https://quicktype.io
