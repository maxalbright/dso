import { addFamilyMember, getFamilyMembers } from '../../../utils/familyTreeApi'; // You need to implement these functions

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Handle GET request - list all family members
        const members = await getFamilyMembers();
        res.status(200).json(members);
    } else if (req.method === 'POST') {
        // Handle POST request - add a new family member
        const newMember = req.body;
        const addedMember = await addFamilyMember(newMember);
        res.status(201).json(addedMember);
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}