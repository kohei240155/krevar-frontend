"use client";
// components/FAQSection.tsx
import React, { useState } from "react";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "無料体験のプランは何でしょうか？",
      answer: "登録後3日間、Trial Planを体験することができます。",
    },
    {
      question: "Google以外のログイン方法は使えますか？",
      answer: "Googleログインのみご利用いただけます。",
    },
    {
      question: "決済はどのように行われていますか？",
      answer:
        "Stripeという決済サービスを利用しています。このアプリでお客様のカード情報を保存することはございませんので安心してご利用いただけます。",
    },
    {
      question: "退会後もクイズ機能は利用できますか？",
      answer: "はい、退会後もクイズ機能はご利用いただけます。",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-12 pb-52 bg-white">
      <h2 className="text-center text-4xl font-semibold text-gray-900 mb-14">
        よくある質問
      </h2>
      <ul className="space-y-6 max-w-xl mx-auto">
        {faqs.map((faq, index) => (
          <li key={index} className="border-b border-gray-300 pb-4">
            <button
              className="w-full text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center text-lg">
                <span>{faq.question}</span>
                <span className="text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-base">{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQSection;
