"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (mounted && isAuthenticated) {
      router.push("/main");
    } else {
      router.push("/login");
    }
  };

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar && window.scrollY > 50) {
        navbar.classList.add('bg-white', 'dark:bg-slate-900', 'shadow');
      } else if (navbar) {
        navbar.classList.remove('bg-white', 'dark:bg-slate-900', 'shadow');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top dark:bg-slate-900/95 dark:backdrop-blur-md px-2 sm:px-4">
        <div className="container mx-auto">
          <a className="navbar-brand fw-bold text-primary dark:text-primary text-lg sm:text-xl md:text-2xl" href="#">
            <i className="fas fa-utensils me-2"></i>
            <span className="hidden xs:inline">Take It Cheesy</span>
            <span className="xs:hidden">TIC</span>
          </a>
          <button className="navbar-toggler border-0 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto flex-col md:flex-row gap-1 md:gap-2">
              <li className="nav-item">
                <a className="nav-link active text-gray-800 dark:text-white hover:text-primary transition-colors duration-300 py-2 md:py-1" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-gray-800 dark:text-white hover:text-primary transition-colors duration-300 py-2 md:py-1" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-gray-800 dark:text-white hover:text-primary transition-colors duration-300 py-2 md:py-1" href="#menu">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-gray-800 dark:text-white hover:text-primary transition-colors duration-300 py-2 md:py-1" href="#contact">Contact</a>
              </li>
            </ul>
            <div className="ms-0 md:ms-3 mt-2 md:mt-0">
              <ThemeToggle className="hover:bg-white/20 text-white hover:scale-110 transition-all duration-200" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 sm:pt-20 pb-8 bg-white dark:bg-slate-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50vh] sm:w-[60vh] md:w-[70vh] h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-full bg-gradient-to-br from-orange-200/40 to-yellow-200/40 dark:from-orange-500/10 dark:to-yellow-500/5 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40vh] sm:w-[45vh] md:w-[50vh] h-[40vh] sm:h-[45vh] md:h-[50vh] rounded-full bg-gradient-to-tr from-red-200/30 to-orange-100/30 dark:from-red-500/10 dark:to-orange-500/5 blur-3xl"></div>
          {/* Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 dark:opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-8 lg:mb-0">
              <div className="relative text-center lg:text-left">
                <span className="inline-block py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-bold tracking-wide mb-4 sm:mb-6 animate-pulse shadow-sm">
                  🚀 Fastest Delivery in Town
                </span>
                <h1 className="text-gray-900 dark:text-white leading-tight font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6" style={{
                  animation: 'fadeInUp 0.8s ease-out'
                }}>
                  Experience the <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 animate-gradient-x">
                    Taste of Joy
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 font-medium px-2 sm:px-0" style={{
                  animation: 'fadeInUp 1s ease-out 0.2s backwards'
                }}>
                  Savor the finest cuisines delivered straight to your doorstep.
                  Fresh ingredients, expert chefs, and unforgettable flavors awaiting you.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0" style={{ animation: 'fadeInUp 1s ease-out 0.4s backwards' }}>
                  <button
                    className="flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    onClick={handleGetStarted}
                  >
                    <i className="fas fa-shopping-cart text-base sm:text-lg"></i>
                    <span className="text-sm sm:text-base">Order Now</span>
                  </button>
                  <button
                    className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-white border-2 border-gray-100 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    onClick={scrollToMenu}
                  >
                    <i className="fas fa-utensils text-base sm:text-lg"></i>
                    <span className="text-sm sm:text-base">View Menu</span>
                  </button>
                </div>

                <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400" style={{ animation: 'fadeInUp 1s ease-out 0.6s backwards' }}>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Free Delivery</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 24/7 Support</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> 4.9 Rated</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="relative z-10 p-2 sm:p-4 lg:pl-10 mt-4 lg:mt-0">
                {/* Floating Image Container */}
                <div className="relative animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
                    alt="Delicious Bowl"
                    className="relative z-10 w-full max-w-md mx-auto lg:max-w-none rounded-2xl sm:rounded-[2.5rem] shadow-2xl rotate-0 sm:rotate-3 hover:rotate-0 transition-transform duration-500 object-cover border-2 sm:border-4 border-white dark:border-slate-800"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                  {/* Decorative Elements - Hidden on mobile for cleaner look */}
                  <div className="hidden sm:block absolute -z-10 top-10 -right-10 w-full h-full rounded-[3rem] border-2 border-orange-500/20 dark:border-orange-400/20 rotate-6"></div>
                  <div className="absolute -bottom-6 sm:-bottom-10 left-2 sm:-left-10 bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-bounce-slow flex items-center space-x-2 sm:space-x-3 z-20 max-w-[180px] sm:max-w-xs">
                    <div className="bg-green-100 p-1.5 sm:p-2 rounded-full text-green-600">
                      <i className="fas fa-motorcycle text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white text-xs sm:text-sm">On the way!</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">30 mins delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="row text-center mb-8 sm:mb-12 md:mb-16">
            <div className="col-12">
              <span className="text-orange-600 dark:text-orange-400 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Our Promise</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Why Choose Us?</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">Experience the best in food delivery and dining with our premium services designed just for you.</p>
            </div>
          </div>
          <div className="row g-3 sm:g-4">
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card border border-gray-100 dark:border-gray-700 shadow-lg h-100 bg-white dark:bg-slate-800 rounded-xl sm:rounded-[2rem] hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="card-body text-center p-4 sm:p-6 md:p-8 relative z-10">
                  <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block">
                    <i className="fas fa-shipping-fast text-6xl sm:text-9xl text-orange-500 transform rotate-12"></i>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-orange-600 dark:text-orange-400 text-2xl sm:text-3xl md:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <h4 className="card-title text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Fast Delivery</h4>
                  <p className="card-text text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Quick and reliable delivery to your doorstep within 30 minutes. We value your time and hunger.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card border border-gray-100 dark:border-gray-700 shadow-lg h-100 bg-white dark:bg-slate-800 rounded-xl sm:rounded-[2rem] hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="card-body text-center p-4 sm:p-6 md:p-8 relative z-10">
                  <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block">
                    <i className="fas fa-utensils text-6xl sm:text-9xl text-orange-500 transform rotate-12"></i>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-orange-600 dark:text-orange-400 text-2xl sm:text-3xl md:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-utensils"></i>
                  </div>
                  <h4 className="card-title text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Fresh Ingredients</h4>
                  <p className="card-text text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">We use only the freshest, locally sourced ingredients to ensure every bite is bursting with flavor.</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4 mx-auto">
              <div className="card border border-gray-100 dark:border-gray-700 shadow-lg h-100 bg-white dark:bg-slate-800 rounded-xl sm:rounded-[2rem] hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="card-body text-center p-4 sm:p-6 md:p-8 relative z-10">
                  <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block">
                    <i className="fas fa-star text-6xl sm:text-9xl text-orange-500 transform rotate-12"></i>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-orange-600 dark:text-orange-400 text-2xl sm:text-3xl md:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="card-title text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Best Quality</h4>
                  <p className="card-text text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Five-star quality food prepared by expert chefs who are passionate about culinary excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-12 sm:py-16 md:py-20 bg-background dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="row text-center mb-8 sm:mb-12">
            <div className="col-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-3 sm:mb-4">Popular Dishes</h2>
              <p className="text-base sm:text-lg text-muted-foreground">Try our most loved dishes</p>
            </div>
          </div>
          <div className="row g-3 sm:g-4">
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card border-0 shadow-lg h-100 bg-card dark:bg-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 sm:h-48 bg-cover bg-center" style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop&q=80")'
                }}></div>
                <div className="card-body p-3 sm:p-4">
                  <h5 className="card-title text-foreground dark:text-white font-bold text-base sm:text-lg">Masala Dosa</h5>
                  <p className="card-text text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">Crispy fermented crepe filled with spiced potato</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary font-bold text-base sm:text-lg">₹120</span>
                    <button
                      className="btn btn-primary btn-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                      onClick={handleGetStarted}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card border-0 shadow-lg h-100 bg-card dark:bg-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 sm:h-48 bg-cover bg-center" style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&q=80")'
                }}></div>
                <div className="card-body p-3 sm:p-4">
                  <h5 className="card-title text-foreground dark:text-white font-bold text-base sm:text-lg">Omelette</h5>
                  <p className="card-text text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">Three egg omelette with vegetables and cheese</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary font-bold text-base sm:text-lg">₹100</span>
                    <button
                      className="btn btn-primary btn-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                      onClick={handleGetStarted}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4 mx-auto">
              <div className="card border-0 shadow-lg h-100 bg-card dark:bg-slate-700 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 sm:h-48 bg-cover bg-center" style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop&q=80")'
                }}></div>
                <div className="card-body p-3 sm:p-4">
                  <h5 className="card-title text-foreground dark:text-white font-bold text-base sm:text-lg">Chocolate Lava Cake</h5>
                  <p className="card-text text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">Warm chocolate cake with molten center</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary font-bold text-base sm:text-lg">₹150</span>
                    <button
                      className="btn btn-primary btn-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                      onClick={handleGetStarted}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <button
              className="btn btn-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl min-h-[44px] sm:min-h-[50px]"
              onClick={handleGetStarted}
            >
              <i className="fas fa-eye me-2 sm:me-3"></i>
              View Full Menu
              <i className="fas fa-arrow-right ms-2 sm:ms-3"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-muted dark:bg-slate-800">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-4 fw-bold text-foreground dark:text-white">What Our Customers Say</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm bg-card dark:bg-slate-700 rounded-3xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="card-body p-4">
                  <div className="text-yellow-400 mb-3 text-lg">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text text-muted-foreground mb-4 italic">&ldquo;Amazing food and super fast delivery! The butter chicken was absolutely delicious.&rdquo;</p>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&q=80"
                      alt="Customer"
                      className="rounded-full me-3 w-12 h-12 object-cover"
                    />
                    <div>
                      <h6 className="mb-0 text-foreground dark:text-white font-semibold">John Doe</h6>
                      <small className="text-muted-foreground">Regular Customer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div style={{ color: '#ffd700', marginBottom: '1rem' }}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text text-muted-foreground mb-4 italic">&ldquo;Best food delivery service in town. Fresh ingredients and great taste every time!&rdquo;</p>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face&q=80"
                      alt="Customer"
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0">Sarah Wilson</h6>
                      <small className="text-muted">Food Blogger</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm bg-card dark:bg-slate-700 rounded-3xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="card-body p-4">
                  <div className="text-yellow-400 mb-3 text-lg">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="card-text text-muted-foreground mb-4 italic">&ldquo;Love the variety and quality. Take It Cheesy never disappoints!&rdquo;</p>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&q=80"
                      alt="Customer"
                      className="rounded-full me-3 w-12 h-12 object-cover"
                    />
                    <div>
                      <h6 className="mb-0 text-foreground dark:text-white font-semibold">Mike Johnson</h6>
                      <small className="text-muted-foreground">Chef</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white py-12 transition-colors duration-300">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="font-bold mb-3 text-gray-900 dark:text-white">Take It Cheesy</h5>
              <p className="text-gray-600 dark:text-gray-300">Your favorite food, delivered fast and fresh to your doorstep.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-xl">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-xl">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-xl">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="font-bold mb-3 text-gray-900 dark:text-white">Quick Links</h5>
              <ul className="list-unstyled space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-decoration-none">About Us</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-decoration-none">Menu</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-decoration-none">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="font-bold mb-3 text-gray-900 dark:text-white">Contact Info</h5>
              <p className="text-gray-600 dark:text-gray-300 mb-2"><i className="fas fa-map-marker-alt me-2 text-primary"></i>123 Food Street, City</p>
              <p className="text-gray-600 dark:text-gray-300 mb-2"><i className="fas fa-phone me-2 text-primary"></i>+1 234 567 8900</p>
              <p className="text-gray-600 dark:text-gray-300 mb-2"><i className="fas fa-envelope me-2 text-primary"></i>info@takeitcheesy.com</p>
            </div>
          </div>
          <hr className="my-8 border-gray-300 dark:border-gray-700" />
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">&copy; 2025 Take It Cheesy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-toggler {
          border: none;
        }

        .navbar-toggler:focus {
          box-shadow: none;
        }

        .nav-link {
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #ff6b35 !important;
        }
      `}</style>
    </div>
  );
}
