import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { CTA } from '@/templates/CTA';
import { DemoBanner } from '@/templates/DemoBanner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';
import { DefaultParams } from '@/types/Params';

export async function generateMetadata(props: { params: DefaultParams }) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const IndexPage = async (props: { params: DefaultParams }) => {
  const params = await props.params;
  unstable_setRequestLocale(params.locale);

  return (
    <>
      {/* <DemoBanner /> */}
      <Navbar />
      <Hero />
      {/* <Sponsors /> */}
      {/* <Features /> */}
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      {/* <CTA /> */}
      <Footer />
    </>
  );
};

export default IndexPage;
