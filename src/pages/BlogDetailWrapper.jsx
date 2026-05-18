import { useParams } from "react-router-dom";
import BlogDetail from "./Blogdetail";

const BlogDetailWrapper = () => {
  const { slug } = useParams();

  return <BlogDetail key={slug} />;
};

export default BlogDetailWrapper;