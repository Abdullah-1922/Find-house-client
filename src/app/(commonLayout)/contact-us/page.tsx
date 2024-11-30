import dynamic from 'next/dynamic';

const ContactUs = dynamic(() => import('../_components/module/conttuct'), {
  ssr: false,
});

export default function ContactUsPage() {
  return <ContactUs />;
}
