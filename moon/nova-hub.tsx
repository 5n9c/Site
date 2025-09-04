"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Copy, Zap, Shield, Gamepad2, Check } from "lucide-react"

export default function NovaHub() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [copiedScript, setCopiedScript] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const copyScript = async () => {
    const script = `loadstring(game:HttpGet("https://raw.githubusercontent.com/novahub/main/script.lua"))()`
    await navigator.clipboard.writeText(script)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="min-h-screen bg-black text-white font-light"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Custom Scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 2px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 1px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/nova-clear.png" alt="Nova Hub" className="w-8 h-8" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-white font-medium tracking-wide">NOVA</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("script")}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              Script
            </button>
            <button
              onClick={() => scrollToSection("games")}
              className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              Games
            </button>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide">
              Discord
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative pt-24">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 transition-all duration-700 ${
              visibleElements.has("hero-badge") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="hero-badge"
            data-animate
          >
            <span className="text-gray-300 text-sm tracking-wide">Version 2.1.0</span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-light mb-6 tracking-tight leading-tight transition-all duration-700 delay-200 ${
              visibleElements.has("hero-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="hero-title"
            data-animate
            style={{ letterSpacing: "-0.02em", lineHeight: "1.1" }}
          >
            The Ultimate
            <br />
            <span className="text-gray-400">Roblox Experience</span>
          </h1>

          <p
            className={`text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              visibleElements.has("hero-subtitle") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="hero-subtitle"
            data-animate
          >
            Powerful scripts, seamless execution, and endless possibilities.
            <br />
            Elevate your gameplay with Nova Hub.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-600 ${
              visibleElements.has("hero-buttons") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="hero-buttons"
            data-animate
          >
            <button
              onClick={() => scrollToSection("script")}
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 tracking-wide"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-all duration-300 tracking-wide"
            >
              Learn More
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("features")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-all duration-300 animate-bounce"
        >
          <ChevronDown size={24} />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Zap size={24} />,
                title: "Lightning Fast",
                description: "Optimized scripts that execute instantly without lag or delays.",
              },
              {
                icon: <Shield size={24} />,
                title: "Secure & Safe",
                description:
                  "Advanced multi-layered protection system with undetectable execution. Keeps your account secure with anti-ban technology and encrypted connections.",
              },
              {
                icon: <Gamepad2 size={24} />,
                title: "Universal Support",
                description: "Compatible with all popular Roblox games and experiences.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleElements.has(`feature-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                id={`feature-${index}`}
                data-animate
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Script Section */}
      <section id="script" className="py-32 px-6 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-5xl font-light mb-6 tracking-tight transition-all duration-700 ${
              visibleElements.has("script-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="script-title"
            data-animate
          >
            Ready to Execute
          </h2>

          <p
            className={`text-gray-400 text-lg mb-12 transition-all duration-700 delay-200 ${
              visibleElements.has("script-subtitle") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="script-subtitle"
            data-animate
          >
            Copy and paste this script into your executor
          </p>

          <div
            className={`bg-black border border-white/10 rounded-xl p-6 mb-8 transition-all duration-700 delay-400 ${
              visibleElements.has("script-terminal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="script-terminal"
            data-animate
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <button onClick={copyScript} className="text-gray-400 hover:text-white transition-colors duration-300">
                {copiedScript ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <div className="text-left">
              <code className="text-green-400 font-mono text-sm block leading-relaxed">
                loadstring(game:HttpGet("https://raw.githubusercontent.com/novahub/main/script.lua"))()
              </code>
            </div>
          </div>

          <button
            onClick={copyScript}
            className={`bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 tracking-wide ${
              copiedScript ? "bg-green-500 text-white" : ""
            }`}
          >
            {copiedScript ? "Copied!" : "Copy Script"}
          </button>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-light text-center mb-16 tracking-tight transition-all duration-700 ${
              visibleElements.has("games-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            id="games-title"
            data-animate
          >
            Supported Games
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Arsenal",
                image: "/placeholder.svg?height=200&width=300",
                description: "Aimbot, ESP, and more competitive features",
                features: ["Aimbot", "ESP", "Speed"],
              },
              {
                name: "Adopt Me",
                image: "/placeholder.svg?height=200&width=300",
                description: "Auto-farm, pet duplication, and trading tools",
                features: ["Auto Farm", "Pet Dupe", "Trading"],
              },
              {
                name: "Blox Fruits",
                image: "/placeholder.svg?height=200&width=300",
                description: "Auto-farm, fruit finder, and combat assistance",
                features: ["Auto Farm", "Fruit Finder", "Combat"],
              },
              {
                name: "Jailbreak",
                image: "/placeholder.svg?height=200&width=300",
                description: "Auto-rob, vehicle spawner, and escape tools",
                features: ["Auto Rob", "Vehicles", "Escape"],
              },
              {
                name: "Murder Mystery 2",
                image: "/placeholder.svg?height=200&width=300",
                description: "Role detection, item grabber, and gameplay mods",
                features: ["Role ESP", "Item Grab", "Mods"],
              },
              {
                name: "Brookhaven",
                image: "/placeholder.svg?height=200&width=300",
                description: "House mods, vehicle spawner, and social features",
                features: ["House Mods", "Vehicles", "Social"],
              },
            ].map((game, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${
                  visibleElements.has(`game-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                id={`game-${index}`}
                data-animate
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 tracking-wide">{game.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{game.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {game.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 tracking-wide"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/nova-clear.png" alt="Nova Hub" className="w-8 h-8" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-white font-medium tracking-wide">NOVA</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 tracking-wide">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 tracking-wide">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 tracking-wide">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 tracking-wide">
                Support
              </a>
            </div>

            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <p className="text-gray-500 text-xs tracking-wide">© {new Date().getFullYear()} NOVA</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
