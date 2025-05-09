export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[110px]">
      {/*<PageWrapper locale={locale} slug={slug}>*/}
      {/*  <Suspense*/}
      {/*    fallback={*/}
      {/*      <div className="min-h-[calc(100vh-110px)] h-full w-full bg-black">*/}
      {/*        loading...*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {children}
      {/*</Suspense>*/}
      {/*</PageWrapper>*/}
    </div>
  );
}
