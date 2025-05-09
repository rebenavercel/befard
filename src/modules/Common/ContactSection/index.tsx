import { Container } from "@/components";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

const ContactSection = () => {
  return (
    <div className="pt-[140px] pb-16 lg:pb-[100px] bg-black">
      <Container variant="2xl" className="flex gap-[100px]">
        <div className="hidden xl:flex w-1/2">
          <Image
            src="/images/phones.png"
            alt=""
            fill
            className="!relative object-contain"
            sizes="600px"
          />
        </div>
        <div className="w-full xl:w-1/2 content-center">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

export default ContactSection;
