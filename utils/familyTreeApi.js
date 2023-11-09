import fs from 'fs';
import { join } from 'path';

// const fs = require('fs');
// const path = require('path');

// Path to the JSON file
const DATA_FILE = join(process.cwd(), '_familytree', 'familytree.json');

// Read the data file and parse the JSON
const readDataFile = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

// Write the data to the JSON file
const writeDataFile = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Get a single family member by ID
const getFamilyMember = (id) => {
    const members = readDataFile();
    return members.find((member) => member.id === id);
};

// Update a family member by ID
const updateFamilyMember = (id, updatedMember) => {
    let members = readDataFile();
    members = members.map((member) => (member.id === id ? { ...member, ...updatedMember } : member));
    writeDataFile(members);
    return getFamilyMember(id); // Return the updated member
};

// Delete a family member by ID
const deleteFamilyMember = (id) => {
    let members = readDataFile();
    members = members.filter((member) => member.id !== id);
    writeDataFile(members);
};

const addFamilyMember = (newMember) => {
    const members = readDataFile();
    newMember.id = Date.now().toString(); // Simple way to generate a unique ID
    members.push(newMember);
    writeDataFile(members);
    return newMember;
};

// Get all family members
const getFamilyMembers = () => {
    return readDataFile();
};

const getFamilyTree = () => {
    // This could be a more complex function if your data structure is more complex
    return getFamilyMembers();
};

// Save the entire family tree
const saveFamilyTree = (familyTree) => {
    // This would overwrite the existing data with the new family tree
    writeDataFile(familyTree);
};

module.exports = {
    getFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addFamilyMember,
    getFamilyMembers,
    getFamilyTree,
    saveFamilyTree,
};