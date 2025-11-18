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

  // TWO-LEVEL MODAL SYSTEM
  // Get modal elements
  const categoryModal = document.getElementById('categoryModal');
  const projectModal = document.getElementById('projectModal');
  const categoryModalBackdrop = categoryModal.querySelector('.category-modal-backdrop');
  const modalBackdrop = projectModal.querySelector('.modal-backdrop');
  const categoryModalClose = categoryModal.querySelector('.category-modal-close');
  const modalClose = projectModal.querySelector('.modal-close');
  const modalBack = document.getElementById('modalBack');
  
  // Project database with multiple images per project
  const projectDatabase = {
    graphics: {
      title: 'Graphics Design',
      description: 'Creative visual solutions for modern brands',
      projects: [
        {
          title: 'Brand Identity System',
          desc: 'Complete visual identity for modern brands',
          category: 'Graphics Design',
          client: 'ThisUncle Tech',
          year: '2024',
          services: 'Brand Strategy, Logo Design, Visual Identity',
          images: [
            {
              src: './images/branding/branding-1.png',
              description: 'A comprehensive visual identity system that captures the essence of modern branding. This project involved creating a complete brand ecosystem including logo design, color palettes, typography systems, and brand guidelines.'
            },
            {
              src: './images/branding/branding-14.png',
              description: 'Developed a cohesive brand color palette with primary and secondary colors that work harmoniously across all touchpoints, ensuring brand consistency and recognition.'
            },
            {
              src: './images/branding/branding-7.png',
              description: 'Created comprehensive brand guidelines documenting logo usage, spacing rules, color specifications, and typography standards for consistent brand application.'
            },
            {
              src: './images/branding/branding-9.png',
              description: 'Designed a flexible visual system with modular components that maintain brand integrity while allowing creative expression across different media and formats.'
            }
          ]
        },
        {
          title: 'Logo Design',
          desc: 'Modern and memorable brand marks',
          category: 'Graphics Design',
          client: 'RK Studios',
          year: '2024',
          services: 'Logo Design, Brand Mark, Icon Design',
          images: [
            {
              src: './images/branding/branding-3.png',
              description: 'Crafted distinctive and memorable logos that perfectly represent brand values and mission. The design process involved extensive research, conceptualization, and refinement to create timeless marks.'
            },
            {
              src: './images/branding/branding-4.png',
              description: 'Explored multiple design directions, from minimalist to detailed, ensuring the final logo works effectively at any size and across all applications.'
            },
            {
              src: './images/branding/branding-11.png',
              description: 'Developed variations of the logo including horizontal, vertical, and icon-only versions to provide flexibility for different use cases and platforms.'
            },
            {
              src: './images/branding/branding-13.png',
              description: 'Created a complete logo system with clear usage guidelines, color variations, and minimum size requirements to maintain brand consistency.'
            }
          ]
        },
        {
          title: 'Packaging Design',
          desc: 'Eye-catching product packaging',
          category: 'Graphics Design',
          client: 'Apex Brands',
          year: '2023',
          services: 'Packaging Design, Structural Design, Print Production',
          images: [
            {
              src: './images/branding/branding-4.png',
              description: 'Eye-catching product packaging that stands out on shelves and creates lasting impressions. This project balanced aesthetic appeal with functional requirements and sustainable materials.'
            },
            {
              src: './images/print-design/print-design-1.png',
              description: 'Developed innovative structural designs that enhance user experience while optimizing for manufacturing efficiency and cost-effectiveness.'
            },
            {
              src: './images/print-design/print-design-3.png',
              description: 'Incorporated sustainable materials and eco-friendly printing techniques without compromising on visual impact or durability.'
            }
          ]
        },
        {
          title: 'Corporate Branding',
          desc: 'Professional business identity',
          category: 'Graphics Design',
          client: 'Zenith Finance',
          year: '2024',
          services: 'Corporate Identity, Stationery Design, Brand Guidelines',
          images: [
            {
              src: './images/branding/branding-7.png',
              description: 'Professional corporate identity that elevates business presence and builds trust with stakeholders. Comprehensive solution includes business cards, letterheads, and digital assets.'
            },
            {
              src: './images/branding/branding-6.png',
              description: 'Designed sophisticated stationery suite including business cards, letterheads, envelopes, and presentation folders that reinforce brand professionalism.'
            },
            {
              src: './images/print-design/print-design-2.png',
              description: 'Created cohesive brand collateral with consistent visual language that communicates credibility and attention to detail.'
            }
          ]
        },
        {
          title: 'Visual Identity',
          desc: 'Cohesive brand visual systems',
          category: 'Graphics Design',
          client: 'Nova Creative',
          year: '2023',
          services: 'Visual Identity, Design System, Brand Assets',
          images: [
            {
              src: './images/branding/branding-9.png',
              description: 'A cohesive visual identity system that tells a compelling brand story across all platforms. Flexible design system that maintains consistency while allowing creative expression.'
            },
            {
              src: './images/branding/branding-10.png',
              description: 'Established a comprehensive design system with reusable components, patterns, and guidelines for scalable brand implementation.'
            },
            {
              src: './images/branding/branding-12.png',
              description: 'Developed a library of brand assets including icons, illustrations, and graphic elements that support various communication needs.'
            }
          ]
        },
        {
          title: 'Brand Guidelines',
          desc: 'Comprehensive brand standards',
          category: 'Graphics Design',
          client: 'Momentum Corp',
          year: '2024',
          services: 'Brand Guidelines, Documentation, Training',
          images: [
            {
              src: './images/branding/branding-10.png',
              description: 'Comprehensive brand standards document that ensures consistent brand application across all media. Guidelines cover logo usage, color systems, typography, and imagery style.'
            },
            {
              src: './images/branding/branding-8.png',
              description: 'Created detailed documentation covering every aspect of brand implementation, from print materials to digital applications and environmental graphics.'
            },
            {
              src: './images/print-design/print-design-4.png',
              description: 'Developed training materials and workshops to ensure internal teams and external partners understand and correctly apply brand standards.'
            }
          ]
        },
        {
          title: 'Print Design',
          desc: 'Professional print materials',
          category: 'Graphics Design',
          client: 'Summit Media',
          year: '2024',
          services: 'Print Design, Stationery, Marketing Collateral',
          images: [
            {
              src: './images/print-design/print-design-1.png',
              description: 'Professional business stationery and print materials including business cards, letterheads, brochures, and promotional materials. Each piece reinforces the brand identity.'
            },
            {
              src: './images/print-design/print-design-2.png',
              description: 'Designed high-impact marketing brochures with strategic layouts that guide readers through key messages and calls to action.'
            },
            {
              src: './images/print-design/print-design-3.png',
              description: 'Created eye-catching promotional materials using advanced printing techniques including spot UV, embossing, and specialty finishes.'
            },
            {
              src: './images/print-design/print-design-4.png',
              description: 'Developed complete stationery systems that maintain brand consistency across all business communications and touchpoints.'
            }
          ]
        }
      ]
    },
    marketing: {
      title: 'Digital Marketing',
      description: 'Strategic campaigns that drive engagement and growth',
      projects: [
        {
          title: 'Instagram Campaign',
          desc: 'Engaging social media content',
          category: 'Digital Marketing',
          client: 'Vibe Commerce',
          year: '2024',
          services: 'Social Media Marketing, Content Creation, Analytics',
          images: [
            {
              src: './images/social-media-engagement/social-media-eng-1.png',
              description: 'Strategic Instagram campaign featuring curated content, engaging stories, and interactive posts that drove significant follower growth and engagement rates. Data-driven approach optimized for maximum reach.'
            },
            {
              src: './images/social-media-engagement/social-media-eng-2.png',
              description: 'Developed consistent visual themes and content pillars that resonate with target audience, resulting in 300% increase in engagement.'
            },
            {
              src: './images/social-media-engagement/social-media-eng-3.png',
              description: 'Created interactive story content with polls, quizzes, and Q&A sessions that boosted community engagement and brand loyalty.'
            }
          ]
        },
        {
          title: 'Social Media Graphics',
          desc: 'Scroll-stopping visuals',
          category: 'Digital Marketing',
          client: 'Pulse Startup',
          year: '2024',
          services: 'Graphic Design, Social Media Content, Brand Consistency',
          images: [
            {
              src: './images/social-media-engagement/social-media-eng-2.png',
              description: 'Attention-grabbing social media graphics designed to stop the scroll and drive engagement. Each graphic was optimized for platform specifications and audience preferences.'
            },
            {
              src: './images/social-media-engagement/social-media-eng-1.png',
              description: 'Designed platform-specific content that performs optimally on Instagram, Facebook, LinkedIn, and Twitter with appropriate dimensions and formatting.'
            },
            {
              src: './images/branding/branding-3.png',
              description: 'Created a library of reusable templates and graphics that maintain brand consistency while allowing for quick content production.'
            }
          ]
        },
        {
          title: 'Content Strategy',
          desc: 'Data-driven content planning',
          category: 'Digital Marketing',
          client: 'TechFlow B2B',
          year: '2023',
          services: 'Content Strategy, Planning, Performance Analysis',
          images: [
            {
              src: './images/social-media-engagement/social-media-eng-3.png',
              description: 'Comprehensive content strategy that aligns with business goals and audience needs. Research-backed approach to content creation, distribution, and performance measurement.'
            },
            {
              src: './images/branding/branding-14.png',
              description: 'Developed content calendars, editorial guidelines, and distribution strategies that increased organic reach by 250%.'
            }
          ]
        },
        {
          title: 'Ad Campaign',
          desc: 'High-converting advertising',
          category: 'Digital Marketing',
          client: 'Metro Retail',
          year: '2024',
          services: 'Digital Advertising, Creative Development, Campaign Management',
          images: [
            {
              src: './images/branding/branding-13.png',
              description: 'Multi-platform advertising campaign that delivered exceptional ROI. Strategic ad creative, precise targeting, and continuous optimization resulted in significant conversion increases.'
            },
            {
              src: './images/social-media-engagement/social-media-eng-1.png',
              description: 'Implemented A/B testing across multiple ad variations, resulting in 180% improvement in click-through rates and 45% reduction in cost per acquisition.'
            }
          ]
        }
      ]
    },
    media: {
      title: 'Media Production',
      description: 'Captivating visual storytelling through photography and video',
      projects: [
        {
          title: 'Product Photography',
          desc: 'Professional product shoots',
          category: 'Media Production',
          client: 'Luxe Goods',
          year: '2024',
          services: 'Product Photography, Retouching, Studio Setup',
          images: [
            {
              src: './images/branding/branding-1.png',
              description: 'High-quality product photography that showcases details and creates desire. Professional lighting, composition, and post-production deliver images that sell.'
            },
            {
              src: './images/branding/branding-4.png',
              description: 'Captured multiple angles and lifestyle shots that highlight product features and benefits in authentic settings.'
            },
            {
              src: './images/print-design/print-design-1.png',
              description: 'Delivered fully retouched, web-ready images optimized for e-commerce platforms with consistent color profiles and sizing.'
            }
          ]
        },
        {
          title: 'Corporate Documentary',
          desc: 'Authentic brand storytelling',
          category: 'Media Production',
          client: 'Pinnacle Enterprise',
          year: '2023',
          services: 'Documentary Filmmaking, Interviews, Storytelling',
          images: [
            {
              src: './images/branding/branding-7.png',
              description: 'Compelling documentary-style video that tells the authentic story of the brand. Interviewed key stakeholders, captured behind-the-scenes footage, and crafted a narrative that resonates.'
            },
            {
              src: './images/branding/branding-14.png',
              description: 'Produced cinematic interviews with founders and team members, revealing the human side of the business and building emotional connections with viewers.'
            }
          ]
        },
        {
          title: 'Event Coverage',
          desc: 'Dynamic event documentation',
          category: 'Media Production',
          client: 'Catalyst Events',
          year: '2024',
          services: 'Event Photography, Videography, Live Coverage',
          images: [
            {
              src: './images/branding/branding-9.png',
              description: 'Professional photography and videography services for corporate events, conferences, and product launches. Captured key moments and created engaging content for marketing use.'
            },
            {
              src: './images/branding/branding-10.png',
              description: 'Delivered comprehensive event coverage including highlight reels, social media clips, and full-length recordings for future promotional materials.'
            }
          ]
        },
        {
          title: 'Promotional Video',
          desc: 'Cinematic brand films',
          category: 'Media Production',
          client: 'Spark Innovations',
          year: '2023',
          services: 'Video Production, Cinematography, Motion Graphics',
          images: [
            {
              src: './images/branding/branding-3.png',
              description: 'Cinematic brand films that captivate audiences and drive action. Combined stunning visuals, compelling narrative, and strategic messaging to create memorable promotional content.'
            },
            {
              src: './images/social-media-engagement/social-media-eng-1.png',
              description: 'Integrated motion graphics, sound design, and color grading to create polished promotional videos that elevate brand perception and drive conversions.'
            }
          ]
        }
      ]
    }
  };

  // Open Category Modal (Level 1) - Shows project list for clicked category
  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const category = item.dataset.category;
      const categoryData = projectDatabase[category];
      
      if (!categoryData) return;
      
      // Populate category modal header
      document.getElementById('categoryTitle').textContent = categoryData.title;
      document.getElementById('categoryDescription').textContent = categoryData.description;
      
      // Generate projects list
      const projectsList = document.getElementById('projectsList');
      projectsList.innerHTML = '';
      
      categoryData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-list-item';
        projectCard.innerHTML = `
          <div class="project-item-image">
            <img src="${project.images[0].src}" alt="${project.title}">
          </div>
          <div class="project-item-info">
            <p class="project-item-client">${project.client}</p>
            <h3 class="project-item-title">${project.title}</h3>
            <p class="project-item-desc">${project.desc}</p>
          </div>
        `;
        
        // Add click handler to open project detail modal
        projectCard.addEventListener('click', () => openProjectModal(project));
        
        projectsList.appendChild(projectCard);
        
        // Animate project cards
        gsap.from(projectCard, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: index * 0.08,
          ease: 'power3.out'
        });
      });
      
      // Open category modal
      categoryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate modal
      gsap.from('.category-modal-header', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.out'
      });
    });
  });

  // Open Project Detail Modal (Level 2) - Shows project gallery and details
  function openProjectModal(project) {
    // Close category modal
    categoryModal.classList.remove('active');
    
    // Populate project modal
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.images[0].description;
    document.getElementById('modalClient').textContent = project.client;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalServices').textContent = project.services;
    
    // Set main image
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    modalImage.src = project.images[0].src;
    modalImage.alt = project.title;
    
    // Generate gallery thumbnails
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    galleryThumbnails.innerHTML = '';
    
    project.images.forEach((imageData, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.innerHTML = `<img src="${imageData.src}" alt="${project.title} ${index + 1}">`;
      
      thumbnail.addEventListener('click', () => {
        // Update main image
        modalImage.src = imageData.src;
        
        // Update description to match the clicked image
        modalDescription.textContent = imageData.description;
        
        // Update active thumbnail
        galleryThumbnails.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
        
        // Animate image and description change
        gsap.from(modalImage, {
          opacity: 0,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.from(modalDescription, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      galleryThumbnails.appendChild(thumbnail);
    });
    
    // Open project modal
    setTimeout(() => {
      projectModal.classList.add('active');
      
      // Animate modal content
      gsap.from('.gallery-main', {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: 'power3.out'
      });
      gsap.from('.modal-info > *', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, 200);
  }

  // Back button - Return to category modal
  modalBack.addEventListener('click', () => {
    projectModal.classList.remove('active');
    setTimeout(() => {
      categoryModal.classList.add('active');
    }, 200);
  });

  // Close modals
  function closeCategoryModal() {
    categoryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  categoryModalClose.addEventListener('click', closeCategoryModal);
  categoryModalBackdrop.addEventListener('click', closeCategoryModal);
  
  modalClose.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal.classList.contains('active')) {
        closeProjectModal();
      } else if (categoryModal.classList.contains('active')) {
        closeCategoryModal();
      }
    }
  });

  // Pricing button in project modal
  const modalPricingBtn = document.getElementById('modalPricingBtn');
  if (modalPricingBtn) {
    modalPricingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeProjectModal();
      setTimeout(() => {
        document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  }

  // Portfolio Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');

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
