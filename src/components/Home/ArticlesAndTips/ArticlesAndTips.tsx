import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const ArticlesAndTips = () => {
  const articles = [
    {
      id: 1,
      title: "Explore The World",
      date: "April 11, 2020",
      likes: 306,
      comments: 34,
      shares: 122,
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur.",
      author: {
        name: "Karl Smith",
        image: "https://code-theme.com/html/findhouses/images/testimonials/ts-6.jpg"
      },
      image: "https://code-theme.com/html/findhouses/images/blog/b-10.jpg"
    },
    {
      id: 2,
      title: "Find Good Places",
      date: "May 20, 2020",
      likes: 306,
      comments: 34,
      shares: 122,
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur.",
      author: {
        name: "Lis Jhonson",
        image: "https://code-theme.com/html/findhouses/images/testimonials/ts-5.jpg"
      },
      image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg"
    },
    {
      id: 3,
      title: "All Places In Town",
      date: "June 30, 2020",
      likes: 306,
      comments: 34,
      shares: 122,
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur.",
      author: {
        name: "Ted Williams",
        image: "https://code-theme.com/html/findhouses/images/testimonials/ts-4.jpg"
      },
      image: "https://code-theme.com/html/findhouses/images/blog/b-12.jpg"
    }
  ];

  return (
    <div>
      <div className="mt-20">
        <h2 className="text-center text-4xl font-bold">Articles & Tips</h2>
        <p className="text-center">Read the latest news from our blog.</p>
      </div>
    <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {articles.map((article) => (
          <div key={article.id} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {article.likes}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {article.comments}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Share2 className="w-4 h-4 mr-1" />
                  {article.shares}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="flex justify-between items-center">
                <a href="#" className="text-black font-bold hover:underline">
                  Read more...
                </a>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">By</span>
                  <Image
                    src={article.author.image}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm font-medium">{article.author.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ArticlesAndTips;
