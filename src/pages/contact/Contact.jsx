import React, { useState, useEffect } from 'react';
import website_name from '@/src/config/website.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlay, faClosedCaptioning, faMicrophone, faVideo, faRocket, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from '@/src/components/Loader/Loader';

function AboutUs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading untuk smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader type="contact" />;

  const faqs = [
    {
      question: "What is NeoNime?",
      answer: "NeoNime is a free anime streaming platform that provides access to thousands of anime titles with both subtitles and dubs. We offer high-quality streaming with multiple server options to ensure the best viewing experience."
    },
    {
      question: "Is NeoNime really free?",
      answer: "Yes! NeoNime is completely free to use. You can watch unlimited anime without any subscription fees or hidden charges. We believe anime should be accessible to everyone."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required! You can start watching anime immediately without any registration. Simply browse our catalog and click play."
    },
    {
      question: "What video quality do you offer?",
      answer: "We offer multiple quality options including HD (720p, 1080p) and SD. The available quality depends on the source and your selected server."
    },
    {
      question: "Are there both subbed and dubbed anime?",
      answer: "Yes! We provide both subtitled (sub) and dubbed (dub) versions of anime when available. You can filter by sub or dub in our browse sections."
    },
    {
      question: "How often is new content added?",
      answer: "We update our library regularly with the latest anime episodes and series. New episodes are typically added shortly after they air in Japan."
    },
    {
      question: "What if a video doesn't play?",
      answer: "If a video doesn't play, try switching to a different server using the server selector below the player. We provide multiple streaming servers for reliability."
    },
    {
      question: "Can I request an anime?",
      answer: "While we don't have a formal request system, we continuously expand our library based on popularity and availability. Check back regularly for new additions."
    },
    {
      question: "Is the content legal?",
      answer: "NeoNime does not host any files. We aggregate streams from third-party services. All legal issues should be directed to the file hosts and providers."
    },
    {
      question: "How can I report an issue?",
      answer: "You can reach out to us through our social media channels (Telegram, Discord, GitHub) listed below. We appreciate your feedback and bug reports."
    }
  ];

  const features = [
    {
      icon: faPlay,
      title: "Instant Streaming",
      description: "No registration required. Start watching immediately with just one click."
    },
    {
      icon: faVideo,
      title: "HD Quality",
      description: "Enjoy anime in high definition with multiple quality options available."
    },
    {
      icon: faClosedCaptioning,
      title: "Subtitles",
      description: "Watch with accurate English subtitles for the authentic experience."
    },
    {
      icon: faMicrophone,
      title: "Dubbed Content",
      description: "Prefer dubs? We offer English dubbed versions of popular anime."
    },
    {
      icon: faRocket,
      title: "Fast Updates",
      description: "Get the latest episodes shortly after they air in Japan."
    },
    {
      icon: faShieldAlt,
      title: "Multiple Servers",
      description: "Reliable streaming with backup servers for uninterrupted viewing."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-12 px-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414] rounded-2xl p-8 md:p-12 border border-white/5 shadow-2xl mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-12 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">About {website_name}</h1>
        </div>
        <p className="text-lg text-white/70 leading-relaxed mb-6">
          Welcome to {website_name}, your ultimate destination for streaming anime online. We're passionate about bringing the best anime content to fans worldwide, completely free of charge.
        </p>
        <p className="text-base text-white/60 leading-relaxed">
          Our platform offers an extensive library of anime series and movies, from classic favorites to the latest seasonal releases. With high-quality streams, multiple server options, and both subbed and dubbed content, we strive to provide the best viewing experience for anime enthusiasts everywhere.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
          <h2 className="text-3xl font-bold text-white">Why Choose {website_name}?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl p-6 border border-white/5 hover:border-[#e91e63]/30 transition-all duration-300 group hover:shadow-lg hover:shadow-[#e91e63]/10"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#e91e63]/20 to-[#00bcd4]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={feature.icon} className="text-xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#141414] to-[#0f0f0f] rounded-xl border border-white/5 overflow-hidden hover:border-[#e91e63]/30 transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-base font-semibold text-white pr-4">{faq.question}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-[#e91e63] transition-transform duration-300 flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-white/70 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414] rounded-2xl p-8 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-8 bg-gradient-to-b from-[#e91e63] to-[#00bcd4] rounded-full"></span>
          <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
        </div>
        <p className="text-white/70 mb-6 leading-relaxed">
          Have questions, feedback, or want to report an issue? Connect with us through any of our community channels:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://whatsapp.com/channel/0029VajVvKSEquqWYa8Ov42C"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <span className="text-2xl">💬</span>
            <span className="text-white font-medium">Join our WhatsApp Channel</span>
          </a>
          <a
            href="https://lynk.id/mhafizh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <span className="text-2xl">👤</span>
            <span className="text-white font-medium">My Bio</span>
          </a>
          <a
            href="https://github.com/mhafizhdsy-netizen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <span className="text-2xl">🐙</span>
            <span className="text-white font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 