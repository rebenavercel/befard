"use client";

import Container from "@/components/Container";
import { useSearchParams } from "next/navigation";

export default function Loading() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  return (
    <div className="">
      {page === null && (
        <Container variant="2xl" className="z-10 pt-16">
          <div className="flex flex-col sm:flex-row gap-[30px] md:gap-[80px]">
            <div className="relative w-full sm:w-2/3 inline-block">
              <div className="bg-grey-light-own animate-pulse w-full h-[300px] sm:h-[600px]" />
              <div className="absolute bottom-6 lg:bottom-[50px] left-5 lg:left-10 space-y-5 w-full max-w-[500px]">
                <div className="h-8 sm:h-12 bg-grey-light-own animate-pulse w-5/6" />
                <div className="h-4 sm:h-5 bg-grey-light-own animate-pulse w-1/3" />
                <div className="h-4 bg-grey-light-own animate-pulse w-1/4 mt-5" />
              </div>
            </div>

            <div className="w-full sm:w-1/3 flex flex-col gap-10 self-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border-b-[1px] border-grey-2-own pb-5 space-y-5"
                >
                  <div className="h-5 bg-grey-light-own animate-pulse w-full" />
                  <div className="h-4 bg-grey-light-own animate-pulse w-1/2" />
                  <div className="h-4 bg-grey-light-own animate-pulse w-1/3 mt-5" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      )}

      <Container variant="2xl">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 py-20 gap-x-5 gap-y-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="space-y-5" key={index}>
              <div className="max-h-[260px] aspect-[330/260] lg:max-h-[346px] h-auto lg:aspect-[380/360] overflow-hidden relative bg-grey-light-own animate-pulse" />
              <div className="h-5 bg-grey-light-own animate-pulse w-1/2" />
              <div className="space-y-2">
                <div className="h-5 bg-grey-light-own animate-pulse w-5/6" />
                <div className="h-5 bg-grey-light-own animate-pulse w-4/5" />
              </div>
              <div className="h-5 w-1/3 bg-grey-light-own animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
