// pages/familytree/edit.js
import fs from 'fs';
import yaml from "js-yaml";
import Head from "next/head";
import { useRouter } from "next/router";
import path from 'path';
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../../utils";
const EditFamilyTree = ({ initialYamlContent }) => {
    const [yamlContent, setYamlContent] = useState(initialYamlContent);
    const [error, setError] = useState('');

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

    }, []);

    const handleYamlChange = (event) => {
        setYamlContent(event.target.value);
    };

    const handleUpdateFamilyTree = async () => {
        try {
            // Validate YAML
            yaml.load(yamlContent);
            // Save the YAML content to the server
            const response = await fetch('/api/familytree/saveYaml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/yaml',
                },
                body: yamlContent,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Generate the family tree image
            // await handleGenerateTree();
            // Redirect back to the family tree view
            router.push('/familytree');
        } catch (err) {
            setError(err.message);
        }
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
                            Edit Family Tree.
                        </h1>
                        <div className="container mx-auto p-4">

                            <textarea
                                value={yamlContent}
                                onChange={handleYamlChange}
                                className="w-full"
                                style={{ height: '500px', border: '2px solid blue' }} // Add border style here
                            />
                            <Button type={"primary"} onClick={handleUpdateFamilyTree}>
                                Update Family Tree
                            </Button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </div>
                </div>
            </>)
    );
};

export async function getServerSideProps() {
    // Define the path to the YAML file
    const yamlFilePath = path.join(process.cwd(), '_familytree/family.yml');

    try {
        // Read the YAML file content
        const fileContents = fs.readFileSync(yamlFilePath, 'utf8');

        // Return the content as a prop
        return {
            props: {
                initialYamlContent: fileContents,
            },
        };
    } catch (error) {
        // If there's an error reading the file, return empty content or handle the error as needed
        console.error('Error reading YAML file:', error);
        return {
            props: {
                initialYamlContent: '',
            },
        };
    }
}

export default EditFamilyTree;
