import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sections = [
    {
      title: '1. Introduction',
      content: `TechPrix ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, and interact with us.

Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Services. By accessing and using TechPrix, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.`
    },
    {
      title: '2. Information We Collect',
      content: `We may collect information about you in a variety of ways. The information we may collect on the Site includes:

• Personal Data: Name, email address, phone number, company name, job title, and other contact information you voluntarily provide when contacting us or filling out forms.

• Device Information: Device type, operating system, browser type, IP address, and unique device identifiers.

• Usage Data: Pages visited, time spent on pages, links clicked, referral sources, and other usage patterns through cookies and analytics tools.

• Project Information: Details about your business needs, project specifications, and requirements shared during consultations.

• Communication Records: Records of emails, messages, and communications exchanged with our team.`
    },
    {
      title: '3. How We Use Your Information',
      content: `TechPrix uses the information we collect in the following ways:

• Service Delivery: To provide, maintain, and improve our services and respond to your inquiries.

• Communication: To send you service updates, promotional emails, newsletters, and respond to your messages.

• Analytics: To understand how users interact with our website and improve user experience.

• Legal Compliance: To comply with legal obligations, enforce our agreements, and protect our rights.

• Marketing: To send targeted marketing communications (only with your consent).

• Customer Support: To provide technical support and resolve issues.

• Personalization: To customize your experience on our website based on your preferences.`
    },
    {
      title: '4. Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:

• Service Providers: With vendors and contractors who assist us in operating our website and conducting our business, under confidentiality obligations.

• Legal Requirements: When required by law or when we believe in good faith that disclosure is necessary to comply with legal obligations or protect our rights.

• Business Transfers: In connection with any merger, acquisition, asset sale, bankruptcy, or other business transaction.

• Analytics Partners: With Google Analytics and similar services to track website usage.

• Your Consent: With your explicit permission for other purposes not listed above.`
    },
    {
      title: '5. Cookies and Tracking Technologies',
      content: `We use cookies, web beacons, pixels, and similar tracking technologies to:

• Remember your preferences and settings
• Understand how you use our website
• Improve website functionality and user experience
• Track analytics and website performance
• Enable certain features of our services

You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website. We do not track users across different websites for advertising purposes.`
    },
    {
      title: '6. Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• SSL encryption for data in transit
• Secure password protocols
• Limited access to personal data
• Regular security audits and updates
• Employee training on data protection

However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`
    },
    {
      title: '7. Your Privacy Rights',
      content: `Depending on your location, you may have the following rights:

• Right to Access: You may request access to your personal information.

• Right to Correction: You may request correction of inaccurate data.

• Right to Deletion: You may request deletion of your personal information (subject to certain exceptions).

• Right to Opt-Out: You may opt-out of marketing communications and certain data processing activities.

• Right to Data Portability: You may request a copy of your data in a portable format.

To exercise these rights, please contact us using the information provided at the end of this policy.`
    },
    {
      title: '8. Third-Party Links',
      content: `Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites before providing them with your personal information.`
    },
    {
      title: '9. Children\'s Privacy',
      content: `Our Services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected information from a child under 18, we will take steps to delete such information promptly.`
    },
    {
      title: '10. International Data Transfers',
      content: `Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using our Services, you consent to the transfer of your information to countries outside your country of residence.`
    },
    {
      title: '11. Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Last Updated" date of this policy and, if required, sending you a notification. Your continued use of our Services constitutes your acceptance of the updated Privacy Policy.`
    },
    {
      title: '12. Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:

TechPrix Digital Agency
Email: privacy@techprix.com
Phone: [Your Phone Number]
Address: [Your Address]

We will respond to your inquiry within 30 days of receipt.`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-main">
      {/* Header */}
      <div className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display mb-4 gradient-text">
              Privacy Policy
            </h1>
            <p className="text-lg text-text-muted max-w-2xl">
              Your privacy is important to us. Learn how TechPrix collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-text-light mt-4">Last Updated: April 2026</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass rounded-2xl p-8 border border-border-light hover:shadow-card-hover transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-primary mb-4 font-display">
                {section.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 glass rounded-2xl p-12 border border-border-light text-center"
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text">Have Questions?</h3>
          <p className="text-text-muted mb-6 max-w-2xl mx-auto">
            If you have any concerns or questions about our Privacy Policy, please don't hesitate to reach out to us.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-glow transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
