import { deleteFamilyMember, getFamilyMember, updateFamilyMember } from '../../../utils/familyTreeApi'; // You need to implement these functions

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        // Handle GET request - get a single family member
        const member = await getFamilyMember(id);
        res.status(200).json(member);
    } else if (req.method === 'PUT') {
        // Handle PUT request - update a family member
        const updatedMember = req.body;
        const member = await updateFamilyMember(id, updatedMember);
        res.status(200).json(member);
    } else if (req.method === 'DELETE') {
        // Handle DELETE request - delete a family member
        await deleteFamilyMember(id);
        res.status(204).end();
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}