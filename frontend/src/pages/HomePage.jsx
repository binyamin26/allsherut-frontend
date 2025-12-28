import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Users, 
  Clock, 
  Shield, 
  Heart,
  Baby,
  Scissors,
  PawPrint,
  BookOpen,
  Home,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Award,
  Smile,
  Sparkles,
  TreePine,
  Shirt,
  Building2,
  Zap,
  Wrench,
   Wind,
   Flame,
   Layers, 
   Hammer,
   PartyPopper,
   ChefHat,
   Paintbrush ,
   Droplets,
   HardHat,
   Box,
   Square,
   Key,
   ChevronLeft, ChevronRight                   
} from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ServiceSearchBar from '../components/common/ServiceSearchBar';


const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
 

  const location = useLocation();

useEffect(() => {
  if (location.hash === '#services') {
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}, [location]);


  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const services = [
    {
      id: 'babysitting',
      name: t('services.babysitting'),
      image: 'public/images/babysite.png',
      description: t('services.babysitting.desc'),
      color: 'from-pink-500 to-rose-600',
      href: '/services/babysitting'
    },
    {
      id: 'cleaning',
      name: t('services.cleaning'),
      image: 'public/images/nikayon.jpg',
      description: t('services.cleaning.desc'),
      color: 'from-cyan-500 to-blue-600',
      href: '/services/cleaning'
    },
    {
      id: 'gardening',
      name: t('services.gardening'),
      image: 'public/images/jardinage.jpg',
      description: t('services.gardening.desc'),
      color: 'from-green-500 to-emerald-600',
      href: '/services/gardening'
    },
    {
      id: 'petcare',
      name: t('services.petcare'),
     image: 'public/images/chien.jpg',
      description: t('services.petcare.desc'),
      color: 'from-orange-500 to-amber-600',
      href: '/services/petcare'
    },
    {
      id: 'tutoring',
      name: t('services.tutoring'),
     image: 'public/images/tutoring.png',
      description: t('services.tutoring.desc'),
      color: 'from-blue-500 to-indigo-600',
      href: '/services/tutoring'
    },
    {
      id: 'eldercare',
      name: t('services.eldercare'),
     image: 'public/images/eldercare.png',
      description: t('services.eldercare.desc'),
      color: 'from-purple-500 to-violet-600',
      href: '/services/eldercare'
    },
    {
      id: 'laundry',
      name: t('services.laundry'),
     image: 'public/images/kvissa.jpg',
      description: t('services.laundry.desc'),
      color: 'from-blue-400 to-cyan-600',
      href: '/services/laundry'
    },
    {
      id: 'property_management',
      name: t('services.property_management'),
       image: 'public/images/nihoul dirot.jpg',
      description: t('services.property_management.desc'),
      color: 'from-indigo-500 to-purple-600',
      href: '/services/property-management'
    },
{
      id: 'electrician',
      name: t('services.electrician'),
      image: 'public/images/electrician.jpg',
      description: t('services.electrician.desc'),
      color: 'from-yellow-500 to-orange-600',
      href: '/services/electrician'
    },
    {
      id: 'plumbing',
      name: t('services.plumbing'),
      image: 'public/images/plombier.jpg',
      description: t('services.plumbing.desc'),
      color: 'from-teal-500 to-cyan-600',
      href: '/services/plumbing'
    },
    {
      id: 'air_conditioning',
      name: t('services.air_conditioning'),
      image: 'public/images/clim.png',
      description: t('services.air_conditioning.desc'),
      color: 'from-sky-500 to-blue-600',
      href: '/services/air-conditioning'
    },
    {
      id: 'gas_technician',
      name: t('services.gas_technician'),
      image: 'public/images/gaz.jpg',
      description: t('services.gas_technician.desc'),
      color: 'from-red-500 to-orange-600',
      href: '/services/gas-technician'
    },
    {
      id: 'drywall',
      name: t('services.drywall'),
      image: 'public/images/guevess.png',
      description: t('services.drywall.desc'),
      color: 'from-gray-500 to-slate-600',
      href: '/services/drywall'
    },
    {
      id: 'carpentry',
      name: t('services.carpentry'),
      image: 'public/images/menuisier.png',
      description: t('services.carpentry.desc'),
      color: 'from-amber-600 to-brown-700',
      href: '/services/carpentry'
    },
    {
      id: 'home_organization',
      name: t('services.home_organization'),
      image: 'public/images/rangement.jpg',
      description: t('services.home_organization.desc'),
      color: 'from-violet-500 to-fuchsia-600',
      href: '/services/home-organization'
    },
    {
      id: 'event_entertainment',
      name: t('services.event_entertainment'),
      image: 'public/images/fetes1.jpg',
      description: t('services.event_entertainment.desc'),
      color: 'from-pink-500 to-purple-600',
      href: '/services/event-entertainment'
    },
    {
      id: 'private_chef',
      name: t('services.private_chef'),
      image: 'public/images/pizza.png',
      description: t('services.private_chef.desc'),
      color: 'from-amber-500 to-yellow-600',
      href: '/services/private-chef'
    },
    {
      id: 'painting',
      name: t('services.painting'),
      image: 'public/images/peinture.jpg',
      description: t('services.painting.desc'),
      color: 'from-violet-500 to-purple-600',
      href: '/services/painting'
    },
    {
      id: 'waterproofing',
      name: t('services.waterproofing'),
      image: 'public/images/itoum.jpg',
      description: t('services.waterproofing.desc'),
      color: 'from-blue-600 to-cyan-700',
      href: '/services/waterproofing'
    },
    {
      id: 'contractor',
      name: t('services.contractor'),
      image: 'public/images/kablan.png',
      description: t('services.contractor.desc'),
      color: 'from-orange-600 to-amber-700',
      href: '/services/contractor'
    },
    {
      id: 'aluminum',
      name: t('services.aluminum'),
      image: 'public/images/aluminium.png',
      description: t('services.aluminum.desc'),
      color: 'from-slate-400 to-gray-600',
      href: '/services/aluminum'
    },
    {
      id: 'glass_works',
      name: t('services.glass_works'),
      image: 'public/images/verre.png',
      description: t('services.glass_works.desc'),
      color: 'from-slate-400 to-gray-500',
      href: '/services/glass-works'
    },
    {
      id: 'locksmith',
      name: t('services.locksmith'),
      image: 'public/images/serrure.png',
      description: t('services.locksmith.desc'),
      color: 'from-amber-500 to-yellow-600',
      href: '/services/locksmith'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
          <div className="hero-text">
  <h1 className="hero-title animate-fade-in-down">
    HomeSherut – <span className="gradient-text">{t('homepage.hero.tagline')}</span>
  </h1>
  <p className="hero-description animate-fade-in-up delay-200" style={{ marginBottom: '0.5rem' }}>
    {t('homepage.hero.description1')}
  </p>
  {/* Search Bar */}
  <div className="animate-fade-in-up delay-300" style={{ marginBottom: '1rem' }}>
    <ServiceSearchBar style={{ maxWidth: '350px', margin: 0 }} />
  </div>
  <p className="hero-description animate-fade-in-up delay-400" style={{ marginBottom: '0.5rem' }}>
    {t('homepage.hero.description2')}
  </p>
  {!isAuthenticated && (
    <button 
      className="btn btn-primary hero-register-btn text-custom animate-fade-in-up delay-500"
      onClick={() => openAuthModal('register')}
    >
      {t('homepage.cta.register')}
    </button>
  )}
</div>
            
          <div className="hero-visual animate-fade-in-left delay-400">
  <div className="services-logo">
    <img 
      src="/images/logo-homesherut.png" 
      alt="HomeSherut Logo" 
      style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
    />
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Section Clients */}
      <section className="section">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">
            {t('homepage.clients.title')}
          </h2>
          <p className="hero-description text-center mb-12 animate-fade-in-up delay-100">
            {t('homepage.clients.subtitle')}
          </p>
          
          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon">
                <Star size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.verified.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.verified.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon">
                <Search size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.centralized.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.centralized.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-300">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.personal.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.personal.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-400">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.transparency.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.transparency.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

{/* Services Section */}
<section id="services" className="services-section">
  <div className="container">
    <div className="section-header">
      <h2 className="section-title animate-fade-in-down">{t('homepage.services.title')}</h2>
      <p className="hero-description text-center mb-16 animate-fade-in-up delay-100">
        {t('homepage.services.subtitle')}
      </p>
    </div>
  </div>

  <div className="services-carousel-container">
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }}
    >
      {services.map((service) => (

       <SwiperSlide key={service.id}>
  <Link to={service.href} className="service-card-image">
    {service.image ? (
      <img 
        src={service.image} 
        alt={service.name} 
        className="service-image"
      />
    ) : (
      <div className={`service-icon-fallback bg-gradient-to-br ${service.color}`}>
        <service.icon size={48} color="white" />
      </div>
    )}
    <div className="service-name-overlay">
      <h3>{service.name}</h3>
    </div>
  </Link>
</SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

      {/* Section Prestataires */}
     <section className="section" style={{background: 'linear-gradient(135deg, var(--primary-25) 0%, var(--accent-25) 100%)'}}>
        <div className="container">
          <h2 className="section-title animate-fade-in-up">
            {t('homepage.providers.title')}
          </h2>
          <p className="hero-description text-center mb-12 animate-fade-in-up delay-100">
            {t('homepage.providers.subtitle')}
          </p>
          
          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.profile.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.profile.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.growth.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.growth.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-300">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.reputation.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.reputation.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-400">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.management.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.management.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section" style={{marginTop: 0, marginBottom: 0, paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)'}}>
        <div className="container">
          <div className="cta-content text-center">
            <h2 className="hero-title animate-fade-in-down">{t('homepage.cta.title')}</h2>
            <p className="hero-description animate-fade-in-up delay-200">
              {t('homepage.cta.description')}
            </p>
            
            {/* Boutons visibles UNIQUEMENT si NON connecté */}
            {!isAuthenticated && (
              <div className="cta-buttons animate-fade-in-up delay-300">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={() => openAuthModal('register')}
                >
                  {t('homepage.cta.register')}
                </button>
                <button 
                  className="btn btn-primary btn-large"
                  onClick={() => openAuthModal('login')}
                >
                  {t('homepage.cta.login')}
                </button>
              </div>
            )}
            
            <div className="cta-features animate-fade-in-up delay-400">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.free')}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.verified')}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.support')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default HomePage;