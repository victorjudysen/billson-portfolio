// script.js — Animations and UI interactions for Billison portfolio
// Uses GSAP + ScrollTrigger (loaded via CDN in HTML)

/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  // Safety: ensure gsap and ScrollTrigger exist
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // NAV: sticky background toggle
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const nav = document.querySelector('.nav');

  function checkNav() {
    const threshold = window.innerHeight * 0.02;
    if (window.scrollY > threshold) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  checkNav();
  window.addEventListener('scroll', checkNav, {passive: true});

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileSheet = document.querySelector('.mobile-nav-sheet');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  toggle.addEventListener('click', () => {
    mobileSheet.classList.toggle('open');
    toggle.classList.toggle('open');
    document.body.style.overflow = mobileSheet.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileSheet.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Hero text reveal
  const heroTl = gsap.timeline();
  heroTl.from('.intro-line', {y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'})
        .from('.tagline', {y: 28, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.45')
        .from('.lead', {y: 18, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.45')
        .from('.cta', {scale: 0.95, opacity: 0, duration: 0.6, ease: 'back.out(1.4)'}, '-=0.35');

  // Hero background subtle parallax
  gsap.to('.hero-bg', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });

  // Staggered reveal for sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    // Exclude portfolio items and testimonial cards from generic animation
    // They have their own specific animations
    const elems = section.querySelectorAll('h3, h4, p, .service-card, .contact-form, .about-right img');
    if (elems.length > 0) {
      gsap.from(elems, {
        scrollTrigger: {trigger: section, start: 'top 80%', once: true},
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }
  });

  // Portfolio items specific animation
  gsap.utils.toArray('.port-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {trigger: item, start: 'top 85%', once: true},
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: index * 0.05,
      ease: 'power3.out'
    });
  });

  // Testimonial cards specific animation
  gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {trigger: card, start: 'top 85%', once: true},
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });

  // Portfolio Items
  const portfolioItems = document.querySelectorAll('.port-item');

  // Portfolio hover subtle tilt using mousemove (lightweight)
  portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(item, {rotationY: x * 6, rotationX: y * -6, transformPerspective:600, transformOrigin:'center', ease:'power1.out', duration:0.6});
    });
    item.addEventListener('mouseleave', () => gsap.to(item, {rotationY:0, rotationX:0, duration:0.6, ease:'power2.out'}));
  });

  // Portfolio Modal System
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = projectModal.querySelector('.modal-backdrop');
  const modalClose = projectModal.querySelector('.modal-close');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClient = document.getElementById('modalClient');
  const modalYear = document.getElementById('modalYear');
  const modalServices = document.getElementById('modalServices');

  // Project data
  const projectData = {
    'Brand Identity System': {
      category: 'Graphics Design',
      description: 'A comprehensive visual identity system that captures the essence of modern branding. This project involved creating a complete brand ecosystem including logo design, color palettes, typography systems, and brand guidelines to ensure consistent application across all touchpoints.',
      client: 'Tech Startup',
      year: '2024',
      services: 'Brand Strategy, Logo Design, Visual Identity'
    },
    'Logo Design': {
      category: 'Graphics Design',
      description: 'Crafted a distinctive and memorable logo that perfectly represents the brand\'s values and mission. The design process involved extensive research, conceptualization, and refinement to create a timeless mark that resonates with the target audience.',
      client: 'Confidential',
      year: '2024',
      services: 'Logo Design, Brand Mark, Icon Design'
    },
    'Packaging Design': {
      category: 'Graphics Design',
      description: 'Eye-catching product packaging that stands out on shelves and creates a lasting impression. This project balanced aesthetic appeal with functional requirements, incorporating sustainable materials and innovative structural design.',
      client: 'Consumer Brand',
      year: '2023',
      services: 'Packaging Design, Structural Design, Print Production'
    },
    'Corporate Branding': {
      category: 'Graphics Design',
      description: 'Professional corporate identity that elevates the business presence and builds trust with stakeholders. The comprehensive branding solution includes business cards, letterheads, presentations, and digital assets.',
      client: 'Financial Services',
      year: '2024',
      services: 'Corporate Identity, Stationery Design, Brand Guidelines'
    },
    'Visual Identity': {
      category: 'Graphics Design',
      description: 'A cohesive visual identity system that tells a compelling brand story across all platforms. This project involved creating a flexible design system that maintains consistency while allowing creative expression.',
      client: 'Creative Agency',
      year: '2023',
      services: 'Visual Identity, Design System, Brand Assets'
    },
    'Brand Guidelines': {
      category: 'Graphics Design',
      description: 'Comprehensive brand standards document that ensures consistent brand application across all media. The guidelines cover logo usage, color systems, typography, imagery style, and tone of voice.',
      client: 'Enterprise Client',
      year: '2024',
      services: 'Brand Guidelines, Documentation, Training'
    },
    'Rebranding Project': {
      category: 'Graphics Design',
      description: 'Complete brand transformation that repositioned the company in the market. The project involved strategic analysis, creative development, and implementation across all brand touchpoints.',
      client: 'Established Business',
      year: '2023',
      services: 'Brand Strategy, Rebranding, Implementation'
    },
    'Stationary Design': {
      category: 'Graphics Design',
      description: 'Professional business stationery including business cards, letterheads, envelopes, and more. Each piece was carefully designed to reinforce the brand identity and create a cohesive professional image.',
      client: 'Professional Services',
      year: '2024',
      services: 'Stationery Design, Print Design, Brand Collateral'
    },
    'Marketing Brochure': {
      category: 'Graphics Design',
      description: 'Engaging promotional brochure that effectively communicates the brand message and drives action. The design combines compelling visuals with persuasive copy to create a powerful marketing tool.',
      client: 'Marketing Agency',
      year: '2024',
      services: 'Brochure Design, Copywriting, Print Production'
    },
    'Corporate Brochure': {
      category: 'Graphics Design',
      description: 'Professional company profile that showcases capabilities and builds credibility. The brochure features sophisticated design, high-quality imagery, and strategic content organization.',
      client: 'Corporate Client',
      year: '2023',
      services: 'Corporate Design, Editorial Design, Print'
    },
    'Poster Campaign': {
      category: 'Graphics Design',
      description: 'Bold and impactful poster series that captures attention and communicates key messages. The campaign utilized strong visual hierarchy and compelling imagery to maximize impact.',
      client: 'Event Organizer',
      year: '2024',
      services: 'Poster Design, Campaign Creative, Large Format'
    },
    'Magazine Layout': {
      category: 'Graphics Design',
      description: 'Editorial design excellence with beautiful layouts that enhance readability and visual appeal. The project involved typographic refinement, image selection, and grid system development.',
      client: 'Publishing House',
      year: '2023',
      services: 'Editorial Design, Layout, Typography'
    },
    'Instagram Campaign': {
      category: 'Digital Marketing',
      description: 'Engaging social media content that builds community and drives engagement. The campaign included custom graphics, templates, and strategic content planning for consistent brand presence.',
      client: 'E-commerce Brand',
      year: '2024',
      services: 'Social Media Design, Content Strategy, Templates'
    },
    'Social Media Graphics': {
      category: 'Digital Marketing',
      description: 'Eye-catching posts and stories that stop the scroll and drive engagement. Created a library of templates and assets for consistent, high-quality social media presence.',
      client: 'Lifestyle Brand',
      year: '2024',
      services: 'Social Graphics, Templates, Brand Content'
    },
    'Content Strategy': {
      category: 'Digital Marketing',
      description: 'Consistent brand presence across social platforms with strategic content planning. Developed visual themes, posting schedules, and engagement strategies for maximum impact.',
      client: 'Personal Brand',
      year: '2023',
      services: 'Strategy, Content Planning, Social Management'
    },
    'Ad Campaign': {
      category: 'Digital Marketing',
      description: 'High-converting ad creatives optimized for digital platforms. The campaign utilized A/B testing, data-driven insights, and compelling visuals to maximize ROI.',
      client: 'SaaS Company',
      year: '2024',
      services: 'Ad Creative, Digital Marketing, Optimization'
    },
    'Email Templates': {
      category: 'Digital Marketing',
      description: 'Beautiful email campaigns that drive opens and clicks. Designed responsive templates that look great on all devices and align with brand guidelines.',
      client: 'Retail Business',
      year: '2024',
      services: 'Email Design, HTML Templates, Marketing'
    },
    'Product Photography': {
      category: 'Media Production',
      description: 'Professional product photography that showcases products in the best light. Utilized expert lighting, composition, and post-production to create compelling product imagery.',
      client: 'Product Brand',
      year: '2024',
      services: 'Photography, Retouching, Product Styling'
    },
    'Corporate Documentary': {
      category: 'Media Production',
      description: 'Compelling brand storytelling through documentary-style video production. This project captured the authentic story of the company, featuring interviews, behind-the-scenes footage, and cinematic visuals.',
      client: 'Corporate Client',
      year: '2024',
      services: 'Video Production, Documentary, Storytelling'
    },
    'Event Coverage': {
      category: 'Media Production',
      description: 'Professional video documentation of live events with multi-camera coverage. Captured key moments, speeches, and atmosphere to create engaging highlight reels and full-length event videos.',
      client: 'Event Company',
      year: '2024',
      services: 'Event Videography, Multi-cam Production, Editing'
    },
    'Promotional Video': {
      category: 'Media Production',
      description: 'Cinematic brand films that captivate audiences and drive action. Combined stunning visuals, compelling narrative, and strategic messaging to create memorable promotional content.',
      client: 'Startup',
      year: '2023',
      services: 'Video Production, Cinematography, Motion Graphics'
    }
  };

  // Open modal when clicking portfolio items
  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = item.querySelector('.port-info h4').textContent;
      const category = item.querySelector('.port-category').textContent;
      const description = item.querySelector('.port-desc').textContent;
      const imgSrc = item.querySelector('img').src;
      
      // Get detailed project data
      const projectDetails = projectData[title] || {
        category: category,
        description: description,
        client: 'Confidential',
        year: '2024',
        services: 'Design & Creative Services'
      };
      
      // Populate modal
      modalImage.src = imgSrc;
      modalImage.alt = title;
      modalCategory.textContent = projectDetails.category;
      modalTitle.textContent = title;
      modalDescription.textContent = projectDetails.description;
      modalClient.textContent = projectDetails.client;
      modalYear.textContent = projectDetails.year;
      modalServices.textContent = projectDetails.services;
      
      // Open modal with animation
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate modal content
      gsap.from(modalImage, {opacity: 0, scale: 1.1, duration: 0.6, ease: 'power3.out'});
      gsap.from('.modal-info > *', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    });
  });

  // Close modal
  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Portfolio Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter items with smooth animation
      portfolioItems.forEach((item, index) => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          // Show item
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            delay: index * 0.05,
            onStart: () => {
              item.classList.remove('hidden');
              item.style.position = 'relative';
            }
          });
        } else {
          // Hide item
          gsap.to(item, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              item.classList.add('hidden');
              item.style.position = 'absolute';
            }
          });
        }
      });
      
      // Animate grid reorganization
      gsap.from(portfolioGrid, {
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // Service card hover tilt (also for accessibility keyboard focus)
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, {y:-6, boxShadow:'0 24px 60px rgba(0,0,0,0.45)', duration:0.35}));
    card.addEventListener('mouseleave', () => gsap.to(card, {y:0, boxShadow:'0 0 0 rgba(0,0,0,0)', duration:0.35}));
    card.addEventListener('focus', () => gsap.to(card, {y:-6, duration:0.25}));
    card.addEventListener('blur', () => gsap.to(card, {y:0, duration:0.25}));
  });

  // Testimonial gentle float
  gsap.to('.testimonial-card', {y:6, repeat:-1, yoyo:true, ease:'sine.inOut', duration:6});

  // Contact form - small success animation when clicked (no backend)
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const btnText = btn.querySelector('span');
    const originalText = btnText.textContent;
    
    // Animate button
    gsap.to(btn, {scale:0.96, duration:0.1, yoyo:true, repeat:1});
    
    // Change text temporarily
    btnText.textContent = 'Sending...';
    gsap.to(btn, {background:'linear-gradient(135deg, #10b981, #059669)', duration:0.3});
    
    // Simulate success after delay
    setTimeout(() => {
      btnText.textContent = 'Message Sent!';
      gsap.from(btn, {scale:1.1, duration:0.5, ease:'elastic.out(1, 0.5)'});
      
      // Reset after 2 seconds
      setTimeout(() => {
        btnText.textContent = originalText;
        gsap.to(btn, {background:'linear-gradient(135deg, var(--accent), #ff8a6b)', duration:0.3});
        form.reset();
      }, 2000);
    }, 1000);
  });

  // Set footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, {passive: true});
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    gsap.from(backToTop, {rotate: 360, duration: 0.6, ease: 'back.out(1.7)'});
  });

  // Hero image alternating rotation
  const imagePool = [
    './images/branding/branding-14.png',
    './images/branding/branding-7.png',
    './images/branding/branding-1.png',
    './images/branding/branding-4.png',
    './images/branding/branding-9.png',
    './images/print-design/print-design-1.png',
    './images/social-media-engagement/social-media-eng-1.png',
    './images/social-media-engagement/social-media-eng-2.png',
    './images/branding/branding-3.png'
  ];

  const showcaseFrames = [
    document.querySelector('.showcase-frame-main img'),
    document.querySelector('.showcase-frame-secondary img'),
    document.querySelector('.showcase-frame-tertiary img')
  ];

  let currentIndices = [0, 1, 2]; // Starting indices for each frame

  function rotateImages() {
    showcaseFrames.forEach((img, frameIndex) => {
      if (img) {
        // Fade out current image
        gsap.to(img, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            // Update to next image in pool
            currentIndices[frameIndex] = (currentIndices[frameIndex] + 3) % imagePool.length;
            img.src = imagePool[currentIndices[frameIndex]];
            
            // Fade in new image
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out'
            });
          }
        });
      }
    });
  }

  // Rotate images every 5 seconds
  setInterval(rotateImages, 5000);

});
