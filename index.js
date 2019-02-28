const server = require("./server");

const port = process.env.PORT || 5000;
server.listen(port, _ => {
  console.log(`Server running on port ${port}`);
});
