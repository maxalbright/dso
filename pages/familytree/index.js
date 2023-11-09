import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../../utils";

const FamilyTree = () => {
  const text = useRef();
  const showBlog = useRef(data.showBlog);
  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState('/family.svg'); // Default image URL
  const router = useRouter(); // Initialize useRouter

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
    // Fetch the latest family tree image on mount
    fetchFamilyTreeImage();
  }, []);

  // Function to fetch the latest family tree image
  const fetchFamilyTreeImage = async () => {
    // Fetch the image URL from the server or local state
    // This URL should point to the latest generated family tree image
    setImageUrl('/family.svg'); // Update with the correct path
  };

  // Function to navigate to the edit page
  const handleEditFamilyTree = () => {
    router.push('/familytree/edit');
  };

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Family Tree</title>
        </Head>
        <div className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"}`}>
          <Header isBlog={true}></Header>
          <div className="mt-10 text-center">
            <h1 ref={text} className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full">
              Family Tree.
            </h1>
            <img
              src="/family.svg"
              alt="Family Tree"
              style={{ width: '80%', display: 'block', margin: 'auto' }}
            />
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            {/* Update the onClick event to handleEditFamilyTree */}
            <Button type={"primary"} onClick={handleEditFamilyTree}>
              Edit Family Tree +
            </Button>
          </div>
        )}
      </>
    )
  );
};

export default FamilyTree;
