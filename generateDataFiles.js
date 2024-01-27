const fs = require('fs');
const path = require('path');

// Function to generate random text of a specified length
const generateRandomText = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// Function to create a file with random text content
const createRandomFile = (fileName, sizeInBytes) => {
    return new Promise((resolve, reject) => {
        const fileSizeInKB = Math.ceil(sizeInBytes / 1024);
        const randomText = generateRandomText(fileSizeInKB);
        const filePath = path.join('/tmp/data', fileName);

        const stream = fs.createWriteStream(filePath);
        stream.write(randomText.repeat(Math.ceil(sizeInBytes / randomText.length)));
        stream.end();

        stream.on('finish', () => {
            resolve();
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

// Function to create sample data files
const createSampleDataFiles = async (numFiles, fileSizeInMB) => {
    const sizeInBytes = fileSizeInMB * 1024 * 1024;
    try {
        // Create the directory if it doesn't exist
        fs.mkdirSync('/tmp/data', { recursive: true });

        // Generate and create each sample data file
        for (let i = 1; i <= numFiles; i++) {
            const fileName = `${i}.txt`;
            await createRandomFile(fileName, sizeInBytes);
            console.log(`File ${fileName} created successfully.`);
        }
    } catch (err) {
        console.error('Error creating sample data files:', err);
    }
};

// Define the number of files and size of each file in MB
const numFiles = 30;
const fileSizeInMB = 100;

// Create sample data files
createSampleDataFiles(numFiles, fileSizeInMB);
