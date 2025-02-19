import { Callout } from "@/components/mdx/Callout";
import MDXComponents from "@/components/mdx/MDXComponents";
import { getPosts } from "@/lib/getBlogs";
import { BlogPost } from "@/types/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] };
//   }) {
//   const { slug } = await params
//   const currentSlug = slug ? "/blogs" + "/" + slug.join("/") : "/blogs";
//   let { posts }: { posts: MdxData[] } = await getPosts();
//   const post = posts.find((item) => item.slug === currentSlug);

//   return {
//     ...siteConfig,
//     title: `${post?.title || "404"} | ${siteConfig.name}`,
//     description: post?.description || siteConfig.description,
//     openGraph: {
//       ...siteConfig.openGraph,
//       title: `${post?.title || "404"} | ${siteConfig.name}`,
//       url: `${siteConfig.url}${currentSlug}`,
//       description: post?.description || siteConfig.description,
//     },
//     twitter: {
//       ...siteConfig.twitter,
//       title: `${post?.title || "404"} | ${siteConfig.name}`,
//       site: `${siteConfig.url}${currentSlug}`,
//       description: post?.description || siteConfig.description,
//     },
//   };
// }

type Params = Promise<{
  locale: string;
  slug: string;
}>;

export default async function BlogPage({ params }: { params: Params }) {
  const { slug } = await params;
  let { posts }: { posts: BlogPost[] } = await getPosts();

  const post = posts.find((item) => item.slug === "/" + slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="w-full md:w-3/5 px-2 md:px-12">
      <h1 className="break-words text-4xl font-bold mt-6 mb-4">{post.title}</h1>
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-sm" />
      )}
      {post.tags && post.tags.split(",").length ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.split(",").map((tag) => {
            return (
              <div
                key={tag}
                className={`rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E] flex px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF] text-gray-500 dark:text-[#7F818C] outline-none focus-visible:ring transition`}
              >
                {tag.trim()}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {post.description && <Callout>{post.description}</Callout>}
      <MDXRemote source={post?.content || ""} components={MDXComponents} />
    </div>
  );
}

export async function generateStaticParams() {
  let posts = (await getPosts()).posts;

  // Filter out posts without a slug
  posts = posts.filter((post) => post.slug);

  return posts.map((post) => {
    // Remove the leading '/blogs' from the slug and split the rest into an array
    const slugArray = post.slug
      ?.replace(/^\/blogs/, "")
      .split("/")
      .filter(Boolean);

    return {
      slug: slugArray,
    };
  });
}
