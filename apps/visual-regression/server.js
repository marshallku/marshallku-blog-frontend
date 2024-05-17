const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const port = 8083;

const filePath = path.resolve("..", "docs", "storybook-static");

app.use(express.static(filePath));

app.use("*", (_, res) => {
    res.sendFile(path.join(filePath, "index.html"));
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
