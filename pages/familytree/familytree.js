import React from 'react';

const FamilyMemberNode = ({ member, onEdit, onDelete }) => {
    return (
        <div className="family-member">
            <div className="member-details">
                <h3>{member.name}</h3>
                <p>Born: {member.birthDate}</p>
                {member.deathDate && <p>Died: {member.deathDate}</p>}
                <button onClick={() => onEdit(member)}>Edit</button>
                <button onClick={() => onDelete(member.id)}>Delete</button>
            </div>
            {member.children && member.children.length > 0 && (
                <div className="member-children">
                    {member.children.map((child) => (
                        <FamilyMemberNode key={child.id} member={child} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

const FamilyTree = ({ familyTree, onEdit, onDelete }) => {
    // Assuming `familyTree` is an array of root family members
    return (
        <div className="family-tree">
            {familyTree.map((member) => (
                <FamilyMemberNode key={member.id} member={member} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default FamilyTree;