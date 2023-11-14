import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// Local Data
import data from "../../data/portfolio.json";
import Button from "../Button";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}.
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"
                        }`}
                    ></img>
                  </Button>
                )}

                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${!open
                      ? theme === "dark"
                        ? "menu-white.svg"
                        : "menu.svg"
                      : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                      }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${theme === "dark" ? "bg-slate-800" : "bg-white"
                } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <Button onClick={handleWorkScroll}>Highlights</Button>
                  <Button onClick={handleAboutScroll}>About</Button>
                  {/* {showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )} */}
                  {/* {showResume && (
                    <Button
                      onClick={() =>
                        window.open("mailto:maxdanielalbright@gmail.com")
                      }
                    >
                      Resume
                    </Button>
                  )} */}
                  <Button
                    onClick={() => router.push("/recipes")}
                    classes="first:ml-1"
                  >
                    Recipes
                  </Button>
                  <Button
                    onClick={() => router.push("/timeline")}
                    classes="first:ml-1"
                  >
                    Timeline
                  </Button>
                  <Button
                    onClick={() => router.push("/familytree")}
                    classes="first:ml-1"
                  >
                    Family Tree
                  </Button>
                  <Button
                    onClick={() => router.push("/photos")}
                    classes="first:ml-1"
                  >
                    Photos
                  </Button>
                  <Button
                    onClick={() => router.push("/voicememos")}
                    classes="first:ml-1"
                  >
                    Voice Memos
                  </Button>
                  {/* <Button
                    onClick={() => router.push("/resume")}
                    classes="first:ml-1"
                  >
                    Plans/Pricing
                  </Button> */}

                  <Button
                    onClick={() => window.open("mailto:maxdanielalbright@gmail.com")}
                  >
                    Contact
                  </Button>
                  <Button
                    onClick={() => router.push("/auth/auth")}
                    classes="first:ml-1">
                    Sign In
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Button onClick={() => router.push("/")} classes="first:ml-1">
                    Home
                  </Button>
                  {/* {showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )} */}
                  {/* {showResume && (
                    <Button
                      onClick={() => router.push("/resume")}
                      classes="first:ml-1"
                    >
                      Resume
                    </Button>
                  )} */}
                  <Button
                    onClick={() => router.push("/recipes")}
                    classes="first:ml-1"
                  >
                    Recipes
                  </Button>
                  <Button
                    onClick={() => router.push("/timeline")}
                    classes="first:ml-1"
                  >
                    Timeline
                  </Button>
                  <Button
                    onClick={() => router.push("/familytree")}
                    classes="first:ml-1"
                  >
                    Family Tree
                  </Button>
                  <Button
                    onClick={() => router.push("/photos")}
                    classes="first:ml-1"
                  >
                    Photos
                  </Button>
                  <Button
                    onClick={() => router.push("/voicememos")}
                    classes="first:ml-1"
                  >
                    Voice Memos
                  </Button>
                  {/* <Button
                    onClick={() => router.push("/resume")}
                    classes="first:ml-1"
                  >
                    Plans/Pricing
                  </Button> */}

                  <Button
                    onClick={() => window.open("mailto:maxdanielalbright@gmail.com")}
                  >
                    Contact
                  </Button>

                  <Button
                    onClick={() => router.push("/auth/auth")}
                    classes="first:ml-1">
                    Sign In
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${theme === "light" && "bg-white"
          } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        {!isBlog ? (
          <div className="flex">
            <Button onClick={handleWorkScroll}>Highlights</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {/* {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )} */}
            <Button
              onClick={() => router.push("/recipes")}
              classes="first:ml-1"
            >
              Recipes
            </Button>
            <Button
              onClick={() => router.push("/timeline")}
              classes="first:ml-1"
            >
              Timeline
            </Button>
            <Button
              onClick={() => router.push("/familytree")}
              classes="first:ml-1"
            >
              Family Tree
            </Button>
            <Button
              onClick={() => router.push("/photos")}
              classes="first:ml-1"
            >
              Photos
            </Button>
            <Button
              onClick={() => router.push("/voicememos")}
              classes="first:ml-1"
            >
              Voice Memos
            </Button>
            {/* <Button
              onClick={() => router.push("/resume")}
              classes="first:ml-1"
            >
              Plans/Pricing
            </Button> */}

            <Button onClick={() => window.open("mailto:maxdanielalbright@gmail.com")}>
              Contact
            </Button>

            <Button
              onClick={() => router.push("/auth/auth")}
              classes="first:ml-1"
            >
              Sign In
            </Button>

            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => router.push("/")}>Home</Button>
            {/* {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )} */}
            <Button
              onClick={() => router.push("/recipes")}
              classes="first:ml-1"
            >
              Recipes
            </Button>
            <Button
              onClick={() => router.push("/timeline")}
              classes="first:ml-1"
            >
              Timeline
            </Button>
            <Button
              onClick={() => router.push("/familytree")}
              classes="first:ml-1"
            >
              Family Tree
            </Button>
            <Button
              onClick={() => router.push("/photos")}
              classes="first:ml-1"
            >
              Photos
            </Button>
            <Button
              onClick={() => router.push("/voicememos")}
              classes="first:ml-1"
            >
              Voice Memos
            </Button>
            {/* <Button
              onClick={() => router.push("/resume")}
              classes="first:ml-1"
            >
              Plans/Pricing
            </Button> */}

            <Button onClick={() => window.open("mailto:maxdanielalbright@gmail.com")}>
              Contact

            </Button>
            <Button
              onClick={() => router.push("/auth/auth")}
              classes="first:ml-1">
              Sign In
            </Button>

            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
