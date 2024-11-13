const fs = require('fs');
const path = require('path');
const { Client } = require('pg'); // Assuming you're using PostgreSQL for Heroku

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});
dbClient.connect();

const dataFolderPath = './data'; // Path to your data folder

// Function to update the database with problem information
async function updateProblemInDB(problemName, problemData) {
  const query = `
    INSERT INTO problems (title, status, topics, companies, description, examples, constraints, follow_up, hints, solidity_template, sol_file, t_sol_file)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT (title) 
    DO UPDATE SET
      status = EXCLUDED.status,
      topics = EXCLUDED.topics,
      companies = EXCLUDED.companies,
      description = EXCLUDED.description,
      examples = EXCLUDED.examples,
      constraints = EXCLUDED.constraints,
      follow_up = EXCLUDED.follow_up,
      hints = EXCLUDED.hints,
      solidity_template = EXCLUDED.solidity_template,
      sol_file = EXCLUDED.sol_file,
      t_sol_file = EXCLUDED.t_sol_file;
  `;
  
  await dbClient.query(query, [
    problemData.title,
    problemData.status,
    JSON.stringify(problemData.topics),
    JSON.stringify(problemData.companies),
    problemData.description,
    JSON.stringify(problemData.examples),
    JSON.stringify(problemData.constraints),
    problemData.follow_up,
    JSON.stringify(problemData.hints),
    problemData.solidity_template,
    problemData.sol_file,
    problemData.t_sol_file,
  ]);
}

// Function to read files from the data folder and update the database
async function processDataFiles() {
  const files = fs.readdirSync(dataFolderPath);
  
  // Filter for relevant files
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  for (const jsonFile of jsonFiles) {
    const baseName = jsonFile.replace('.json', '');
    const solFile = path.join(dataFolderPath, `${baseName}.sol`);
    const tSolFile = path.join(dataFolderPath, `${baseName}.t.sol`);
    
    if (fs.existsSync(solFile) && fs.existsSync(tSolFile)) {
      // Read the JSON file content
      const jsonData = JSON.parse(fs.readFileSync(path.join(dataFolderPath, jsonFile), 'utf-8'));

      // Prepare problem data for DB insertion
      const problemData = {
        title: jsonData.title,
        status: jsonData.status,
        topics: jsonData.topics,
        companies: jsonData.companies,
        description: jsonData.description,
        examples: jsonData.examples,
        constraints: jsonData.constraints,
        follow_up: jsonData.follow_up,
        hints: jsonData.hints,
        solidity_template: jsonData.solidity_template ? jsonData.solidity_template.code : '',
        sol_file: solFile,
        t_sol_file: tSolFile,
      };

      // Update database with the problem
      await updateProblemInDB(baseName, problemData);
    }
  }
}

// Trigger function on button click (admin section)
async function updateProblems() {
  try {
    await processDataFiles();
    console.log('Problems updated successfully.');
  } catch (err) {
    console.error('Error updating problems:', err);
  }
}

// Simulate trigger when button is clicked
updateProblems();
