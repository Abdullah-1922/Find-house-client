import BlogCards from "./_components/BlogCards";

const Blogs = () => {
  return (
    <div>
      <div
        className="max-h-[300px] py-36"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://code-theme.com/html/findhouses/images/blog/b-2.jpg)
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            Blog
          </h3>

          <p className="font-bold text-white text-lg">Home / Blog</p>
        </div>
      </div>

      <BlogCards />
    </div>
  );
};

export default Blogs;
