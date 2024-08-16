import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-800 text-white py-2">
            <div className="w-full px-2 flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/about" legacyBehavior>
                        <a className="text-gray-400 hover:text-white">About</a>
                    </Link>
                    <Link href="/privacy" legacyBehavior>
                        <a className="text-gray-400 hover:text-white">Privacy</a>
                    </Link>
                    <Link href="/terms" legacyBehavior>
                        <a className="text-gray-400 hover:text-white">Terms</a>
                    </Link>
                    <Link href="/support" legacyBehavior>
                        <a className="text-gray-400 hover:text-white">Support</a>
                    </Link>
                </div>
                <div>
                    <span className="text-gray-400 text-xs">© 2024 IRUKA.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;