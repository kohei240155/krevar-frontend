// components/FeatureDescriptionSection.tsx
const FeatureSection: React.FC = () => {
  return (
    <section className="bg-white p-20">
      <h2 className="text-4xl font-semibold text-gray-800 mb-14 text-center">
        <span className="border-b-2 border-gray-400 rounded-md p-4 pl-10 pr-10 bg-gray-800 text-white">
          \ これらの悩みを全てKREVARが解決します /
        </span>
      </h2>
      <ul className="list-none text-gray-600 flex flex-col items-center">
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-xl text-gray-900">
            <span className="text-2xl  p-1 font-bold border-b-2 border-gray-400">
              {/* 1. 簡単AIイメージ生成機能 */}
              1. AIが生成したイメージを簡単に登録できる
            </span>
            <br />
            <p className="mt-4 ml-9 text-xl text-gray-700 font-normal">
              文章を入力して覚えたい単語にハイライトを設定するだけで、
              <br />
              AIが暗記に適したイメージと訳を生成します。
            </p>
            <p className="mt-4 ml-9 text-xl text-gray-700 font-bold">
              → AIが生成したイメージと訳を登録するだけなので、
              <span className="text-gray-900 font-bold bg-yellow-300 pt-1">
                手間がかからない！
              </span>
            </p>
          </span>
        </li>
        <div className="bg-gray-200 mb-20 w-full max-w-3xl h-64 flex items-center justify-center">
          {/* <img src="path/to/image1.jpg" alt="イメージ生成機能の画像" className="w-full h-full object-cover" /> */}
        </div>
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-xl text-gray-900">
            <span className="text-2xl p-2 font-bold border-b-2 border-gray-400">
              2. イメージ × エビングハウスの忘却曲線 = 暗記革命
            </span>
            <br />
            <p className="mt-4 ml-9 text-xl text-gray-700 font-normal">
              クイズの正誤によって、暗記に適した最適な間隔でクイズが出題されます。
              <br />
              もちろん、クイズ機能では生成したイメージが表示されます。
            </p>
            <p className="mt-4 ml-9 text-xl text-gray-700 font-bold">
              → イメージを使って最適な間隔で復習できるので、
              <span className="text-gray-900 font-bold bg-yellow-300 pt-1">
                暗記効率が大幅アップ！
              </span>
            </p>
          </span>
        </li>
        <div className="bg-gray-200 mb-20 w-full max-w-3xl h-64 flex items-center justify-center">
          {/* <img src="path/to/image2.jpg" alt="クイズ機能の画像" className="w-full h-full object-cover" /> */}
        </div>
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-xl text-gray-900">
            <span className="text-2xl p-2 font-bold border-b-2 border-gray-400">
              3. 多言語対応
            </span>
            <br />
            <p className="mt-4 ml-9 text-xl text-gray-700 font-normal">
              英語以外の言語でもこのアプリを使うことができます。
              <br />
              ※現在、日本語、英語、スペイン語、フランス語に対応
            </p>
            <p className="mt-4 ml-9 text-xl text-gray-700 font-bold">
              → 大変だった
              <span className="text-gray-900 font-bold bg-yellow-300 pt-1">
                単語帳探しの旅は終わり！
              </span>
            </p>
          </span>
        </li>
        <div className="bg-gray-200 mb-6 w-full max-w-3xl h-64 flex items-center justify-center">
          {/* <img src="path/to/image3.jpg" alt="多言語対応の画像" className="w-full h-full object-cover" /> */}
        </div>
      </ul>
    </section>
  );
};

export default FeatureSection;
