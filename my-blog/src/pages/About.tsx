const AboutPage = () => {
  return (
    <>
      <div className="py-10">
        <h2 className="text-4xl font-bold py-4">About Me</h2>
        <p className="text-lg">
          Hi there! My name is{" "}
          <span className="font-bold text-xl">Boban Senikj</span>, and I'm a
          front-end developer specializing in React, Next.js, TypeScript,
          JavaScript, Tailwind CSS, CSS, SCSS, Bootstrap, Ajax, and HTML. I also
          have experience with back-end technologies such as Node.js, Express,
          Supabase, Planet Scale, and MongoDB. Welcome to my blog, where I share
          my experiences and insights on various topics related to technology
          and software development.
        </p>
        <p>
          Aside from my professional work, I enjoy learning new skills and
          technologies, watching movies, and spending time in nature. I started
          this blog as a way to share my knowledge and experiences with others,
          and to continue learning and growing in my own career.
        </p>
        <p>
          If you have any questions, feedback, or suggestions, feel free to
          contact me through my website or social media platforms. Thank you for
          stopping by!
        </p>
        <div className="flex pt-4">
          <a
            href="https://www.linkedin.com/in/boban-senic-884b79195/"
            className="bg-black text-white rounded-lg px-4 py-2 mr-2"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/orderbusinesswebsite"
            className="bg-black text-white rounded-lg px-4 py-2 mr-2"
          >
            Facebook
          </a>
          <a
            href="https://dev.bobansenic.com/"
            className="bg-black text-white rounded-lg px-4 py-2"
          >
            Website
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
