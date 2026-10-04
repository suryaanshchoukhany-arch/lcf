import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero3DPremium from '@/components/Hero3DPremium';
import Footer from '@/components/Footer';
import { Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormStatus('error');
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero3DPremium />

      {/* Navigation */}
      <Navigation />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-5xl font-bold mb-6 text-glow">What is LCF?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Le Concours De La Francophonie du Mayo was born 11 years ago, with the idea of making the French language more accessible, fun and interactive. Our aim is to teach the French language outside the traditional classroom and to introduce the culture of France and Francophone countries to students all around the world.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We have had the pleasure of having distinguished personalities in the French world grace many of our editions. We have also had the pleasure of having schools from around the world take part in our competition.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 glow-blue hover-lift text-center">
                <div className="text-5xl font-playfair font-black text-electric-blue mb-2">12</div>
                <p className="text-gray-300 font-light">Editions Hosted</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 glow-blue hover-lift text-center">
                <div className="text-5xl font-playfair font-black text-electric-blue mb-2">10+</div>
                <p className="text-gray-300 font-light">Events</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 glow-blue hover-lift text-center md:col-span-2">
                <div className="text-5xl font-playfair font-black text-electric-blue mb-2">2250+</div>
                <p className="text-gray-300 font-light">Participants Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section className="py-20 bg-black">
        <div className="container">
          <h2 className="text-5xl font-bold mb-12 text-glow text-center animate-slide-up">
            Competitions & Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Spell Bee', desc: 'Test your spelling prowess' },
              { title: 'Poetry Recitation', desc: 'Recite beautiful French poetry' },
              { title: 'Solo Singing', desc: 'Showcase your vocal talents' },
              { title: 'Debate', desc: 'Engage in intellectual discourse' },
              { title: 'Essay Writing', desc: 'Express yourself through writing' },
              { title: 'Drama', desc: 'Perform on stage' },
            ].map((comp, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-lg border border-blue-500/20 glow-blue hover-lift"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <h3 className="text-xl font-bold text-electric-blue mb-2">{comp.title}</h3>
                <p className="text-gray-300">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* This Edition in Focus */}
      <section className="py-20 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="container">
          <h2 className="text-5xl font-bold mb-12 text-glow text-center animate-slide-up">
            This Edition in Focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 glow-blue hover-lift">
              <h3 className="text-2xl font-bold text-electric-blue mb-4">Workshops & Seminars</h3>
              <p className="text-gray-300 leading-relaxed">
                Engage with expert speakers and participate in interactive workshops designed to enhance your French language skills and cultural understanding.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20 glow-blue hover-lift">
              <h3 className="text-2xl font-bold text-electric-blue mb-4">Francophonie Food Festival</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover the culinary traditions of French-speaking countries through an immersive food experience featuring authentic dishes and cultural presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container">
          <h2 className="text-5xl font-bold mb-12 text-glow text-center animate-slide-up">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-8 rounded-lg border border-blue-500/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                {formStatus === 'success' && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-start space-x-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-green-300 font-semibold">Message sent successfully!</p>
                      <p className="text-green-200 text-sm">We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Your Full Name"
                    className={`w-full px-4 py-2 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-smooth ${
                      errors.name ? 'border-red-500/50' : 'border-blue-500/30 focus:border-electric-blue'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="Your Email"
                    className={`w-full px-4 py-2 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-smooth ${
                      errors.email ? 'border-red-500/50' : 'border-blue-500/30 focus:border-electric-blue'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="Your Phone Number"
                    className={`w-full px-4 py-2 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-smooth ${
                      errors.phone ? 'border-red-500/50' : 'border-blue-500/30 focus:border-electric-blue'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Your Message"
                    rows={4}
                    className={`w-full px-4 py-2 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-smooth resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-blue-500/30 focus:border-electric-blue'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full btn-premium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-lg border border-blue-500/20 glow-blue hover-lift">
                <h3 className="text-xl font-bold text-electric-blue mb-4 flex items-center space-x-2">
                  <Mail size={20} />
                  <span>Email</span>
                </h3>
                <a href="mailto:help@lcfdumayo.com" className="text-gray-300 hover:text-electric-blue transition-smooth">
                  help@lcfdumayo.com
                </a>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-lg border border-blue-500/20 glow-blue hover-lift">
                <h3 className="text-xl font-bold text-electric-blue mb-4 flex items-center space-x-2">
                  <Phone size={20} />
                  <span>Phone</span>
                </h3>
                <p className="text-gray-300 mb-2">Mr. Kunal Kumar (HOD - French)</p>
                <p className="text-gray-300">+91 98281 83415</p>
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-lg border border-blue-500/20 glow-blue hover-lift">
                <h3 className="text-xl font-bold text-electric-blue mb-4">Register Your School</h3>
                <a
                  href="https://forms.gle/iVtMpHNNsRXPmx348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-premium"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

