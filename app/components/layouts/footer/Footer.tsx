import React from 'react'

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-800 text-white py-2">
            <div className="container mx-auto px-2">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                        <h2 className="text-lg font-semibold mb-1">Company</h2>
                        <p className="text-gray-400 text-xs">We are a tech company committed to providing the best services to our customers.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                        <h2 className="text-lg font-semibold mb-1">Links</h2>
                        <ul className="text-xs">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-semibold mb-1">Contact Us</h2>
                        <p className="text-gray-400 text-xs">Email: info@company.com</p>
                        <p className="text-gray-400 text-xs">Phone: xx-xxxx-xxxx</p>
                        <p className="text-gray-400 text-xs">Address: 123 Street Name, City, State, Country</p>
                    </div>
                </div>
                <div className="mt-2 text-center">
                    <p className="text-gray-400 text-xs">© 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;