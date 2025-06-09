import Image from "next/image";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Perfect Gaming Laptop in 2025",
      image: "https://via.placeholder.com/800x400",
      category: "Buying Guide",
      date: "January 2, 2025",
      excerpt:
        "Discover the key factors to consider when selecting a gaming laptop, from GPU performance to cooling systems...",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Top 5 Mechanical Keyboards for Programming",
      image: "https://via.placeholder.com/800x400",
      category: "Accessories",
      date: "January 4, 2025",
      excerpt:
        "Find the perfect mechanical keyboard to enhance your coding experience with our comprehensive guide...",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Laptop Maintenance Tips to Extend Your Device's Life",
      image: "https://via.placeholder.com/800x400",
      category: "Maintenance",
      date: "January 5, 2025",
      excerpt:
        "Learn essential maintenance practices to keep your laptop running smoothly and extend its lifespan...",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-800 mb-4">Tech Blog</h1>
        <p className="text-xl text-gray-600">
          Latest news, guides, and insights about laptops and accessories
        </p>
      </div>

      {/* Categories Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {["All Posts", "Buying Guides", "Reviews", "Accessories", "Maintenance"].map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full ${
                cat === "All Posts"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 relative w-full h-64 md:w-[384px]">
              <Image
                src="https://via.placeholder.com/800x600"
                alt="Featured post"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <span className="text-blue-500 font-semibold">Featured</span>
              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                The Ultimate Guide to Laptop Specifications
              </h2>
              <p className="mt-4 text-gray-600">
                Understanding laptop specifications doesn&apos;t have to be
                complicated. In this comprehensive guide, we break down every
                important specification you need to know before making your
                purchase...
              </p>
              <div className="mt-6">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-blue-500 font-semibold">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <button className="text-blue-500 hover:text-blue-600 font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-blue-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest tech news and exclusive
          deals
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-lg border-2 border-r-0 border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 w-24">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
