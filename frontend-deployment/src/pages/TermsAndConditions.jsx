import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using the TechPrix website, services, and products (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Services. TechPrix reserves the right to modify these terms at any time, and your continued use of our Services constitutes acceptance of the updated terms.`
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on TechPrix's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to decompile or reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server
• Violate any applicable laws or regulations
• Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services`
    },
    {
      title: '3. Service Descriptions',
      content: `TechPrix offers a variety of digital services including:

• Web Development and Design
• Mobile Application Development
• Digital Marketing and SEO
• Brand Identity and Design
• 3D Web Experiences
• UI/UX Consulting

Service descriptions, pricing, and availability are subject to change without notice. We reserve the right to discontinue or modify any service at any time. All services are provided on an "as-is" basis.`
    },
    {
      title: '4. Pricing and Payment',
      content: `All prices are listed in USD unless otherwise specified. Prices are subject to change without notice. Payment terms are agreed upon separately through proposals and contracts. We accept major credit cards and may offer additional payment methods.

• All payments must be completed before service delivery begins
• Late payment may result in suspension of services
• Refunds are subject to the terms outlined in your service agreement
• Taxes and applicable fees are the responsibility of the client`
    },
    {
      title: '5. Intellectual Property Rights',
      content: `All materials on the TechPrix website, including text, graphics, logos, images, and software, are the property of TechPrix or its content suppliers and are protected by international copyright laws.

• Client Materials: You retain ownership of any materials you provide to us
• Work Product: Upon full payment, ownership of the final deliverables transfers to you, except for pre-existing tools and processes we use
• Third-Party Components: Third-party libraries, frameworks, and components retain their original licenses
• Our Brand: You may not use TechPrix's name, logo, or brand without written permission`
    },
    {
      title: '6. User Responsibilities',
      content: `As a user of our Services, you agree to:

• Provide accurate and complete information
• Maintain the confidentiality of any login credentials
• Be responsible for all activity on your account
• Notify us immediately of unauthorized use
• Comply with all applicable laws and regulations
• Not transmit viruses, malware, or harmful code
• Not engage in harassment, abuse, or threats
• Respect the intellectual property rights of others`
    },
    {
      title: '7. Limitation of Liability',
      content: `To the fullest extent permitted by law, TechPrix shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business, arising from your use of or inability to use the Services, even if TechPrix has been advised of the possibility of such damages.

Our total liability to you for any claim arising from these Terms shall not exceed the amount paid by you for the Services in the 12 months preceding the claim.`
    },
    {
      title: '8. Disclaimers',
      content: `The Services are provided on an "AS-IS" and "AS-AVAILABLE" basis. TechPrix makes no warranties, expressed or implied, regarding:

• The accuracy or completeness of information
• The functionality or reliability of the Services
• The absence of viruses or harmful code
• Uninterrupted service availability

Your use of the Services is at your own risk. We recommend that you maintain backups of your data and perform your own security assessments.`
    },
    {
      title: '9. Indemnification',
      content: `You agree to indemnify and hold harmless TechPrix, its officers, directors, employees, and agents from any claims, damages, losses, and expenses, including reasonable legal fees, arising from or related to:

• Your use of the Services
• Your violation of these Terms and Conditions
• Your infringement of any third-party rights
• Content you provide or upload
• Your violation of applicable laws or regulations`
    },
    {
      title: '10. Project Terms',
      content: `For project-based services:

• Scope of Work: Services are limited to the agreed-upon scope defined in the project proposal
• Timeline: Estimated timelines are subject to change based on project requirements and client availability
• Client Cooperation: Timely provision of feedback, materials, and decisions is essential
• Revisions: The number of revision rounds is specified in the service agreement
• Additional Work: Changes outside the agreed scope may result in additional fees`
    },
    {
      title: '11. Confidentiality',
      content: `Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the engagement. This includes:

• Business strategies and plans
• Technical specifications and code
• Client data and information
• Pricing and financial information

This obligation continues for 2 years after the engagement ends, except for information that becomes publicly available through no fault of the receiving party.`
    },
    {
      title: '12. Termination',
      content: `TechPrix reserves the right to:

• Suspend or terminate access to Services at any time for violation of these Terms
• Terminate services due to non-payment
• Discontinue Services with written notice

Upon termination, you remain liable for any outstanding payments. We will provide reasonable assistance in transitioning your data.`
    },
    {
      title: '13. Dispute Resolution',
      content: `Any disputes arising from these Terms or our Services shall be governed by and construed in accordance with applicable law. You agree to:

• First attempt to resolve disputes through informal communication
• Submit unresolved disputes to mediation before pursuing legal action
• Accept binding arbitration as the final dispute resolution mechanism
• Waive the right to a jury trial`
    },
    {
      title: '14. Links to Third-Party Sites',
      content: `Our website may contain links to third-party websites and services. We are not responsible for:

• The content or accuracy of third-party websites
• The privacy practices of external sites
• Any transactions or interactions with third parties

Your use of third-party websites is governed by their terms and conditions, not ours.`
    },
    {
      title: '15. Modifications to Services',
      content: `TechPrix reserves the right to:

• Modify or discontinue Services with reasonable notice
• Update website features and functionality
• Change pricing with 30 days' notice
• Adjust service offerings based on business needs

Where practical, we will notify you of significant changes.`
    },
    {
      title: '16. Entire Agreement',
      content: `These Terms and Conditions, along with any service-specific agreements and our Privacy Policy, constitute the entire agreement between you and TechPrix regarding your use of the Services. If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full effect.`
    },
    {
      title: '17. Contact Information',
      content: `For questions or concerns regarding these Terms and Conditions, please contact us at:

TechPrix Digital Agency
Email: techprix68@gmail.com
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
              Terms & Conditions
            </h1>
            <p className="text-lg text-text-muted max-w-2xl">
              Please read these terms and conditions carefully before using TechPrix services. Your use of our services signifies your agreement to these terms.
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
          <h3 className="text-2xl font-bold mb-4 gradient-text">Questions About Our Terms?</h3>
          <p className="text-text-muted mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about these terms and conditions, please contact our legal team.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-glow transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
