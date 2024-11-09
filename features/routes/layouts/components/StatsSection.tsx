// components/StatsSection.tsx
const StatsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 p-3">
      <h3 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
        KREVARはこのような方に最適です
      </h3>
      <ul className="list-none text-gray-700 flex flex-col items-center">
        <li className="flex items-start mb-5 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            単語帳で暗記したけど、
            <span className="text-gray-900 text-2xl font-bold">
              単調で苦痛に感じた人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-5 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            話題のイマージョンラーニングを始たけど、
            <span className="text-gray-900 text-2xl font-bold">
              面倒で続かなかった人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-5 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            単語を復習する間隔がわからず、
            <span className="text-gray-900 text-2xl font-bold">
              なかなか単語を覚えられない人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-5 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            英語以外の単語も覚えたいけど、
            <span className="text-gray-900 text-2xl font-bold">
              単語学習がはかどっていない人
            </span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default StatsSection;
