import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import blogPosts from "@/data/blog-posts.json";

const Blog = () => {
  return (
    <MainLayout>
      <section className="bg-secondary py-8">
        <div className="container-jimmy text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Blog</h1>
          <p className="mt-2 text-sm text-muted-foreground">Tips, news, and updates from JIMMY Africa</p>
        </div>
      </section>

      <section className="section-padding-md">
        <div className="container-jimmy">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="group overflow-hidden rounded-md border bg-background shadow-soft transition-all hover:shadow-strong hover:-translate-y-1">
                <div className="aspect-video overflow-hidden bg-secondary">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                  <h2 className="mt-1 text-sm font-bold text-foreground line-clamp-2">{post.title}</h2>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {blogPosts.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
