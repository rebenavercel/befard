"use client";

import { useForm } from "react-hook-form";
import Button from "../Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form";
import { Input } from "../Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../Textarea";
import { Checkbox } from "../Checkbox";
import { useTranslations } from "next-intl";
import CompanyText from "../CompanyText";
import Image from "next/image";
//import BgLines from "@/components/Icons/images/ContactLine";

const ContactForm = () => {
  const t = useTranslations("Contact");

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("nameValidation"),
    }),
    email: z.string().min(2, {
      message: t("emailValidation"),
    }),
    phone: z.string().min(2, {
      message: t("phoneValidation"),
    }),
    message: z.string().min(2, {
      message: t("messageValidation"),
    }),
    rules: z.boolean().refine((val) => val, {
      message: t("rulesValidation"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      rules: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-dark-grey-own relative">
      <div className="absolute w-full h-full">
        {/*<BgLines className="w-full max-h-full" />*/}
        <Image
          src={`/images/contact-line.svg`}
          alt=""
          fill
          unoptimized
          className="w-full max-h-full"
        />
      </div>
      <div className="z-10 relative px-[40px] py-[30px] xl:py-[50px] xl:px-[100px]">
        <CompanyText
          text={t("contact")}
          classNameText="text-red-own"
          classNameBorder="border-red-own"
        />
        <div
          className="text-2xl sm:text-3xl xl:text-4xl text-white font-light mt-5"
          dangerouslySetInnerHTML={{
            __html: t.markup("header", {
              red: (chunks) => `<span class="text-red-own">${chunks}</span>`,
            }),
          }}
        />
        <div className="mt-[30px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope-font text-white font-medium">
                      {t("name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("yourName")}
                        className="rounded-none bg-white p-4"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-manrope-font text-red-own font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope-font text-white font-medium">
                      {t("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("yourEmail")}
                        type="email"
                        className="rounded-none bg-white p-4"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-manrope-font text-red-own font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope-font text-white font-medium">
                      {t("phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("yourPhone")}
                        className="rounded-none bg-white p-4"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-manrope-font text-red-own font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-manrope-font text-white font-medium">
                      {t("message")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("yourMessage")}
                        className="rounded-none bg-white p-4"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="font-manrope-font text-red-own font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rules"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-none !bg-white !text-red-own"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-manrope-font text-white">
                        {t("rules")}
                      </FormLabel>
                      <FormMessage className="font-manrope-font text-red-own font-medium pt-2" />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="font-manrope-font">
                {t("send")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
