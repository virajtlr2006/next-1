"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/ui/Navbar"
import {
  Home,
  Heart,
  BookOpen,
  Briefcase,
  Wrench,
  Monitor,
  Search,
  Calendar,
  Star,
  Shield,
  CreditCard,
  Headphones,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-black via-slate-900/20 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(85,140,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/20 border border-navy/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-navy" />
              <span className="text-sm text-white">Trusted by 50,000+ Customers</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance">
              All Essential Services for Your Daily Life — In One Place
            </h1>
            <p className="text-lg lg:text-xl text-slate-gray leading-relaxed max-w-2xl mx-auto text-pretty">
              Experience unmatched convenience and reliability with access to a wide range of trusted services, all at
              your fingertips. From home repairs to wellness, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href='categories'>
              <Button
                size="lg"
                className="bg-navy hover:bg-navy-dark text-white transition-all duration-300 hover:shadow-xl hover:shadow-navy/50 hover:scale-105"
              >
                Browse Categories
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              </Link>
              <Link href='about'>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 transition-all duration-300 bg-transparent hover:border-navy hover:scale-105"
              >
                How It Works
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="categories" className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Browse by Category</h2>
            <p className="text-lg text-slate-gray text-pretty">
              Find exactly what you need from our comprehensive service categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                title: "Home Services",
                description: "Cleaning, maintenance, repairs, and home improvement services",
              },
              {
                icon: Heart,
                title: "Health & Wellness",
                description: "Fitness training, nutrition counseling, mental health support",
              },
              {
                icon: BookOpen,
                title: "Education & Learning",
                description: "Tutoring, skill development, online courses, and training",
              },
              {
                icon: Briefcase,
                title: "Professional Services",
                description: "Legal advice, accounting, business consulting, and more",
              },
              {
                icon: Wrench,
                title: "Repairs & Maintenance",
                description: "Appliance repair, electronics, plumbing, electrical work",
              },
              {
                icon: Monitor,
                title: "Digital & Online Services",
                description: "Web design, content creation, digital marketing, IT support",
              },
            ].map((category, index) => (
              <Card
                key={category.title}
                className="p-6 border-slate-800 hover:border-navy bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-navy/30 transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-1"
                style={{
                  animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-navy transition-all duration-300 group-hover:shadow-lg group-hover:shadow-navy/50">
                  <category.icon className="w-6 h-6 text-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-navy transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-gray text-sm leading-relaxed">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section id="services" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Popular Services</h2>
            <p className="text-lg text-slate-gray text-pretty">Most booked services by our community this month</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "House Cleaning",
              "Plumbing Repair",
              "Personal Training",
              "Math Tutoring",
              "Tax Consulting",
              "Web Development",
              "AC Repair",
              "Yoga Classes",
            ].map((service, index) => (
              <Card
                key={service}
                className="p-5 border-slate-800 hover:border-navy bg-slate-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-navy/20 transition-all duration-300 cursor-pointer group hover:scale-105"
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium group-hover:text-navy transition-colors">{service}</span>
                  <ChevronRight className="w-4 h-4 text-slate-gray group-hover:text-navy group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Why Choose Our Platform</h2>
            <p className="text-lg text-slate-gray text-pretty">
              We make everyday services simple, reliable, and accessible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Trusted Providers",
                description: "All service providers are verified and background-checked for your safety",
              },
              {
                icon: Search,
                title: "Wide Service Range",
                description: "Access 1000+ services across multiple categories in one platform",
              },
              {
                icon: Calendar,
                title: "Easy Booking",
                description: "Book services in minutes with our intuitive scheduling system",
              },
              {
                icon: CreditCard,
                title: "Transparent Pricing",
                description: "Clear, upfront pricing with no hidden fees or surprises",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center space-y-4 group cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{
                  animation: `slide-up 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center mx-auto group-hover:bg-navy group-hover:border-navy transition-all duration-300 group-hover:shadow-lg group-hover:shadow-navy/50">
                  <feature.icon className="w-8 h-8 text-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-slate-gray leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">How It Works</h2>
            <p className="text-lg text-slate-gray text-pretty">Get the services you need in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose Service",
                description: "Browse categories and select the service that fits your needs",
              },
              {
                step: "02",
                title: "Book",
                description: "Pick your preferred date, time, and provider from available options",
              },
              {
                step: "03",
                title: "Get It Done",
                description: "Relax while our verified professionals complete your service",
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="relative"
                style={{
                  animation: `fade-in-left 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-navy transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-navy/20">
                  <div className="text-5xl font-bold text-slate-800 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-gray leading-relaxed">{step.description}</p>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-800">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-navy rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Trust Section */}
      <section className="py-16 bg-gradient-to-br from-navy via-navy-dark to-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Services Available" },
              { number: "5000+", label: "Verified Providers" },
              { number: "50,000+", label: "Happy Customers" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group cursor-pointer"
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">What Our Customers Say</h2>
            <p className="text-lg text-slate-gray text-pretty">
              Real experiences from people who use our platform daily
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                text: "Finding a reliable plumber used to be such a hassle. Now I can book one in minutes and know they're verified. Game changer!",
              },
              {
                name: "Michael Chen",
                role: "Small Business Owner",
                text: "The platform made it so easy to find accounting services for my startup. Clear pricing and professional service every time.",
              },
              {
                name: "Emily Rodriguez",
                role: "Working Parent",
                text: "Between work and kids, I don't have time to search for services. This platform saves me hours every week. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="p-6 border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-navy transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-navy/20"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-navy text-navy" />
                  ))}
                </div>
                <p className="text-slate-gray leading-relaxed mb-4 italic">{testimonial.text}</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-gray">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Making Everyday Services Simple, Reliable, and Accessible
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed text-pretty">
              Join thousands of satisfied customers who trust us for their daily service needs
            </p>
            <Link href='/service'>
            <Button
              size="lg"
              className="bg-white hover:bg-slate-100 text-navy transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 mt-6 hover:scale-110"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-navy to-navy-dark rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SS</span>
                </div>
                <span className="font-semibold text-white">ServiceStack</span>
              </div>
              <p className="text-sm text-slate-gray leading-relaxed">
                Your trusted platform for all everyday services, connecting you with verified professionals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {["Home Services", "Health & Wellness", "Education", "Professional Services"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "How It Works", "Contact", "Careers"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Terms of Service", "Privacy Policy", "Trust & Safety"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-slate-gray hover:text-navy transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-gray">© 2025 ServiceStack. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Headphones className="w-4 h-4 text-slate-gray" />
              <span className="text-sm text-slate-gray">24/7 Customer Support: 1-800-SERVICE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
