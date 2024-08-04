import React from 'react'

const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Company</h2>
                        <p className="text-gray-400">We are a tech company committed to providing the best services to our customers.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Links</h2>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-400">Email: info@company.com</p>
                        <p className="text-gray-400">Phone: xx-xxxx-xxxx</p>
                        <p className="text-gray-400">Address: 123 Street Name, City, State, Country</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-400">© 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;