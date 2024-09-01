import React from "react";

const TermsPage = () => {
  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-center mb-4 text-gray-800">
          特商取引法に基づく表記
        </h1>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                販売事業者
              </th>
              <td className="p-3 text-sm text-gray-600">株式会社サンプル</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                CEO
              </th>
              <td className="p-3 text-sm text-gray-600">山田 太郎</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                連絡先
              </th>
              <td className="p-3 text-sm text-gray-600">info@sample.com</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                住所
              </th>
              <td className="p-3 text-sm text-gray-600">
                東京都千代田区丸の内1-1-1
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                販売URL
              </th>
              <td className="p-3 text-sm text-gray-600">
                <a
                  href="https://sample.com"
                  className="text-blue-500 hover:underline"
                >
                  https://sample.com
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                お支払い方法
              </th>
              <td className="p-3 text-sm text-gray-600">
                クレジットカード決済、PayPal決済
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                販売価格
              </th>
              <td className="p-3 text-sm text-gray-600">
                ベーシックプラン 月額980円
                <br />
                プレミアムプラン 月額1980円
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                商品代金以外の必要金額
              </th>
              <td className="p-3 text-sm text-gray-600">なし</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                商品引渡し時期
              </th>
              <td className="p-3 text-sm text-gray-600">お申込み後即時</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                商品引渡し方法
              </th>
              <td className="p-3 text-sm text-gray-600">メールにてご案内</td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                返品・キャンセルについて
              </th>
              <td className="p-3 text-sm text-gray-600">
                返品・キャンセルは受け付けておりません。
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                動作環境
              </th>
              <td className="p-3 text-sm text-gray-600">
                Windows, MacOS, Linux, iOS, Android
              </td>
            </tr>
            <tr className="border-b">
              <th className="p-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                サポートについて
              </th>
              <td className="p-3 text-sm text-gray-600">
                メールにてサポートを提供します。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TermsPage;
