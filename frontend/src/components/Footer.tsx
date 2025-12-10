export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">FURNI.</h3>
          <p className="text-sm leading-relaxed">
            Premium furniture for modern living spaces. Designed with comfort and style in mind.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>Readymade</li>
            <li>Unpolished</li>
            <li>Living Room</li>
            <li>Bedroom</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe to get special offers and updates.</p>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} FURNI. All rights reserved.</p>
      </div>
    </footer>
  );
}
