import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/Header";
import { getFamilyTree, saveFamilyTree } from "../../utils/familyTreeApi"; // You'll need to implement this API
import FamilyMemberForm from "./familymemberform"; // You'll need to create this component
import FamilyTree from "./familytree"; // You'll need to create this component

const FamilyTreePage = () => {
  const router = useRouter();
  const [familyTree, setFamilyTree] = useState([]);

  useEffect(() => {
    // Load the family tree data when the component mounts
    getFamilyTree().then(data => {
      setFamilyTree(data);
    }).catch(error => {
      console.error("Failed to load family tree:", error);
      // Handle the error appropriately in your UI
    });
  }, []);

  const addFamilyMember = (member) => {
    const updatedFamilyTree = [...familyTree, member];
    saveFamilyTree(updatedFamilyTree).then(() => {
      setFamilyTree(updatedFamilyTree);
      router.reload();
    });
  };

  const editFamilyMember = (updatedMember) => {
    const updatedFamilyTree = familyTree.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );
    saveFamilyTree(updatedFamilyTree).then(() => {
      setFamilyTree(updatedFamilyTree);
      router.reload();
    });
  };

  const deleteFamilyMember = (memberId) => {
    const updatedFamilyTree = familyTree.filter((member) => member.id !== memberId);
    saveFamilyTree(updatedFamilyTree).then(() => {
      setFamilyTree(updatedFamilyTree);
      router.reload();
    });
  };

  return (
    <>
      <Head>
        <title>Family Tree</title>
      </Head>
      <Header />
      <FamilyTree familyTree={familyTree} onEdit={editFamilyMember} onDelete={deleteFamilyMember} />
      <FamilyMemberForm onSubmit={addFamilyMember} />
    </>
  );
};

export async function getServerSideProps() {
  // Assuming `getFamilyTree` is a function that fetches data from your server-side storage
  const initialFamilyTree = await getFamilyTree();
  return {
    props: {
      initialFamilyTree,
    },
  };
}

export default FamilyTreePage;
