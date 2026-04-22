import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { submitContactForm } from '../services/api';

const contactInfo = [
  { icon: Mail,    label: 'Email Us',      value: 'techprix68@gmail.com', href: 'mailto:techprix68@gmail.com' },
  { icon: Phone,   label: 'WhatsApp',      value: '+92 325 6344517',           href: 'https://wa.me/923256344517'          },
  { icon: MapPin,  label: 'Studio',        value: 'Room No 40 Zubair Hall Uet Lahore',             href: '#'                                   },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]     = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <section id="contact" className="py-28 bg-bg-secondary relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute -top-40 -right-40  w-150 h-150 rounded-full bg-indigo-100/50 dark:bg-indigo-900/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-sky-100/40 dark:bg-sky-900/10   blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-widest uppercase text-xs mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl md:text-5xl font-black font-display text-text-main mb-5"
          >
            Ready to{' '}
            <span className="gradient-text">Launch?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-text-muted max-w-2xl mx-auto text-lg"
          >
            Tell us about your project and we'll respond within 24 hours with a
            free strategy call and proposal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-bg-main rounded-2xl border border-border-light shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:border-indigo-200 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">{c.label}</p>
                    <p className="text-text-main font-semibold text-sm">{c.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Anti-gravity floating visual */}
            <div className="mt-4 p-6 bg-linear-to-br from-indigo-500 to-violet-500 rounded-3xl text-white shadow-[0_16px_48px_rgba(99,102,241,0.35)] relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
              <p className="font-black text-lg mb-2 relative z-10">Free Strategy Call</p>
              <p className="text-white/75 text-sm leading-relaxed relative z-10">
                Book a 30-minute session with our team. No commitment — just great advice.
              </p>
              <a
                href="mailto:techprix68@gmail.com?subject=Strategy Call Request"
                className="inline-block mt-4 px-5 py-2.5 bg-white text-primary font-bold rounded-full text-sm hover:bg-indigo-50 transition-colors relative z-10"
              >
                Book Free Call →
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-bg-main rounded-3xl p-8 md:p-10 border border-border-light shadow-[0_8px_48px_rgba(0,0,0,0.06)]">

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-text-main mb-2">Message Sent! 🚀</h3>
                  <p className="text-text-muted">
                    We'll review your project and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        placeholder="Jane "
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-main text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        placeholder="jane@company.com"
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-main text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="0300 5550002"
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-main text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                      />
                    </div>
                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={onChange}
                        className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select a service…</option>
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>Digital Marketing</option>
                        <option>Brand & Design</option>
                        <option>SEO Optimization</option>
                        <option>3D Web Experience</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wide">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project, timeline, and budget…"
                      className="w-full bg-bg-secondary border border-border-light rounded-xl px-4 py-3 text-text-main text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                      {errMsg}
                    </div>
                  )}

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="text-center text-text-light text-xs">
                    We respond within 24 hours · No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
