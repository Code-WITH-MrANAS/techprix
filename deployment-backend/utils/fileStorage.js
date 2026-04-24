const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Save data to a text file (JSON format)
 * @param {string} filename - Name of the file (e.g., 'contacts.txt')
 * @param {Object} data - Data to save
 */
const saveToFile = (filename, data) => {
  try {
    const filepath = path.join(dataDir, filename);
    let existingData = [];

    // Read existing data if file exists
    if (fs.existsSync(filepath)) {
      const content = fs.readFileSync(filepath, 'utf8');
      existingData = content.trim() ? JSON.parse(content) : [];
    }

    // Add new data with timestamp
    const newEntry = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    existingData.push(newEntry);

    // Write back to file
    fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ Data saved to ${filename}`);

    return newEntry;
  } catch (error) {
    console.error(`❌ File storage error (${filename}):`, error.message);
    throw error;
  }
};

/**
 * Read all data from a text file
 * @param {string} filename - Name of the file
 * @returns {Array} Array of saved records
 */
const readFromFile = (filename) => {
  try {
    const filepath = path.join(dataDir, filename);

    if (!fs.existsSync(filepath)) {
      console.log(`ℹ️ File not found: ${filename}, returning empty array`);
      return [];
    }

    const content = fs.readFileSync(filepath, 'utf8');
    return content.trim() ? JSON.parse(content) : [];
  } catch (error) {
    console.error(`❌ File read error (${filename}):`, error.message);
    return [];
  }
};

/**
 * Get data by ID
 * @param {string} filename - Name of the file
 * @param {string} id - Record ID
 * @returns {Object|null} Found record or null
 */
const getById = (filename, id) => {
  try {
    const data = readFromFile(filename);
    return data.find((item) => item.id === id) || null;
  } catch (error) {
    console.error(`❌ Get by ID error:`, error.message);
    return null;
  }
};

/**
 * Delete a record by ID
 * @param {string} filename - Name of the file
 * @param {string} id - Record ID
 * @returns {boolean} Success status
 */
const deleteById = (filename, id) => {
  try {
    const filepath = path.join(dataDir, filename);
    let data = readFromFile(filename);
    const originalLength = data.length;

    data = data.filter((item) => item.id !== id);

    if (data.length < originalLength) {
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Record deleted from ${filename}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Delete error:`, error.message);
    return false;
  }
};

/**
 * Clear all data from a file
 * @param {string} filename - Name of the file
 */
const clearFile = (filename) => {
  try {
    const filepath = path.join(dataDir, filename);
    fs.writeFileSync(filepath, '[]', 'utf8');
    console.log(`✅ File cleared: ${filename}`);
  } catch (error) {
    console.error(`❌ Clear error:`, error.message);
  }
};

module.exports = {
  saveToFile,
  readFromFile,
  getById,
  deleteById,
  clearFile,
};
