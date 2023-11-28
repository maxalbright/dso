import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import data, { name, resume, showResume } from "../data/portfolio.json";



const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);

    return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Timeline
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"
          }`}
      >

        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
                } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                <em>{resume.description}</em>
                <div className="w-1/4">
                  <img
                      src="/jamespotter.jpeg" // Update the path to match the actual location of your image
                      alt="James Potter"
                      className="w-full h-auto"
                  ></img>
                </div>
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Birth</h1>

                {resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Hogwarts Years</h1>
                <div className="mt-2">
                  <h2 className="text-lg">{resume.education.universityName}</h2>
                  <h3 className="text-sm opacity-75">
                    {resume.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                      {resume.education.universityPara.split('\n').map((point, index) => (
                          <span key={index}>{point}
                              <br />
                          </span>
                      ))}
                  </p>
                </div>

              </div>
                <div className="mt-5">
                    <h1 className="text-2xl font-bold">Post-Grad</h1>
                    <div className="mt-2">
                        <h2 className="text-lg">{resume.joiningoftp.orgName}</h2>
                        <h3 className="text-sm opacity-75">
                            {resume.joiningoftp.joiningDate}
                        </h3>
                        <p className="text-sm mt-2 opacity-50">
                            {resume.joiningoftp.para.split('\n').map((point, index) => (
                                <span key={index}>{point}
                                    <br />
                          </span>
                            ))}
                        </p>
                    </div>

                </div>
                <div className="mt-5">
                    <h1 className="text-2xl font-bold">The First Wizarding War</h1>
                    <div className="mt-2">
                        <h2 className="text-lg">{resume.war.orgName}</h2>
                        <h3 className="text-sm opacity-75">
                            {resume.war.joiningDate}
                        </h3>
                        <p className="text-sm mt-2 opacity-50">
                            {resume.war.para.split('\n').map((point, index) => (
                                <span key={index}>{point}
                                    <br />
                          </span>
                            ))}
                        </p>
                    </div>

                </div>
                <div className="mt-5">
                    <h1 className="text-2xl font-bold">Death</h1>
                    <div className="mt-2">
                        <h2 className="text-lg">{resume.death.orgName}</h2>
                        <h3 className="text-sm opacity-75">
                            {resume.death.joiningDate}
                        </h3>
                        <p className="text-sm mt-2 opacity-50">
                            {resume.death.para.split('\n').map((point, index) => (
                                <span key={index}>{point}
                                    <br />
                          </span>
                            ))}
                        </p>
                    </div>

                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
