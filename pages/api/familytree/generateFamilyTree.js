// pages/api/generateFamilyTree.js
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log("Trying Command");
            // Define the command to execute
            const command = 'kingraph public/family.yml -F svg > public/family.svg';

            // Execute the command
            await execPromise(command);

            // Respond with the path to the generated PNG file
            res.status(200).json({ filePath: '/public/family.svg' });
        } catch (error) {
            console.error('Error generating family tree:', error);
            res.status(500).json({ error: 'Error generating family tree' });
        }
    } else {
        // Handle any other HTTP method
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
