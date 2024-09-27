import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="footer" className="bg-white text-gray-900 py-2 ">
      <div className="w-full px-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/about" legacyBehavior>
            <a className="text-gray-900 hover:text-blue-600 focus:font-bold focus:text-blue-600">
              About
            </a>
          </Link>
          <Link href="/subscription" legacyBehavior>
            <a className="text-gray-900 hover:text-blue-600 focus:font-bold focus:text-blue-600">
              Subscription
            </a>
          </Link>
          <Link href="/privacy" legacyBehavior>
            <a className="text-gray-900 hover:text-blue-600 focus:font-bold focus:text-blue-600">
              Privacy
            </a>
          </Link>
          <Link href="/terms" legacyBehavior>
            <a className="text-gray-900 hover:text-blue-600 focus:font-bold focus:text-blue-600">
              Terms
            </a>
          </Link>
          <Link href="/support" legacyBehavior>
            <a className="text-gray-900 hover:text-blue-600 focus:font-bold focus:text-blue-600">
              Support
            </a>
          </Link>
        </div>
        <div>
          <span className="text-gray-900 text-xs">© 2024 KREVAR</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
