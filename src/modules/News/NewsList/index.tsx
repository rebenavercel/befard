import { Container } from "@/components";
import { PaginationWithLinks } from "@/components/PaginationWithLinks";
import BlogPostCard from "@/components/BlogPostCard/Card";
import { getNews } from "@/api/news";

interface IList {
  currentPage: number;
  locale: string;
  page: number;
  //posts: {
  //  id: number;
  //  thumbnail?: IImage;
  //  title?: string;
  //  date?: string;
  //  slug?: string;
  //}[];
}

const NewsList = async ({ locale, page = 1, currentPage }: IList) => {
  const data = await getNews(locale, page);

  const totalCount = (data?.totalPages && parseInt(data?.totalPages)) || 1;

  return (
    <Container variant="2xl">
      <div className="grid md:grid-cols-3 xl:grid-cols-4 py-20 gap-x-5 gap-y-10">
        {data?.posts?.map((post) => <BlogPostCard key={post.id} {...post} />)}
      </div>

      <PaginationWithLinks
        page={currentPage}
        pageSize={8}
        totalCount={totalCount}
      />
    </Container>
  );
};

export default NewsList;
