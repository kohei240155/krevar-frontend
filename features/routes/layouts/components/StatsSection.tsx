// components/StatsSection.tsx
const StatsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 p-3">
      <h3 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
        こんなお悩みありませんか？
      </h3>
      <ul className="list-none text-gray-700 flex flex-col items-center">
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            単語帳を使っていたけど、
            <span className="text-gray-900 text-2xl font-bold">
              単調で苦痛に感じた人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            イマージョンラーニングを始めてみたけど、
            <span className="text-gray-900 text-2xl font-bold">
              面倒で続かなかった人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            単語を復習する間隔がわからず、
            <span className="text-gray-900 text-2xl font-bold">
              なかなか単語を覚えられない人
            </span>
          </span>
        </li>
        <li className="flex items-start mb-6 w-full max-w-3xl">
          <span className="text-gray-500 text-2xl mr-2">✔️</span>
          <span className="text-2xl">
            英語以外の言語を学んでいるけど、
            <span className="text-gray-900 text-2xl font-bold">
              いい教材に出会えてない人
            </span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default StatsSection;
