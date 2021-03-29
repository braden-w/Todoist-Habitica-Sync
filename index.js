// Require express and body-parser
const express = require("express")
const app = express()
const PORT = 3000

// Tell express to use body-parser's JSON parsing
app.use(express.json())

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

app.get("/", (req, res) => {
  res.send("Hello!")
})

app.post("/hook", (req, res) => {
  console.log(req.body) // Call your action on the request here
  const { event_data, event_name } = req.body
  console.log(event_data, event_name)
  res.status(200).end() // Responding is important
})
