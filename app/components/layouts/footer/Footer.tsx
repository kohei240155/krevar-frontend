import React from 'react'

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-800 text-white py-2">
            <div className="w-full px-2 flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">About</a>
                    <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                    <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-white">Support</a>
                </div>
                <div>
                    <span className="text-gray-400 text-xs">© 2024 IRUKA.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
