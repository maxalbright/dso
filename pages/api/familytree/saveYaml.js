// pages/api/familytree/saveYaml.js
import { exec } from 'child_process';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Validate the YAML content
            const content = req.body;
            yaml.load(content); // This will throw if the YAML is invalid

            // Define the path to the YAML file
            const yamlFilePath = path.join(process.cwd(), '_familytree/family.yml');

            // Write the YAML content to the file system
            fs.writeFileSync(yamlFilePath, content, 'utf8');

            // Define the command to generate the family tree image
            const command = 'kingraph _familytree/family.yml -F svg > public/family.svg';

            // Execute the command
            await execPromise(command);

            // Respond with success
            res.status(200).json({ message: 'Family tree updated successfully' });
        } catch (error) {
            console.error('Error updating family tree:', error);
            res.status(500).json({ error: 'Error updating family tree' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
