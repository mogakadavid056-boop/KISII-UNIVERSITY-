import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  Calendar,
  ExternalLink,
  BookOpen,
  Building2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Award,
  CheckCircle,
  X,
  CreditCard,
  Printer,
  Menu,
  Clock,
  Shield,
  ArrowRight,
  Laptop
} from 'lucide-react';

interface Slide {
  image: string;
  badge?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [portalOpen, setPortalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<'units' | 'fees' | 'results' | 'hostel'>('units');

  // Hero carousel slides mirroring real Kisii University site
  const slides: Slide[] = [
    {
      image: 'https://kisiiuniversity.ac.ke/storage/sliders/images/bM4ule8ijdTnVCQXICsUZXC5l4ZMcqsNoTQwSug1.jpg',
      badge: 'FEATURED STUDENT INNOVATOR & SOFTWARE LEAD',
      title: 'THEOPHILUX',
      subtitle: 'Recognized for Outstanding Technological Leadership & Software Innovation at Kisii University School of Information Science and Technology.',
      ctaText: 'View Theophilux Profile'
    },
    {
      image: 'https://kisiiuniversity.ac.ke/storage/sliders/images/NE2qMUniF4Ale8ajF1ISfk53GYqZUIZhczCZozSY.jpg',
      badge: 'INCLUSIVITY & BORDERLESSNESS',
      title: 'Gusii Innovation Week 2026',
      subtitle: 'Fostering research, industrial linkages, digital transformation, and sustainable regional development.',
      ctaText: 'Explore Research & Innovation'
    },
    {
      image: 'https://kisiiuniversity.ac.ke/storage/sliders/images/YDlb2MVIA3UgVvNFjzv4uORKiHrKrGSdJXJCWk4J.jpg',
      badge: 'ACADEMIC EXCELLENCE',
      title: '16th Graduation Ceremony',
      subtitle: 'Celebrating academic milestones, degree conferment, and societal impact across all 8 faculties.',
      ctaText: 'View Graduation Booklet'
    },
    {
      image: 'https://kisiiuniversity.ac.ke/storage/sliders/images/vSGS84VVQrgpfnkRaH0Sgc6eu3DsBLKKClIb1wNC.jpg',
      badge: 'INTERNATIONAL COLLABORATION',
      title: 'Global Academic Partnerships',
      subtitle: 'Expanding student exchange programs, global research grants, and accredited degree pathways.',
      ctaText: 'International Admissions'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white text-[#212529] font-sans antialiased selection:bg-[#4169E1] selection:text-white">
      {/* 1. TOP BRAND BAR (Royal Blue: #4169E1 matching the real site) */}
      <section id="brand-bar" className="bg-[#4169E1] text-white text-[13px] font-normal py-1.5 px-4 sm:px-8 border-b border-blue-600">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-1">
          {/* Left Gateway Links */}
          <nav aria-label="Gateway navigation" className="flex items-center flex-wrap gap-x-4 gap-y-1">
            <a href="#conferences" className="hover:text-blue-200 transition text-[13px]">Conferences</a>
            <span className="text-blue-300">|</span>
            <a href="#tenders" className="hover:text-blue-200 transition text-[13px]">Tenders</a>
            <span className="text-blue-300">|</span>
            <a href="#careers" className="hover:text-blue-200 transition text-[13px]">Careers</a>
            <span className="text-blue-300">|</span>
            <a href="#helpdesk" className="hover:text-blue-200 transition text-[13px]">Help Desk</a>
            <span className="text-blue-300">|</span>
            <a href="#campustour" className="hover:text-blue-200 transition text-[13px]">Campus Tour</a>
            <span className="text-blue-300">|</span>
            <a href="#news" className="hover:text-blue-200 transition text-[13px]">News</a>
            <span className="text-blue-300">|</span>
            <a href="#events" className="hover:text-blue-200 transition text-[13px]">Events</a>
            <span className="text-blue-300">|</span>
            <a href="#downloads" className="hover:text-blue-200 transition text-[13px]">Downloads</a>
          </nav>

          {/* Right: Big Name Spotlight & Portal Access */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] tracking-wide uppercase shadow-sm">
              SPECIAL EDITION: THEOPHILUX
            </div>
            <button
              onClick={() => setPortalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded text-[12px] font-semibold transition cursor-pointer flex items-center space-x-1"
            >
              <User className="w-3 h-3" />
              <span>Student Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN HEADER & LOGO (Exact Kisii University Brand & Typo) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Brand text */}
          <div className="flex items-center gap-3">
            <img
              src="https://kisiiuniversity.ac.ke/storage/public/logo/sC1eVB3txeW7z2mpj2eCmVnzP3XTOfeBKBklwEZv.png"
              alt="Kisii University Logo"
              className="w-[62px] h-[62px] object-contain block"
              onError={(e: any) => {
                // Fallback crest if cross-origin image fails
                e.target.style.display = 'none';
              }}
            />
            <div className="flex flex-col justify-center leading-none">
              <h1 className="m-0 p-0 text-[22px] font-bold text-[#1848A8] tracking-[0.1px] uppercase font-serif">
                Kisii University
              </h1>
              <p className="m-0 mt-1.5 text-[12px] text-[#4d5968] font-semibold">
                Inclusivity &amp; Borderlessness
              </p>
            </div>
          </div>

          {/* Desktop Navigation Menu matching real Kisii University site */}
          <nav className="hidden lg:flex items-center space-x-1 text-[15px] font-semibold text-[#1848A8]">
            {/* ABOUT DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2 hover:text-[#4169E1] transition">
                <span>ABOUT</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-xl rounded-md py-2 z-50 text-[13px] font-normal text-gray-700">
                  <a href="#overview" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Overview &amp; History</a>
                  <a href="#charter" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Service Charter</a>
                  <a href="#council" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">University Council</a>
                  <a href="#vc" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Vice-Chancellor's Welcome</a>
                  <a href="#management" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">University Management</a>
                </div>
              )}
            </div>

            {/* ACADEMICS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academics')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2 hover:text-[#4169E1] transition">
                <span>ACADEMICS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'academics' && (
                <div className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-xl rounded-md py-2 z-50 text-[13px] font-normal text-gray-700">
                  <a href="#schools" className="block px-4 py-2 font-bold text-[#1848A8] border-b border-gray-100">Academic Schools:</a>
                  <a href="#school-it" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">Information Science &amp; Tech</a>
                  <a href="#school-health" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">Health Sciences &amp; Medicine</a>
                  <a href="#school-law" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">School of Law</a>
                  <a href="#school-business" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">Business and Economics</a>
                  <a href="#school-education" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">School of Education</a>
                  <a href="#school-science" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">Pure and Applied Sciences</a>
                  <a href="#school-agri" className="block px-4 py-1.5 hover:bg-blue-50 hover:text-[#1848A8]">Agriculture &amp; Natural Resources</a>
                  <a href="#calendar" className="block px-4 py-2 mt-1 border-t border-gray-100 hover:bg-blue-50 hover:text-[#1848A8]">Academic Calendar 2025/2026</a>
                </div>
              )}
            </div>

            {/* ADMISSION DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('admission')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-3 py-2 hover:text-[#4169E1] transition">
                <span>ADMISSION</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'admission' && (
                <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-xl rounded-md py-2 z-50 text-[13px] font-normal text-gray-700">
                  <a href="#undergrad" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Undergraduate Application</a>
                  <a href="#postgrad" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Postgraduate Studies</a>
                  <a href="#diploma" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Diploma &amp; Certificate</a>
                  <a href="#apply" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">How to Apply Online</a>
                  <a href="#international" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">International Students</a>
                  <a href="#fees" className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1848A8]">Fee Structures 2025/2026</a>
                </div>
              )}
            </div>

            <a href="#news" className="px-3 py-2 hover:text-[#4169E1] transition">NEWS</a>
            <a href="#life" className="px-3 py-2 hover:text-[#4169E1] transition">LIFE AT KSU</a>
            <a href="#downloads" className="px-3 py-2 hover:text-[#4169E1] transition">DOWNLOADS</a>

            {/* DIRECT STUDENT PORTAL BUTTON */}
            <button
              onClick={() => setPortalOpen(true)}
              className="ml-3 px-4 py-2 bg-[#1848A8] hover:bg-[#4169E1] text-white rounded font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5 shadow"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-[#1848A8] transition cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Collapsible search bar */}
        {searchOpen && (
          <div className="bg-gray-100 border-t border-gray-200 py-3 px-4">
            <div className="max-w-2xl mx-auto flex items-center gap-2">
              <input
                type="text"
                placeholder="Search Kisii University website..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-[#4169E1]"
              />
              <button
                onClick={() => alert(`Searching for "${searchQuery}" on Kisii University website...`)}
                className="px-5 py-2 bg-[#1848A8] text-white rounded font-semibold text-sm cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2 text-sm font-semibold text-[#1848A8]">
            <a href="#about" className="block py-2">ABOUT</a>
            <a href="#academics" className="block py-2">ACADEMICS</a>
            <a href="#admission" className="block py-2">ADMISSION</a>
            <a href="#news" className="block py-2">NEWS</a>
            <a href="#life" className="block py-2">LIFE AT KSU</a>
            <button
              onClick={() => { setPortalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 px-3 bg-[#1848A8] text-white rounded font-bold"
            >
              Student Portal (Theophilux)
            </button>
          </div>
        )}
      </header>

      {/* 3. PROMINENT BIG NAME BANNER */}
      <section className="bg-gradient-to-r from-[#1848A8] via-[#4169E1] to-[#1e3a8a] text-white py-3 px-4 shadow-md border-b-2 border-amber-400">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
              TX
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-wide uppercase text-amber-300">
                THEOPHILUX
              </span>
              <span className="hidden sm:inline text-xs text-blue-100 ml-2">
                • Lead Software Innovator • Kisii University Portal Edition
              </span>
            </div>
          </div>
          <button
            onClick={() => setPortalOpen(true)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition cursor-pointer shadow flex items-center space-x-1"
          >
            <span>Open Student Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. HERO SWIPER SLIDER (Exact images from Kisii University site) */}
      <section className="relative bg-slate-900 overflow-hidden h-[420px] sm:h-[480px] lg:h-[520px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>

            {/* Slide Text Content */}
            <div className="absolute bottom-12 left-0 right-0 z-20">
              <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white space-y-3">
                  {slide.badge && (
                    <span className="inline-block bg-[#4169E1] text-white text-[11px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {slide.badge}
                    </span>
                  )}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                    {slide.subtitle}
                  </p>
                  {slide.ctaText && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (idx === 0) setPortalOpen(true);
                          else alert(`Opening official page: ${slide.title}`);
                        }}
                        className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer shadow-lg"
                      >
                        {slide.ctaText}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        <button
          onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                i === currentSlide ? 'bg-amber-400 w-6' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 5. GATEWAY TILES SECTION (Just like real site) */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <a
              href="#kuccps"
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow transition block group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#1848A8] flex items-center justify-center mb-2 group-hover:bg-[#1848A8] group-hover:text-white transition">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">KUCCPS Admission</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Direct Intake</p>
            </a>

            <button
              onClick={() => setPortalOpen(true)}
              className="bg-white p-4 rounded-lg border border-amber-300 shadow-sm hover:border-[#1848A8] hover:shadow transition block group cursor-pointer"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                <User className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Student Portal</h4>
              <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Theophilux</p>
            </button>

            <a
              href="#elearning"
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow transition block group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#1848A8] flex items-center justify-center mb-2 group-hover:bg-[#1848A8] group-hover:text-white transition">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">E-Learning LMS</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Moodle Classrooms</p>
            </a>

            <a
              href="#staff"
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow transition block group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#1848A8] flex items-center justify-center mb-2 group-hover:bg-[#1848A8] group-hover:text-white transition">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Staff Portal</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Employee Self-Service</p>
            </a>

            <a
              href="#library"
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow transition block group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#1848A8] flex items-center justify-center mb-2 group-hover:bg-[#1848A8] group-hover:text-white transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Digital Library</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Repository &amp; Journals</p>
            </a>

            <a
              href="#fee-structure"
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow transition block group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#1848A8] flex items-center justify-center mb-2 group-hover:bg-[#1848A8] group-hover:text-white transition">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">Fee Structures</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">2025/2026 Academic</p>
            </a>
          </div>
        </div>
      </section>

      {/* 6. CAMPUS NEWS SECTION (Exact Stanford-News section layout from real site) */}
      <section id="news" className="py-12 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end border-b-2 border-gray-100 pb-4 mb-8">
            <div>
              <span className="text-[#4169E1] font-bold text-xs uppercase tracking-wider">Latest Highlights</span>
              <h2 className="text-3xl font-extrabold text-[#1848A8] font-serif">Campus News</h2>
            </div>
            <a href="#all-news" className="text-xs font-bold text-[#1848A8] hover:text-[#4169E1] flex items-center space-x-1">
              <span>View All News</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Article 1 - Theophilux Featured Spotlight */}
            <article className="border border-amber-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between bg-amber-50/20">
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src="https://kisiiuniversity.ac.ke/storage/sliders/images/bM4ule8ijdTnVCQXICsUZXC5l4ZMcqsNoTQwSug1.jpg"
                    alt="Theophilux"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    SPECIAL FEATURE
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">INNOVATION SPOTLIGHT</span>
                  <h3 className="font-bold text-base text-gray-900 mt-1 leading-snug">
                    Theophilux Leads Groundbreaking Software &amp; AI Research at Kisii University
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    The School of Information Science and Technology honors student innovator Theophilux for distinguished technical leadership and campus portal developments.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => setPortalOpen(true)}
                  className="text-xs font-bold text-[#1848A8] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>Read Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Article 2 - Real from Kisii University */}
            <article className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src="https://kisiiuniversity.ac.ke/storage/public/resources/91hRM8O9ZWMvEfuwCwyQnfZvOw9D5MGMk94LEbBE.jpg"
                    alt="Gusii Innovation Week"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold text-[#4169E1] uppercase">NEWS</span>
                  <h3 className="font-bold text-base text-gray-900 mt-1 leading-snug">
                    Gusii Innovation Week Draws to a Close
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    A vibrant showcase of student innovations, robotics, agro-processing, and technology transfers presented to industry partners and investors.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <a href="#read" className="text-xs font-bold text-[#1848A8] hover:underline flex items-center space-x-1">
                  <span>Read Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>

            {/* Article 3 - Real from Kisii University */}
            <article className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src="https://kisiiuniversity.ac.ke/storage/public/resources/9MJ6Q40O64a1daO7ckQg3lPoaHjRzoUXxMq4FSNT.jpg"
                    alt="Food Systems Innovation"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold text-[#4169E1] uppercase">RESEARCH</span>
                  <h3 className="font-bold text-base text-gray-900 mt-1 leading-snug">
                    The Food Systems Innovation Hub
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    Kisii University establishes the Food Systems Innovation Hub in partnership with European research institutions to combat regional crop diseases.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <a href="#read" className="text-xs font-bold text-[#1848A8] hover:underline flex items-center space-x-1">
                  <span>Read Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>

            {/* Article 4 - Real from Kisii University */}
            <article className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src="https://kisiiuniversity.ac.ke/storage/public/resources/49Tcrht9UifYc65oySM3BECtouYIzztiGnPFbZZZ.jpg"
                    alt="KSUSA 2026 Council"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold text-[#4169E1] uppercase">STUDENT LIFE</span>
                  <h3 className="font-bold text-base text-gray-900 mt-1 leading-snug">
                    KSUSA 2026 Council &amp; Congress Sworn into Office
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    The newly elected student leadership pledges enhanced student welfare, expanded Wi-Fi connectivity, and academic mentorship.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <a href="#read" className="text-xs font-bold text-[#1848A8] hover:underline flex items-center space-x-1">
                  <span>Read Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC SCHOOLS SECTION */}
      <section id="schools" className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#4169E1] font-bold text-xs uppercase tracking-wider">Centers of Excellence</span>
            <h2 className="text-3xl font-extrabold text-[#1848A8] font-serif mt-1">Our Academic Schools</h2>
            <p className="text-sm text-gray-600 mt-2">
              Kisii University is composed of 8 recognized schools offering over 140 degree, diploma, and postgraduate programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'School of Information Science & Technology', desc: 'Software engineering, Computer Science, Cyber Security, Artificial Intelligence.' },
              { name: 'School of Health Sciences', desc: 'Medicine and Surgery (MBChB), Clinical Medicine, Nursing, Public Health.' },
              { name: 'School of Law', desc: 'Accredited by the Council of Legal Education. Jurisprudence, Commercial Law, Moot Courts.' },
              { name: 'School of Business and Economics', desc: 'Commerce, Finance, Human Resource Management, Accounting, Economics.' },
              { name: 'School of Education', desc: 'Teacher education in Sciences, Arts, Curriculum Development, Educational Psychology.' },
              { name: 'School of Pure and Applied Sciences', desc: 'Biochemistry, Analytical Chemistry, Applied Statistics, Microbiology.' },
              { name: 'School of Agriculture & Natural Resources', desc: 'Agribusiness, Crop Protection, Environmental Science, Fisheries.' },
              { name: 'School of Arts and Social Sciences', desc: 'Criminology, Communication and Media, Peace & Conflict Studies, Sociology.' }
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:border-[#1848A8] hover:shadow-md transition space-y-2"
              >
                <div className="w-9 h-9 rounded bg-blue-50 text-[#1848A8] flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-sm text-[#1848A8] leading-tight">
                  {s.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER (Exact copy of Kisii University's real footer content) */}
      <footer className="bg-[#1848A8] text-white py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-400">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-[13px]">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://kisiiuniversity.ac.ke/storage/public/logo/sC1eVB3txeW7z2mpj2eCmVnzP3XTOfeBKBklwEZv.png"
                alt="Kisii University"
                className="w-10 h-10 object-contain bg-white rounded-full p-1"
              />
              <span className="font-bold text-lg font-serif tracking-wide">KISII UNIVERSITY</span>
            </div>
            <p className="text-blue-100 leading-relaxed text-xs">
              Vision: "An inclusive and borderless University that creates positive change in the world."
            </p>
            <div className="text-amber-300 font-bold text-xs pt-1">
              Honoring Student Innovator: THEOPHILUX
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 border-b border-blue-400 pb-1">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-blue-100">
              <li><a href="#admissions" className="hover:text-white">KUCCPS Admissions</a></li>
              <li><a href="#tenders" className="hover:text-white">Procurement &amp; Tenders</a></li>
              <li><a href="#careers" className="hover:text-white">Careers / Open Adverts</a></li>
              <li><a href="#downloads" className="hover:text-white">University Downloads</a></li>
              <li><a href="#library" className="hover:text-white">E-Library Resources</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 border-b border-blue-400 pb-1">
              Portals
            </h4>
            <ul className="space-y-1.5 text-xs text-blue-100">
              <li><button onClick={() => setPortalOpen(true)} className="hover:text-white cursor-pointer font-bold">Student Portal (Theophilux)</button></li>
              <li><a href="#staff-portal" className="hover:text-white">Staff ERP Portal</a></li>
              <li><a href="#elearning" className="hover:text-white">E-Learning Portal (LMS)</a></li>
              <li><a href="#helpdesk" className="hover:text-white">Customer Care / Help Desk</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 border-b border-blue-400 pb-1">
              Main Campus Contacts
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Kisii-Kilgoris Road<br />
              P.O. Box 408-40200, Kisii, Kenya.<br />
              Tel: +254 773 452 574 / +254 058 30826<br />
              Email: info@kisiiuniversity.ac.ke<br />
              M-Pesa Paybill: 833500
            </p>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto mt-8 pt-6 border-t border-blue-500/50 flex flex-col sm:flex-row justify-between items-center text-xs text-blue-200 gap-2">
          <span>&copy; {new Date().getFullYear()} Kisii University. All Rights Reserved.</span>
          <span className="font-bold text-amber-300">Customized Edition for Theophilux</span>
        </div>
      </footer>

      {/* 9. AUTHENTIC STUDENT PORTAL MODAL (Dedicated to Theophilux) */}
      {portalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border-2 border-[#1848A8] my-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#1848A8] text-white p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg border-2 border-white shadow">
                  TX
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="font-bold text-lg sm:text-xl">THEOPHILUX</h2>
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Enrolled
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 font-mono mt-0.5">
                    Reg Number: <span className="font-bold text-amber-300">IN16/00142/22</span> • Bachelor of Science in Software Engineering
                  </p>
                  <p className="text-[11px] text-blue-200">
                    School of Information Science &amp; Technology • Year 3 Semester 2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPortalOpen(false)}
                className="text-white hover:text-amber-300 text-2xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Portal Tab Navigation */}
            <div className="bg-gray-100 px-6 pt-3 flex space-x-2 border-b border-gray-200 text-xs font-bold overflow-x-auto">
              {[
                { id: 'units', label: 'Registered Units' },
                { id: 'fees', label: 'Fee Statement (KES 0.00 Balance)' },
                { id: 'results', label: 'Exam Results (GPA 3.92)' },
                { id: 'hostel', label: 'Hostel Allocation' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setPortalTab(t.id as any)}
                  className={`px-4 py-2.5 rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                    portalTab === t.id
                      ? 'bg-white text-[#1848A8] border-t-2 border-[#1848A8] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6">
              {portalTab === 'units' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700">Academic Year 2025/2026 • Semester II</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      Registration Status: Complete
                    </span>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-gray-50 text-gray-600 border-y border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3">Unit Code</th>
                        <th className="py-2.5 px-3">Unit Title</th>
                        <th className="py-2.5 px-3">Hall</th>
                        <th className="py-2.5 px-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-[#1848A8]">COMP 321</td>
                        <td className="py-2.5 px-3 font-sans text-gray-800">Distributed Systems &amp; Cloud Architecture</td>
                        <td className="py-2.5 px-3 font-sans text-gray-600">Lab 4 (Science Complex)</td>
                        <td className="py-2.5 px-3 text-gray-600">Mon 8:00 AM</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-[#1848A8]">COMP 322</td>
                        <td className="py-2.5 px-3 font-sans text-gray-800">Compiler Construction &amp; Grammars</td>
                        <td className="py-2.5 px-3 font-sans text-gray-600">Lecture Theatre 2</td>
                        <td className="py-2.5 px-3 text-gray-600">Tue 11:00 AM</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-[#1848A8]">COMP 323</td>
                        <td className="py-2.5 px-3 font-sans text-gray-800">Mobile Application Development</td>
                        <td className="py-2.5 px-3 font-sans text-gray-600">ICT Lab 2</td>
                        <td className="py-2.5 px-3 text-gray-600">Wed 2:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-[#1848A8]">COMP 324</td>
                        <td className="py-2.5 px-3 font-sans text-gray-800">Software Verification &amp; Testing</td>
                        <td className="py-2.5 px-3 font-sans text-gray-600">Pavilion 3</td>
                        <td className="py-2.5 px-3 text-gray-600">Thu 8:00 AM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {portalTab === 'fees' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-gray-50 border rounded">
                      <div className="text-gray-500">Invoiced</div>
                      <div className="font-bold text-gray-900 text-sm mt-1">KES 120,000</div>
                    </div>
                    <div className="p-3 bg-gray-50 border rounded">
                      <div className="text-gray-500">Paid</div>
                      <div className="font-bold text-emerald-600 text-sm mt-1">KES 120,000</div>
                    </div>
                    <div className="p-3 bg-gray-50 border rounded">
                      <div className="text-gray-500">Balance</div>
                      <div className="font-bold text-blue-700 text-sm mt-1">KES 0.00 (Cleared)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-[#1848A8]">
                    ✓ Official clearance issued for examination session. No arrears pending.
                  </div>
                </div>
              )}

              {portalTab === 'results' && (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Year 3 Semester 1 Exam Grades</span>
                    <span className="font-bold text-emerald-700">Cumulative GPA: 3.92 (First Class Track)</span>
                  </div>
                  <table className="w-full text-left font-mono">
                    <thead className="bg-gray-50 border-y">
                      <tr>
                        <th className="py-2 px-3">Unit</th>
                        <th className="py-2 px-3">Score</th>
                        <th className="py-2 px-3">Grade</th>
                        <th className="py-2 px-3 font-sans">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr><td className="py-2 px-3">COMP 311 Software Architecture</td><td className="py-2 px-3">88%</td><td className="py-2 px-3 font-bold text-emerald-600">A</td><td className="py-2 px-3 font-sans">Distinction</td></tr>
                      <tr><td className="py-2 px-3">COMP 312 Database Systems</td><td className="py-2 px-3">84%</td><td className="py-2 px-3 font-bold text-emerald-600">A</td><td className="py-2 px-3 font-sans">Distinction</td></tr>
                      <tr><td className="py-2 px-3">COMP 313 Artificial Intelligence</td><td className="py-2 px-3">81%</td><td className="py-2 px-3 font-bold text-emerald-600">A</td><td className="py-2 px-3 font-sans">Distinction</td></tr>
                      <tr><td className="py-2 px-3">COMP 314 Computer Networks</td><td className="py-2 px-3">86%</td><td className="py-2 px-3 font-bold text-emerald-600">A</td><td className="py-2 px-3 font-sans">Distinction</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {portalTab === 'hostel' && (
                <div className="p-4 bg-gray-50 rounded border space-y-2 text-xs">
                  <div className="font-bold text-sm text-gray-900">Hostel Allocation Confirmed</div>
                  <p className="text-gray-600">Hall: Science Complex Hostel • Block B, Room 24 • Bed 1</p>
                  <p className="text-emerald-700 font-semibold">Allocation Status: Checked In &amp; Paid for 2025/2026 Semester II</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setPortalOpen(false)}
                className="px-5 py-2 bg-[#1848A8] text-white rounded font-bold text-xs cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
