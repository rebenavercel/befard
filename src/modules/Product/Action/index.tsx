import { getAction } from "@/api/product";
import { Container } from "@/components";
import CompanyText from "@/components/CompanyText";

interface IAction {
  locale: string;
  slug: string;
}

const Action = async ({ locale, slug }: IAction) => {
  const data = await getAction(locale, slug);
  if (!data) return null;

  const { header, videos, prefix_title } = data;
  if (!videos?.length) return null;
  return (
    <Container variant="2xl" className="mt-[100px]">
      <div>
        <CompanyText
          text={prefix_title}
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />
        <p className="text-4xl text-white mt-5">{header}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[30px]">
        {videos &&
          videos?.map((video: { url: string; id: number }) => (
            <div key={video.id}>
              <iframe
                width="100%"
                height="315px"
                src={`https://www.youtube.com/embed/${video.url}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Action;
