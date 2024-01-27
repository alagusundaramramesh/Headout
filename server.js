const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.get('/data', (req, res) => {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
        return res.status(400).json({ error: "File name (n) is required" });
    }

    const filePath = `/tmp/data/${fileName}.txt`;

    if (lineNumber) {
        try {
            const lineStream = fs.createReadStream(filePath, { encoding: 'utf8' });
            let currentLine = 0;

            lineStream.on('data', (chunk) => {
                const lines = chunk.split('\n');
                for (const line of lines) {
                    currentLine++;
                    if (currentLine === parseInt(lineNumber)) {
                        res.send(line);
                        return;
                    }
                }
            });

            lineStream.on('end', () => {
                res.status(400).json({ error: "Invalid line number (m)" });
            });
        } catch (err) {
            res.status(404).json({ error: "File not found" });
        }
    } else {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(404).json({ error: "File not found" });
            } else {
                res.send(data);
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




