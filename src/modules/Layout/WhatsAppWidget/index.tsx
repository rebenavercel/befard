import { Suspense, lazy } from "react";
import { getLocale } from 'next-intl/server';
import { getTeam } from '@/lib/api/get-team';

const Whatsapp = lazy(() => import("./Widget"));

//const promiseCache = new Map<string, Promise<any>>();

//function getTeamPromise(locale: string) {
//  if (!promiseCache.has(locale)) {
//    promiseCache.set(locale, getTeam(locale));
//  }
//  return promiseCache.get(locale)!;
//}

export default async function WhatsAppWidget() {
  const locale = await getLocale();
  const data = await getTeam(locale)
  //const data = use(getTeamPromise(locale));

  if (!data) return null;

  return (
    <Suspense fallback={null}>
      <Whatsapp persons={data?.persons as any} />
    </Suspense>
  );
}
