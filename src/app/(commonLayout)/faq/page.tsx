'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"

type FAQItem = {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "WHAT PAYMENT METHODS ARE AVAILABLE?",
    answer: "We accept various payment methods including credit cards, debit cards, and bank transfers."
  },
  {
    question: "HOW CAN I GET FINDHOUSES AID TO LIVE OFF CAMPUS?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "DOES FINDHOUSES SHARE MY INFORMATION WITH OTHERS?",
    answer: "We take your privacy seriously and only share information as outlined in our privacy policy."
  },
  {
    question: "WHAT KIND OF REAL ESTATE ADVICE DO YOU GIVE?",
    answer: "We provide comprehensive real estate advice covering buying, selling, and property management."
  },
  {
    question: "HOW DO I LINK MULTIPLE ACCOUNTS WITH MY PROFILE?",
    answer: "You can link multiple accounts through your profile settings page."
  },
  {
    question: "WHAT KIND OF REAL ESTATE ADVICE DO YOU GIVE?",
    answer: "We offer expert advice on property valuation, market trends, and investment strategies."
  },
  {
    question: "IS YOUR ADVICE REALLY BE HELP FULL?",
    answer: "Yes, our advice is based on years of industry experience and has helped many clients achieve their real estate goals."
  },
]

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
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
    </div>
</div>
        </div>
    );
};

export default FAQ;