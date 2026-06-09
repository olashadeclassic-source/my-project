'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, Rocket, Star, ArrowRight, Mail, Layout, Users } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight">PageTurner Pages</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</a>
              <a href="#portfolio" className="text-slate-600 hover:text-blue-600 font-medium transition">Portfolio</a>
              <a href="#process" className="text-slate-600 hover:text-blue-600 font-medium transition">Process</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition">Pricing</a>
              <Link href="/chat" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block">Beautiful Landing Pages</span>
                <span className="block text-blue-600">For Your Best-Seller</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                High-converting, professionally designed sales pages for indie authors and small publishers. 
                We handle the design, tech, and optimization so you can focus on writing your next masterpiece.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/chat" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transition">
                  Build My Book Page
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <p className="mt-3 text-sm text-slate-400">
                  Join 500+ authors who trust PageTurner Pages.
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md overflow-hidden bg-white border border-slate-200 aspect-[3/4]">
                <div className="bg-slate-100 h-8 flex items-center px-4 space-x-2 border-b border-slate-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                   <div className="w-32 h-48 bg-slate-200 rounded shadow-md mb-4 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-slate-400" />
                   </div>
                   <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                   <div className="h-4 w-1/2 bg-slate-100 rounded mb-6"></div>
                   <div className="grid grid-cols-3 gap-2 w-full mb-6">
                      <div className="h-10 bg-slate-50 rounded border border-slate-100"></div>
                      <div className="h-10 bg-slate-50 rounded border border-slate-100"></div>
                      <div className="h-10 bg-slate-50 rounded border border-slate-100"></div>
                   </div>
                   <div className="w-full h-10 bg-blue-100 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                   <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-50 tracking-wider uppercase">Live Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Everything You Need to Sell More Books</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">We don't just build pages; we build conversion machines.</p>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: 'Custom Design', icon: <Layout className="h-8 w-8 text-blue-500" />, desc: 'Tailored to your genre and book cover for a seamless brand experience.' },
              { title: 'Optimized for Sales', icon: <Rocket className="h-8 w-8 text-blue-500" />, desc: 'Strategic call-to-actions designed to turn visitors into buyers.' },
              { title: 'Mobile Ready', icon: <CheckCircle className="h-8 w-8 text-blue-500" />, desc: 'Your page looks stunning on phones, tablets, and desktops.' },
              { title: 'Buy Links Integrated', icon: <Star className="h-8 w-8 text-blue-500" />, desc: 'Direct links to Amazon, Kobo, Apple Books, and your own shop.' },
              { title: 'Email Capture', icon: <Mail className="h-8 w-8 text-blue-500" />, desc: 'Build your fan base with integrated newsletter signup forms.' },
              { title: 'Expert Support', icon: <Users className="h-8 w-8 text-blue-500" />, desc: 'Our team is here to help you every step of the way.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition group">
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 mb-5 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Demo Section */}
      <section id="portfolio" className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold sm:text-4xl">See It In Action</h2>
              <p className="mt-4 text-lg text-slate-300">
                Check out our Starter Template. It's clean, fast, and proven to convert. 
                Whether you're releasing a debut novel or promoting a backlist title, 
                our templates provide the professional edge you need.
              </p>
              <div className="mt-8">
                <Link href="/templates/demo/index.html" className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition">
                  View Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 relative">
               <div className="bg-slate-800 p-2 rounded-xl shadow-2xl border border-slate-700 transform lg:rotate-3">
                  <div className="bg-slate-700 h-6 flex items-center px-3 space-x-1 rounded-t-lg">
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-b-lg">
                    <div className="aspect-video bg-slate-800 rounded flex items-center justify-center">
                       <Layout className="h-12 w-12 text-slate-600" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">How It Works</h2>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            {[
              { step: '01', title: 'Intake', desc: 'Fill out our simple form with your book details and assets.' },
              { step: '02', title: 'Design', desc: 'Our team customizes the template to match your book brand.' },
              { step: '03', title: 'Review', desc: 'You review the page and request any final tweaks.' },
              { step: '04', title: 'Launch', desc: 'We deploy your page and you start selling!' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-slate-50 mb-[-1.5rem] select-none">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">{item.title}</h3>
                <p className="text-slate-600 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-slate-500">Choose the plan that fits your launch goals.</p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
              <p className="mt-4 text-slate-500 italic">Perfect for new releases and pre-orders.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">$99</span>
                <span className="ml-1 text-slate-500 italic text-lg">one-time</span>
              </div>
              <ul className="mt-10 space-y-4 flex-1">
                {['Single book landing page', 'Template-based customization', 'Custom cover art mockup', 'Up to 5 buy links', 'Email capture integration', '1 year free hosting'].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/chat" className="mt-10 block w-full bg-slate-100 text-slate-800 text-center py-4 rounded-xl font-bold hover:bg-slate-200 transition">
                Get Started
              </Link>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white p-10 rounded-3xl border-2 border-blue-600 shadow-xl flex flex-col relative transform lg:scale-105">
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold text-slate-900">Premium</h3>
              <p className="mt-4 text-slate-500 italic">Advanced features for high-impact launches.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">$299</span>
                <span className="ml-1 text-slate-500 italic text-lg">one-time</span>
              </div>
              <ul className="mt-10 space-y-4 flex-1">
                {['Everything in Starter', 'Fully custom-designed page', 'Advanced analytics dashboard', 'A/B test variants', 'Countdown timer for pre-orders', 'Priority support', 'Domain setup assistance'].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-600">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/chat" className="mt-10 block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                Go Premium
              </Link>
            </div>
          </div>
          <p className="mt-12 text-center text-slate-400 italic">
            Annual hosting & maintenance: $99/year after the first year.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-slate-800 tracking-tight">PageTurner Pages</span>
            </div>
            <div className="mt-8 md:mt-0 flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-slate-500 transition">Terms</a>
              <a href="#" className="text-slate-400 hover:text-slate-500 transition">Privacy</a>
              <a href="mailto:hello@pageturnerpages.com" className="text-slate-400 hover:text-slate-500 transition flex items-center">
                <Mail className="h-5 w-5 mr-1" />
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left">
            <p className="text-slate-400 text-sm">&copy; 2024 PageTurner Pages. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
