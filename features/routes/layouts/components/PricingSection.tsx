import React from "react";

const PricingSection: React.FC = () => {
  return (
    <section className="bg-gray-100">
      <h2 className="text-4xl font-semibold text-gray-800 mb-14 text-center">
        料金プラン
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-9 pl-10 pr-10">
        <div className="bg-white h-[450px] p-1 rounded-lg shadow-md w-full md:w-1/4 text-center">
          <h3 className="mt-10 text-3xl font-bold text-gray-900">
            <span>Trial Plan</span>
          </h3>
          <p className="mt-4 text-lg text-gray-700 mb-4">
            まずは少しずつ継続したい方向け
          </p>
          <p className="mt-8 text-3xl font-bold text-gray-900 mb-6">¥500/月</p>
          <ul className="mt-10 list-none text-gray-600 mb-6">
            <li className="pl-10 text-left mb-3 mt-6">
              ・1日2枚画像を生成可能
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・クイズ機能は無制限で利用可
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・無料体験はこちらのプランになります
            </li>
          </ul>
        </div>

        <div className="bg-white h-[450px] p-1 rounded-lg shadow-md w-full md:w-1/4 text-center">
          <h3 className="mt-10 text-3xl font-bold text-gray-900">
            <span className="bg-yellow-600 p-2 pl-12 pr-12 rounded-lg">
              Basic Plan
            </span>
          </h3>
          <p className="mt-4 text-lg text-gray-700 mb-4">
            本格的に学習したい方向け
          </p>
          <p className="mt-8 text-3xl font-bold text-gray-900 mb-6">
            ¥1,300/月
          </p>
          <ul className="mt-10 list-none text-gray-600 mb-6">
            <li className="pl-10 text-left mb-3 mt-6">
              ・1日5枚画像を生成可能
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・クイズ機能は無制限で利用可
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・広告が表示されません
            </li>
          </ul>
        </div>

        <div className="bg-white h-[450px] p-1 rounded-lg shadow-md w-full md:w-1/4 text-center">
          <h3 className="mt-10 text-3xl font-bold text-gray-900">
            <span>Pro Plan</span>
          </h3>
          <p className="mt-4 text-lg text-gray-700 mb-4">
            毎日学習時間を確保できる方向け
          </p>
          <p className="mt-8 text-3xl font-bold text-gray-900 mb-6">
            ¥2,000/月
          </p>
          <ul className="mt-10 list-none text-gray-600 mb-6">
            <li className="pl-10 text-left mb-3 mt-6">
              ・1日10枚画像を生成可能
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・クイズ機能は無制限で利用可
            </li>
            <li className="pl-10 text-left mb-3 mt-6">
              ・広告が表示されません
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-20 mb-20">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          \ いまなら3日間の無料体験を実施しています /
        </h2>
        <button className="w-[800px] h-[70px] font-bold text-2xl bg-yellow-600 px-6 py-2 rounded-full hover:bg-yellow-700">
          試してみる
        </button>
      </div>
    </section>
  );
};

export default PricingSection;
