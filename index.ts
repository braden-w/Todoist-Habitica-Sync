require("dotenv").config()

// Require express and body-parser
const express = require("express")
const app = express()
const PORT = process.env.PORT
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
  const headers = {
    "x-api-user": process.env.api_user,
    "x-api-key": process.env.api_key,
  }
  let method = "post"
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
      break
    case "item:updated":
      method = "put"
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}`
      payload = {
        text: event_data.content,
        notes: "",
        priority: event_data.priority,
      }
      break
    case "item:completed":
      // Add task first
      let alias = String(Math.floor(Math.random() * 1000000))
      // const alias = event_data.id
      console.log(
        await axios({
          method: method,
          url: "https://habitica.com/api/v3/tasks/user",
          data: {
            text: event_data.content,
            type: "todo",
            // TODO: Change event data from random
            alias: alias,
            notes: "",
            priority: event_data.priority,
          },
          headers: headers,
        })
      )
      // Then complete task
      apiURL = `https://habitica.com/api/v3/tasks/${alias}/score/up`
      break
    case "item:uncompleted":
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}/score/down`
      break
    case "item:deleted":
      method = "delete"
      apiURL = `https://habitica.com/api/v3/tasks/${event_data.id}`
      break
  }
  try {
    console.log(
      await axios({
        method: method,
        url: apiURL,
        data: payload,
        headers: headers,
      })
    )
  } catch (err) {
    console.log(err)
  }
  res.status(200).end() // Responding is important
})
// Generated by https://quicktype.io
