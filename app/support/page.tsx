import React from "react";

const ContactPage = () => {
  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-center mb-4 text-gray-800">
          お問い合わせ
        </h1>
        <p className="mb-4 text-sm text-gray-600">
          IRUKAをご利用いただきありがとうございます。
        </p>
        <p className="mb-4 text-sm text-gray-600">
          IRUKAに質問されたいことなどがございましたら下記のメールアドレスまでお問い合わせください。
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Email:{" "}
          <a
            href="mailto:iruka.com@gmail.com"
            className="text-blue-500 hover:underline"
          >
            iruka.com@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
