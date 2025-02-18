import { BlogPost } from "@/types/blog";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-transparent rounded-lg hover:underline"
    >
      <div className="relative rounded shadow-md  pt-[56.25%]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover shadow-sm w-full rounded hover:shadow-lg transition-shadow duration-200 h-[200p]"
        />
      </div>
      <div className="py-3 flex-1 flex flex-col">
        <h2 className="text-lg font-500 line-clamp-2 flex-grow">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          {dayjs(post.date).format("YYYY-MM-DD")}
        </p>
      </div>
    </Link>
  );
}
