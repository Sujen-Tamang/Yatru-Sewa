// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"

// const HomePage = () => {
//   return (
//     <div className="overflow-hidden">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
//         <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//                 Travel with <span className="text-yellow-400">Comfort</span> and <span className="text-yellow-400">Convenience</span>
//               </h1>
//               <p className="text-xl mb-8 text-blue-100">Book bus tickets online, track your bus in real-time, and enjoy a hassle-free journey with BusTracker.</p>
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <Link to="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition duration-300 text-center transform hover:scale-105">
//                   Get Started
//                 </Link>
//                 <Link to="#how-it-works" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition duration-300 text-center">
//                   Learn More
//                 </Link>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="hidden md:block"
//             >
//               <img 
//                 src="/bus-hero.jpg" 
//                 alt="Bus travel illustration" 
//                 className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
//               />
//             </motion.div>
//           </div>
//         </div>
        
//         {/* Wave divider */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
//             <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//           </svg>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl -mt-32 relative z-20 overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//               <h2 className="text-2xl font-semibold text-center">Find Your Perfect Bus Route</h2>
//             </div>
//             <form className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div>
//                   <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">From</label>
//                   <select id="from" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
//                     <option value="" disabled selected>Select departure</option>
//                     <option value="new-york">New York</option>
//                     <option value="boston">Boston</option>
//                     <option value="washington">Washington DC</option>
//                     <option value="philadelphia">Philadelphia</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">To</label>
//                   <select id="to" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
//                     <option value="" disabled selected>Select destination</option>
//                     <option value="new-york">New York</option>
//                     <option value="boston">Boston</option>
//                     <option value="washington">Washington DC</option>
//                     <option value="philadelphia">Philadelphia</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//                   <input type="date" id="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" />
//                 </div>
                
//                 <div className="flex items-end">
//                   <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                     Search Buses
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="how-it-works" className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BusTracker</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">We provide the best bus ticketing and tracking experience with features designed for your comfort and convenience.</p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Easy Booking</h3>
//               <p className="text-gray-600">Book your bus tickets in just a few clicks from anywhere, anytime. Our user-friendly platform makes booking a breeze.</p>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Tracking</h3>
//               <p className="text-gray-600">Track your bus location in real-time and never miss your bus again. Get accurate ETAs and journey updates.</p>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure Payments</h3>
//               <p className="text-gray-600">Multiple secure payment options for a worry-free booking experience. Your financial information is always protected.</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Popular Routes Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Routes</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our most popular bus routes with competitive prices and frequent departures.</p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "New York to Boston",
//                 duration: "4h 30m",
//                 price: "$25",
//                 image: "/route1.jpg"
//               },
//               {
//                 title: "Boston to Washington DC",
//                 duration: "8h 15m",
//                 price: "$35",
//                 image: "/route2.jpg"
//               },
//               {
//                 title: "Philadelphia to New York",
//                 duration: "2h 45m",
//                 price: "$20",
//                 image: "/route3.jpg"
//               }
//             ].map((route, index) => (
//               <motion.div
//                 key={route.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//               >
//                 <div className="h-48 bg-gray-200 relative overflow-hidden">
//                   <img src={route.image} alt={route.title} className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{route.title}</h3>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-gray-600">{route.duration}</span>
//                     <span className="text-blue-600 font-semibold">From {route.price}</span>
//                   </div>
//                   <Link to="#" className="block text-center bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105">
//                     View Schedule
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
//           >
//             <div>
//               <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Bus Travel?</h2>
//               <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied customers who have made BusTracker their go-to platform for bus ticketing and tracking.</p>
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//                 <Link to="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition duration-300 text-center transform hover:scale-105">
//                   Get Started
//                 </Link>
//                 <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition duration-300 text-center">
//                   Contact Us
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <motion.img 
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 src="/app-preview.jpg" 
//                 alt="Mobile app screenshot" 
//                 className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* App Download Section */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Download Our Mobile App</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get the BusTracker app for a seamless experience on the go. Book tickets, track buses, and manage your journeys from your smartphone.</p>
//           </motion.div>
          
//           <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
//             <motion.a
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               href="#"
//               className="flex items-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition duration-300 transform hover:scale-105"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
//                 <path fillRule="evenodd" d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <div className="text-xs">Download on the</div>
//                 <div className="text-xl font-semibold">App Store</div>
//               </div>
//             </motion.a>
            
//             <motion.a
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               href="#"
//               className="flex items-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition duration-300 transform hover:scale-105"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V10l5.5-5.5a1 1 0 011.42 1.4L10.01 11.3 15.5 16a1 1 0 01-1.41 1.41l-5.5-5.5v3.5c0 1.336-1.616 2.005-2.56 1.06l-4-4a1.5 1.5 0 010-2.12l4-4z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <div className="text-xs">GET IT ON</div>
//                 <div className="text-xl font-semibold">Google Play</div>
//               </div>
//             </motion.a>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default HomePage


import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white min-h-screen flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium">Next-gen bus travel platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Smarter Journeys, <br />
                <span className="text-blue-300">Simplified Travel</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 max-w-lg">
                Book tickets in seconds, track buses in real-time, and enjoy stress-free travel with our all-in-one platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  to="/search" 
                  className="bg-white text-blue-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-lg text-center"
                >
                  Book Now
                </Link>
                <Link 
                  to="#features" 
                  className="bg-transparent border-2 border-white/50 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:shadow-lg text-center"
                >
                  How It Works
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <img 
                  src="/bus-hero.jpg" 
                  alt="Modern bus travel" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm font-medium">Live tracking active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white relative -mt-20 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-semibold">Find Your Perfect Ride</h2>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select 
                      id="from" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="" disabled selected>Select departure</option>
                      <option value="new-york">New York</option>
                      <option value="boston">Boston</option>
                      <option value="washington">Washington DC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select 
                      id="to" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="" disabled selected>Select destination</option>
                      <option value="new-york">New York</option>
                      <option value="boston">Boston</option>
                      <option value="washington">Washington DC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Search Buses
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Travel With Confidence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design for seamless travel experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Instant Booking",
                description: "Secure your seat in seconds with our lightning-fast booking system."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ),
                title: "Live GPS Tracking",
                description: "Real-time bus locations and accurate arrival predictions."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure Payments",
                description: "Multiple payment options with bank-grade security."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Flexible Scheduling",
                description: "Choose from multiple departure times to fit your schedule."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: "Weather Alerts",
                description: "Real-time weather updates for your route."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Support",
                description: "Dedicated customer service anytime you need help."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Popular Routes
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Our Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Travel between major cities with comfort and reliability.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "New York to Boston",
                duration: "4h 30m",
                price: "$25",
                image: "/route1.jpg",
                departure: "Every 30 mins",
                amenities: ["WiFi", "Power outlets", "Reclining seats"]
              },
              {
                title: "Boston to Washington DC",
                duration: "8h 15m",
                price: "$35",
                image: "/route2.jpg",
                departure: "Every 2 hours",
                amenities: ["WiFi", "Restroom", "Snack service"]
              },
              {
                title: "Philadelphia to New York",
                duration: "2h 45m",
                price: "$20",
                image: "/route3.jpg",
                departure: "Every 45 mins",
                amenities: ["WiFi", "Power outlets", "Overhead storage"]
              }
            ].map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">{route.title}</h3>
                    <p className="text-blue-200 text-sm">{route.departure}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{route.duration}</span>
                    <span className="text-blue-600 font-semibold">From {route.price}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.amenities.map((amenity, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to="#" 
                    className="block text-center bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300"
                  >
                    View Schedule
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from travelers who've transformed their journeys with our platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The real-time tracking saved me during a tight connection. I knew exactly when my bus would arrive!",
                name: "Sarah Johnson",
                role: "Frequent Traveler",
                rating: 5
              },
              {
                quote: "Booking is so simple and the app is intuitive. I use it for all my intercity travel now.",
                name: "Michael Chen",
                role: "Business Commuter",
                rating: 5
              },
              {
                quote: "The price alerts helped me save 30% on my regular route. Highly recommend this service!",
                name: "Emma Rodriguez",
                role: "College Student",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-600 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready for Smarter Travel?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Download our app today and experience the future of bus travel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <span>App Store</span>
              </a>
              <a href="#" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;