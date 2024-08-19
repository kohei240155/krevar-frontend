import Head from 'next/head';
import Image from 'next/image';

// 記載予定事項
// How to useの項目を追加し、画面のスクリーンショットを追加
// 実際に生成された画像を並べる
// Quiz機能の特徴を紹介

export default function Home() {
  return (
    <>
      <Head>
        <title>▶IRUKA - 単語暗記アプリ</title>
        <meta name="description" content="英語学習者向けの単語暗記アプリ「▶IRUKA」。エビングハウスの忘却曲線に基づいて、効果的に単語を暗記しよう。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <div
          className="flex items-center justify-center flex-grow h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/background.png)' }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">英単語暗記は<br />新しい体験へ</h1>
            <p className="text-lg md:text-2xl mb-8 text-white">イメージ生成機能を活用して単語を簡単に暗記しよう</p>
            <a href="#about" className="inline-block px-6 py-3 text-lg font-bold bg-blue-600 text-white rounded-full hover:bg-blue-500 transition">Learn More</a>
          </div>
        </div>

        {/* NEWS Section */}
        <section id="news" className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">NEWS<span className="block text-blue-600 text-lg">お知らせ</span></h2>
            <div className="space-y-4 max-w-3xl mx-auto pl-8">
              <div className="flex items-center justify-between space-x-4">
                <p className="text-gray-600 text-left">2030.02.01</p>
                <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1">お知らせ</span>
                <p className="flex-grow text-left">Webデザインニュースサイト「ウェブマガジン」に取材いただきました</p>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p className="text-gray-600 text-left">2030.01.25</p>
                <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1">制作実績</span>
                <p className="flex-grow text-left">Smoothiesta様のWebサイトを制作いたしました</p>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p className="text-gray-600 text-left">2030.01.20</p>
                <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1">採用</span>
                <p className="flex-grow text-left">Webデザイナーを1名募集中です！</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-blue-50">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <Image src="/images/home-image-1.png" alt="About Image" width={600} height={400} />
            </div>
            <div className="md:w-1/2 text-center md:text-left md:pl-12 mt-8 md:mt-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">About<span className="block text-blue-600 text-lg">アプリについて</span></h2>
              <p className="max-w-xl text-blue-700">IRUKAは、ChatGPTを活用して英単語を効率的に覚えることができるアプリです。ユーザーが覚えたい単語を選択すると、その単語に関連した覚えやすいイメージが生成されます。また、エビングハウスの忘却曲線に基づいた復習機能により、最適なタイミングで単語を復習できます。</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">Features<span className="block text-blue-600 text-lg">特徴</span></h2>
            <ul className="space-y-4 text-blue-700">
              <li>イメージ生成による暗記サポト</li>
              <li>エビングハウスの忘却曲線に基づいた復習機能</li>
              <li>クイズ機能での確認</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">Contact<span className="block text-blue-600 text-lg">お問い合わせ</span></h2>
            <form className="max-w-lg mx-auto space-y-6">
              <div className="text-left">
                <label htmlFor="name" className="block mb-2 font-bold text-blue-800">お名前</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="text-left">
                <label htmlFor="email" className="block mb-2 font-bold text-blue-800">メールアドレス</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="text-left">
                <label htmlFor="message" className="block mb-2 font-bold text-blue-800">メッセージ</label>
                <textarea id="message" name="message" required className="w-full px-4 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="px-6 py-3 text-lg font-bold bg-blue-600 text-white rounded-full hover:bg-blue-500 transition">送信する</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
