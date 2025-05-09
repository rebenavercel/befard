import analyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panel-befard.xaa.pl",
      },
      {
        protocol: "https",
        hostname: "befard.pl",
      },
      {
        protocol: "https",
        hostname: "backend-befard.dkonto.pl",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/produkty/mini-zurawie.html",
        destination: "/produkty/mini-zurawie-pick-and-carry",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie",
        destination: "/produkty/mini-zurawie-pick-and-carry",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-tb.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-gasienicowe",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-xj.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-na-przyczepie",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds.html",
        destination: "/produkty/zurawie-przeladunkowe-hds",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-bf.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-jednoramienne",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe.html",
        destination: "/produkty/roboty-montazowe",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xc.html",
        destination: "/produkty/roboty-montazowe/roboty-montazowe-na-kolach",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xgr/befard-xgr.html",
        destination:
          "/produkty/roboty-montazowe/mobilny-robot-gasienicowy-wyrob-nowy",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-dg.html",
        destination:
          "/produkty/roboty-montazowe/roboty-z-hakiem-pick-and-carry",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-dg.html",
        destination:
          "/produkty/roboty-montazowe/mobilny-robot-gasienicowy-wyrob-nowy",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe.html",
        destination: "/produkty/chwytaki-prozniowe",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-ww.html",
        destination: "/produkty/chwytaki-prozniowe/na-wozek-widlowy",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xr.html",
        destination: "/produkty/chwytaki-prozniowe/do-plyt-warstwowych",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-rb.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-plyt-kamiennych-i-betonowych",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs.html",
        destination: "/produkty/chwytaki-prozniowe/do-blach-i-blatow",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp.html",
        destination: "/produkty/chwytaki-prozniowe/do-okien-i-szkla",
        permanent: true,
      },
      {
        source: "/produkty/hds-osprzet.html",
        destination: "/produkty/osprzet-hydrauliczny",
        permanent: true,
      },
      {
        source: "/produkty/hds-osprzet/befard-bx/befard-bx.html",
        destination:
          "/produkty/osprzet-hydrauliczny/manipulator-do-pozycjonowania-rur-i-masztow",
        permanent: true,
      },
      {
        source: "/produkty/transportery-elektryczne.html",
        destination: "/produkty/transportery-elektryczne",
        permanent: true,
      },
      {
        source: "/produkty/transportery-elektryczne/befard-ur.html",
        destination:
          "/produkty/transportery-elektryczne/transportery-gasienicowe",
        permanent: true,
      },
      {
        source: "/produkty/transportery-elektryczne/befard-tr.html",
        destination: "/produkty/transportery-elektryczne/transportery-kolowe",
        permanent: true,
      },
      {
        source: "/wynajem.html",
        destination: "/wynajmij",
        permanent: true,
      },
      {
        source: "/serwis.html",
        destination: "/serwis",
        permanent: true,
      },
      {
        source: "/o-nas.html",
        destination: "/o-nas",
        permanent: true,
      },
      {
        source: "/kontakt.html",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/polityka-prywatnosci.html",
        destination: "/polityka-prywatnosci",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-tb/befard-xm-800.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-gasienicowe/zuraw-pick-and-carry-befard-xm-800-2",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-tb/befard-tb-7002.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-gasienicowe/mini-zuraw-befard-tb7002",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-tb/befard-tb-5000.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-gasienicowe/mini-zuraw-gasienicowy-befard-tb5000",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-xj/befard-xj-105.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-na-przyczepie/mobilny-zuraw-na-przyczepie-befard-xj105",
        permanent: true,
      },
      {
        source: "/produkty/mini-zurawie/befard-xj/befard-xj-55.html",
        destination:
          "/produkty/mini-zurawie-pick-and-carry/mini-zurawie-na-przyczepie/mini-zuraw-pajak-befard-xj55",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-bf/befard-bf-2602.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-jednoramienne/jednoramienny-zuraw-przeladunkowy-befard-bf2602",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-bf/befard-bf-3402.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-jednoramienne/kompaktowy-zuraw-hds-befard-bf3402",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-bf/befard-bf-5002.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-jednoramienne/zuraw-hds-na-samochod-dostawczy-befard-bf5002",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-3602.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/zurawie-hds-befard-xf3602",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-4002.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/zurawie-przeladunkowe-befard-xf4002",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-5002.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/hds-na-samochod-befard-xf5002",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-5502.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/zuraw-na-samochod-dostawczy-befard-xf5502",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-5502.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/zuraw-na-samochod-dostawczy-befard-xf5502",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-9002.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/hds-na-dostawczaka-befard-xf9002",
        permanent: true,
      },
      {
        source: "/produkty/zurawie-hds/befard-xf/befard-xf-9502.html",
        destination:
          "/produkty/zurawie-przeladunkowe-hds/zurawie-hds-dwuramienne/hydrauliczny-zuraw-przeladunkowy-befard-xf9502",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xc/befard-xc-400.html",
        destination:
          "/produkty/roboty-montazowe/roboty-montazowe-na-kolach/robot-montazowy-befard-xc400-2",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xc/befard-xc-600.html",
        destination:
          "/produkty/roboty-montazowe/roboty-montazowe-na-kolach/robot-na-kolach-befard-xc600",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xc/befard-xc-800.html",
        destination:
          "/produkty/roboty-montazowe/roboty-montazowe-na-kolach/robot-na-kolach-befard-xc820",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-xgr/befard-xgr.html",
        destination: "/produkty/roboty-montazowe",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-dg.html",
        destination: "/produkty/roboty-montazowe",
        permanent: true,
      },
      {
        source: "/produkty/roboty-montazowe/befard-mobilny-robot.html",
        destination:
          "/produkty/roboty-montazowe/mobilny-robot-gasienicowy-wyrob-nowy",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-ww/befard-xw-650.html",
        destination:
          "/produkty/chwytaki-prozniowe/na-wozek-widlowy/befard-xw650",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-ww/befard-af.html",
        destination:
          "/produkty/chwytaki-prozniowe/na-wozek-widlowy/ramie-przedluzajace-na-wozek-befard-af1500",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-360.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/chwytak-do-blach-i-plyt-befard-xs360",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-540.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/transport-blach-i-blatow-befard-xs540-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-540.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/transport-blach-i-blatow-befard-xs540-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-720.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/chwytak-prozniowy-dd-blach-i-plyt-befard-xs720",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-720.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/chwytak-prozniowy-dd-blach-i-plyt-befard-xs720",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-900.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/chwytak-podcisnieniowy-do-blach-befard-xs900",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-1080.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/do-blatow-i-plyt-stalowych-befard-xs1080",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-1260.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-blach-i-blatow/przenoszenie-blach-i-plyt-befard-xs540",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xr/befard-xr-500.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-prozniowy-befard-xpr500-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xr/befard-xr-500.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-prozniowy-befard-xpr500-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xr/befard-xpr-500.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-prozniowy-befard-xpr500-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-302.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-prozniowy-do-montazu-szyb-befard-xp302",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-452.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-do-szyb-i-okien-befard-xp452",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-602.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-prozniowy-montaz-duzych-przeszklen-befard-xp602-2",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-802.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytak-do-transportu-i-montazu-przeszklen-befard-xp802",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-902.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytaki-prozniowe-do-stolarki-okiennej-befard-xp902",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-1002.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytaki-prozniowe-do-szkla-befard-xp1002",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xp/befard-xp-1002.html",
        destination:
          "/produkty/chwytaki-prozniowe/do-okien-i-szkla/chwytaki-prozniowe-do-szkla-befard-xp1002",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-xs/befard-xs-1260.html",
        destination: "/produkty/chwytaki-prozniowe/do-okien-i-szkla",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-rb/befard-rb2.html",
        destination: "/produkty/chwytaki-prozniowe",
        permanent: true,
      },
      {
        source: "/produkty/chwytaki-prozniowe/befard-rb/befard-rb2.html",
        destination: "/produkty/chwytaki-prozniowe",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === "true",
})(withNextIntl(nextConfig));

export default withBundleAnalyzer;
