
const express = require("express");
// const cors = require("cors");
const app = express();

// app.use(cors());
app.use(express.json());
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid input" });
  }
  res.json({ sum: a + b });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
