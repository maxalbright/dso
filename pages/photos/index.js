import Head from "next/head";
import Router, { useRouter } from "next/router";
import { join } from 'path';
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import matter from "gray-matter";
const Photo = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [invalidDate, setInvalidDate] = useState(false);
  const [newPhotoData, setNewPhotoData] = useState({
    date: "",
    title: "",
    tagline: "",
    preview: "",
    image: null,
  });


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
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (name === 'date' && !datePattern.test(value)) {
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
    }
    setNewPhotoData({
      ...newPhotoData,
      [name]: value,
    });
  };

  // const handleImageUpload = (e) => {
  //   const image = e.target.files[0];
  //   setNewPhotoData({
  //     ...newPhotoData,
  //     image,
  //   });
  // };

  const handleImageUrlUpload = (e) => {
    const image = e.target.value;
    setNewPhotoData({
      ...newPhotoData,
      image,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const missing = [];
    if (!newPhotoData.date) missing.push('Date');
    if (!newPhotoData.title) missing.push('Title');
    if (!newPhotoData.tagline) missing.push('Tagline');
    if (!newPhotoData.preview) missing.push('Preview');
    if (!newPhotoData.image) missing.push('Image');

    if (missing.length > 0) {
      setMissingFields(missing);
    } else {
      try {
        const formData = matter.stringify(newPhotoData.title, {
          date: newPhotoData.date,
          title: newPhotoData.title,
          tagline: newPhotoData.tagline,
          preview: newPhotoData.preview,
          image: newPhotoData.image,
        });
        console.log("FORM DATA" + formData);

        const response = await fetch("/api/photos", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          router.reload(window.location.pathname);
        } else {
          console.error("Failed to create a new photo post");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createPhoto = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deletePhoto = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/photos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };
  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Photo</title>
        </Head>
        <div
          className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"
            }`}
        >
          <Header isBlog={true}></Header>
          <div className="mt-10">
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Photos
            </h1>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {posts &&
                posts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    onClick={() => Router.push(`/photos/${post.slug}`)}
                  >
                    <img
                      className="w-full h-60 rounded-lg shadow-lg object-cover"
                      src={post.image}
                      alt={post.title}
                    ></img>
                    <h2 className="mt-5 text-4xl">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25">
                      {ISOToDate(post.date)}
                    </span>
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-0 right-0">
                        <Button
                          onClick={(e) => {
                            deletePhoto(post.slug);
                            e.stopPropagation();
                          }}
                          type={"primary"}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={() => setShowForm(!showForm)} type="button">
              Add New Photo +{" "}
            </Button>
            {showForm && (
                <div className="overlay">
                  <div className="popup">
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                      <div className="form-group">
                        <h2>Photo Form</h2>
                      </div>
                      <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            placeholder="01/01/2023"
                            value={newPhotoData.date}
                            onChange={handleFormChange}
                            required
                            pattern="\d{2}/\d{2}/\d{4}"
                        />
                        <span>(Format: MM/DD/YYYY)</span>
                        {invalidDate && <span className="error-message">Invalid date format</span>}

                      </div>
                      <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={newPhotoData.title}
                            onChange={handleFormChange}
                            required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="tagline">Caption:</label>
                        <input
                            type="text"
                            id="tagline"
                            name="tagline"
                            placeholder="Caption"
                            value={newPhotoData.tagline}
                            onChange={handleFormChange}
                            required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="preview">Description:</label>
                        <input
                            type="text"
                            id="preview"
                            name="preview"
                            placeholder="Description"
                            value={newPhotoData.preview}
                            onChange={handleFormChange}
                            required
                        />
                      </div>
                      {/*<div className="form-group">*/}
                      {/*  <label htmlFor="image">Image:</label>*/}
                      {/*  <input*/}
                      {/*      type="file"*/}
                      {/*      id="image"*/}
                      {/*      name="image"*/}
                      {/*      onChange={handleImageUpload}*/}
                      {/*      accept="image/*"*/}
                      {/*      required*/}
                      {/*  />*/}
                      {/*      {newPhotoData.image && (*/}
                      {/*      <img*/}
                      {/*          src={URL.createObjectURL(newPhotoData.image)}*/}
                      {/*          alt="Selected Image"*/}
                      {/*          style={{ maxWidth: '100%' }}*/}
                      {/*      />*/}
                      {/*  )}*/}
                      {/*</div>*/}
                      <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={newPhotoData.image}
                            onChange={handleImageUrlUpload}
                            required
                        />
                      </div>
                      <div className="form-group">
                        <ul>
                          {missingFields.map((field) => (
                              <li key={field}>{`${field} is missing.`}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                          type="submit"
                          onClick={createPhoto}
                          disabled={
                              !newPhotoData.date ||
                              !newPhotoData.title ||
                              !newPhotoData.tagline ||
                              !newPhotoData.preview ||
                              !newPhotoData.image
                          }
                          style={{
                            backgroundColor: !newPhotoData.date ||
                            !newPhotoData.title ||
                            !newPhotoData.tagline ||
                            !newPhotoData.preview ||
                            !newPhotoData.image
                                ? 'gray'
                                : 'black',
                          }}
                      >
                        Submit
                      </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)} // Close the form
                            style={{
                              margin: 10,
                              left:10,
                              right: 100,
                              bottom: 10,
                              backgroundColor: 'black',
                            }}
                        >
                          Close
                        </button>
                  </form>
                  </div>
                </div>
            )}
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ], join(process.cwd(), '_photos'));

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Photo;
