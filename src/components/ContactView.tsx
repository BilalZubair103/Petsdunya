import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Clock, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContactViewProps {
  onSuccess: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all form inputs.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        onSuccess(data.message || 'Form transmitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Failed to reach backend server. Please verify connections.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-view" className="space-y-16 animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Upper text banner */}
      <section className="text-center space-y-4">
        <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-extrabold block">Get In Touch</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
          Contact Our Veterinary Experts
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Need nutritional suggestions or help tracking your dispatch values? Submit a support form below or ring our direct line.
        </p>
      </section>

      {/* Grid: Form Left, Side Card Right */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form Left Side */}
        <div className="md:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs text-left space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base">
              Submit Request Ticket
            </h3>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-200">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-xl border border-emerald-250">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Perfect! Your message was printed successfully to our terminal consoles.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-bold text-slate-650 uppercase mb-1">FullName</label>
              <input
                type="text"
                placeholder="Muhammad Bilal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 outline-none focus:border-blue-500 focus:bg-white placeholder-slate-400 font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-650 uppercase mb-1">Email Coordinates</label>
              <input
                type="email"
                placeholder="muhammadbilal@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 outline-none focus:border-blue-500 focus:bg-white placeholder-slate-400 font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-650 uppercase mb-1">Message Description</label>
              <textarea
                rows={5}
                placeholder="Assalam-o-Alaikum! Please recommend a diet plan for my Persian kitten..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-850 outline-none focus:border-blue-500 focus:bg-white placeholder-slate-400 font-sans resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wide uppercase rounded-xl transition-all cursor-pointer shadow-sm active:scale-99 disabled:opacity-50"
            >
              {loading ? 'Transmitting Data...' : 'Send Message To Server'}
            </button>
          </form>
        </div>

        {/* Corporate Help Card Right Side */}
        <div className="md:col-span-5 bg-gradient-to-tr from-blue-900 via-blue-950 to-slate-900 border border-blue-950 text-white p-6 sm:p-8 rounded-3xl text-left space-y-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest font-extrabold block">Location Hub</span>
            <h3 className="font-display font-extrabold text-lg">Pakistan Operations Hub</h3>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-200">Karachi Head Office Address</h4>
                <p className="text-blue-100/70 leading-relaxed mt-0.5">
                  Main DHA Phase 6, Adjacent K-Electric Office, Karachi, Pakistan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PhoneCall className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-200">Phone Support Line</h4>
                <a href="tel:03172287931" className="text-yellow-400 hover:underline inline-block mt-0.5 font-bold font-mono">
                  0317-2287931
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-200">Corporate Email Address</h4>
                <p className="text-blue-100/75 mt-0.5">
                  info@petsdunyacatfood.pk
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-blue-800/60 pt-4">
              <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-200">Operating Warehouse Hours</h4>
                <p className="text-blue-100/75 mt-0.5">
                  Mon - Sun: 11:30 AM to 11:00 PM (Karachi Local Time)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-blue-100/80 leading-normal">
            <span className="font-bold text-white block mb-1">Instant Direct Callback</span>
            Our dispatch agents handle WhatsApp orders and form requests concurrently. Expect a callback within 15 minutes during operating hours.
          </div>
        </div>

      </section>

    </div>
  );
};
