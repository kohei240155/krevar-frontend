import React from "react";

const SubscribePage = () => {
  return (
    <div>
      <h1>Subscribe to our Monthly Plan</h1>
      <p>
        毎月500円の継続課金プランに登録するには、下記のボタンをクリックしてください。
      </p>
      <a
        href="https://buy.stripe.com/test_dR65oa5vedZI0aQ3cc"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button type="button">Subscribe for 500円/month</button>
      </a>
    </div>
  );
};

export default SubscribePage;
