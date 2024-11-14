const fs = require('fs');
const path = require('path');
const { Client } = require('pg'); // PostgreSQL client

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});
dbClient.connect();

const dataFolderPath = './data'; // Path to data folder

// Function to insert or update a problem in the database
async function loadProblemInDB(problemData) {
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

// Function to process files in the data folder and load them into the database
async function loadProblemsFromFiles() {
  const files = fs.readdirSync(dataFolderPath);
  
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  for (const jsonFile of jsonFiles) {
    const baseName = jsonFile.replace('.json', '');
    const solFile = path.join(dataFolderPath, `${baseName}.sol`);
    const tSolFile = path.join(dataFolderPath, `${baseName}.t.sol`);
    
    if (fs.existsSync(solFile) && fs.existsSync(tSolFile)) {
      const jsonData = JSON.parse(fs.readFileSync(path.join(dataFolderPath, jsonFile), 'utf-8'));

      // Prepare data to load into DB
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

      // Insert or update the problem into DB
      await loadProblemInDB(problemData);
    }
  }
}

// Trigger loading process
async function updateProblems() {
  try {
    await loadProblemsFromFiles();
    console.log('Problems loaded successfully.');
  } catch (err) {
    console.error('Error loading problems:', err);
  }
}

updateProblems(); // Start the process
