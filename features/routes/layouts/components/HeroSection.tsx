// components/HeroSection.tsx
const HeroSection: React.FC = () => {
  return (
    <section className="flex h-[45rem] flex-col lg:flex-row border-t border-gray-300 items-center justify-center gap-36 p-8 bg-white">
      <div className="flex flex-col items-start text-center lg:text-left space-y-6">
        <div>
          <h2 className="ml-2 mb-2 text-lg font-semibold text-blue-gray-700">
            \ イマージョンラーニング対応 /
          </h2>
          <h1 className="text-4xl font-bold text-blue-gray-900">
            イメージで覚える
            <br />
            AI単語暗記アプリ
          </h1>
        </div>
        <p className="text-gray-600 text-sm">
          AIがあなたの覚えたい単語のイメージを生成してくれます。
          <br />
          最適な間隔で出題されるクイズ機能を使って、学習効率を最大化しましょう。
        </p>
        <button className="bg-gray-700 text-white px-6 py-2 rounded-full mt-4 hover:bg-gray-800">
          Let's Start!
        </button>
      </div>
      <div className="w-60 md:w-80 h-96 bg-gray-300 flex items-center justify-center">
        {/* <img src="/phone-mockup.png" alt="AI単語暗記アプリ" className="w-full" /> */}
        <span className="text-gray-500">画像の配置場所</span>
      </div>
    </section>
  );
};

export default HeroSection;
