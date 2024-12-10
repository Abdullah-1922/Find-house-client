'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { useGetAllManagementsQuery } from '@/redux/api/features/management/managementApi'
import Spinner from '@/components/ui/spinner'

type FAQItem = {
  question: string
  answer: string
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { data, isLoading } = useGetAllManagementsQuery('')
  const faqData = data?.data[0]?.faqPage?.faq;

  return (
    <div>
      <div
        className="max-h-[300px] py-36"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://code-theme.com/html/findhouses/images/blog/b-2.jpg)
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-3xl text-white text-center font-bold mb-2">FAQ’S</h3>

          <p className="font-bold text-white text-lg">Home  /  FAQ’S</p>
        </div>
      </div>
      <div className='my-10'>
        <div className="container mx-auto flex-col  py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">FREQUENTLY ASKED QUESTIONS</h1>

          <h2 className="text-xl font-semibold mb-6 text-muted-foreground">QUESTIONS ABOUT SELLING</h2>

          {isLoading ? <Spinner /> : (
            <div className="space-y-4">
              {faqData?.map((item: FAQItem, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "border rounded-md transition-colors duration-300 cursor-pointer",
                    activeIndex === index ? "bg-destructive text-destructive-foreground" : "bg-muted/40"
                  )}
                  onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                >
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-medium">{item.question}</h3>
                    {activeIndex === index && (
                      <p className="mt-2 text-sm">{item.answer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;