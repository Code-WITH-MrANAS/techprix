import HeroSection        from '../components/HeroSection';
import ServicesSection    from '../components/ServicesSection';
import ProjectsSection    from '../components/ProjectsSection';
import AboutSection       from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ReviewForm         from '../components/ReviewForm';
import ContactSection     from '../components/ContactSection';
import WhatsAppButton     from '../components/WhatsAppButton';

const Home = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <AboutSection />
    <TestimonialsSection />
    <ContactSection />
    <ReviewForm />
    <WhatsAppButton />
  </>
);

export default Home;
