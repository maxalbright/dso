import React from "react";
import yourData from "../../data/portfolio.json";
import Button from "../Button";


const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          {social.title}
        </Button>
      ))}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4585351473518114"
        crossOrigin="anonymous"></script>
    </div>
  );
};

export default Socials;
