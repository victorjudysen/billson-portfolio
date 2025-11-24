// script.js — Animations and UI interactions for Billison portfolio
// Uses GSAP + ScrollTrigger (loaded via CDN in HTML)

/* eslint-disable no-undef */

document.addEventListener("DOMContentLoaded", () => {
  // Safety: ensure gsap and ScrollTrigger exist
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // NAV: sticky background toggle
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const nav = document.querySelector(".nav");

  function checkNav() {
    const threshold = window.innerHeight * 0.02;
    if (window.scrollY > threshold) header.classList.add("solid");
    else header.classList.remove("solid");
  }
  checkNav();
  window.addEventListener("scroll", checkNav, { passive: true });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileSheet = document.querySelector(".mobile-nav-sheet");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  toggle.addEventListener("click", () => {
    mobileSheet.classList.toggle("open");
    toggle.classList.toggle("open");
    document.body.style.overflow = mobileSheet.classList.contains("open") ? "hidden" : "";
  });

  // Close mobile nav when clicking a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileSheet.classList.remove("open");
      toggle.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Hero text reveal
  const heroTl = gsap.timeline();
  heroTl
    .from(".intro-line", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
    .from(".tagline", { y: 28, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
    .fromTo(".lead", 
      { y: 18, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "all" }, 
      "-=0.45"
    )
    .fromTo(".cta", 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)", clearProps: "all" }, 
      "-=0.35"
    );

  // Hero background subtle parallax
  gsap.to(".hero-bg", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  // Staggered reveal for sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    // Exclude portfolio items and testimonial cards from generic animation
    // They have their own specific animations
    const elems = section.querySelectorAll("h3, h4, p, .service-card, .contact-form, .about-right img");
    if (elems.length > 0) {
      gsap.from(elems, {
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });
    }
  });

  // Portfolio items specific animation
  gsap.utils.toArray(".port-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: "top 85%", once: true },
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: index * 0.05,
      ease: "power3.out",
    });
  });

  // Testimonial cards specific animation
  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 85%", once: true },
      y: 20,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Portfolio Items
  const portfolioItems = document.querySelectorAll(".port-item");

  // Portfolio hover subtle tilt using mousemove (lightweight)
  portfolioItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(item, {
        rotationY: x * 6,
        rotationX: y * -6,
        transformPerspective: 600,
        transformOrigin: "center",
        ease: "power1.out",
        duration: 0.6,
      });
    });
    item.addEventListener("mouseleave", () =>
      gsap.to(item, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" }),
    );
  });

  // LEVEL 1 MODAL - CATEGORY PROFILE & PROJECT GRID
  const categoryModal = document.getElementById("categoryModal");
  const categoryModalBackdrop = categoryModal.querySelector(".category-modal-backdrop");
  const categoryModalClose = categoryModal.querySelector(".category-modal-close");

  // Project database
  const projectDatabase = {
    graphics: {
      title: "Graphics Design",
      description: "Creative visual solutions for modern brands.",
      profileImage: "https://picsum.photos/200/200?random=1",
      clientCount: 8,
      projects: [
        {
          title: "Brand Identity System",
          client: "ThisUncle Tech",
          images: ["https://picsum.photos/800/600?random=2", "https://picsum.photos/800/600?random=3", "https://picsum.photos/800/600?random=4", "https://picsum.photos/800/600?random=5"],
        },
        {
          title: "Logo Design",
          client: "RK Studios",
          images: ["https://picsum.photos/800/600?random=6", "https://picsum.photos/800/600?random=7", "https://picsum.photos/800/600?random=8", "https://picsum.photos/800/600?random=9"],
        },
        {
          title: "Packaging Design",
          client: "Apex Brands",
          images: ["https://picsum.photos/800/600?random=10", "https://picsum.photos/800/600?random=11", "https://picsum.photos/800/600?random=12"],
        },
        {
          title: "Corporate Branding",
          client: "Zenith Finance",
          images: ["https://picsum.photos/800/600?random=13", "https://picsum.photos/800/600?random=14", "https://picsum.photos/800/600?random=15"],
        },
        {
          title: "Visual Identity",
          client: "Nova Creative",
          images: ["https://picsum.photos/800/600?random=16", "https://picsum.photos/800/600?random=17", "https://picsum.photos/800/600?random=18"],
        },
        {
          title: "Brand Guidelines",
          client: "Momentum Corp",
          images: ["https://picsum.photos/800/600?random=19", "https://picsum.photos/800/600?random=20", "https://picsum.photos/800/600?random=21"],
        },
        {
          title: "Print Design",
          client: "Summit Media",
          images: ["https://picsum.photos/800/600?random=22", "https://picsum.photos/800/600?random=23", "https://picsum.photos/800/600?random=24", "https://picsum.photos/800/600?random=25"],
        },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      description: "Strategic campaigns that drive engagement and growth.",
      profileImage: "https://picsum.photos/200/200?random=26",
      clientCount: 4,
      projects: [
        {
          title: "Instagram Campaign",
          client: "Vibe Commerce",
          images: ["https://picsum.photos/800/600?random=27", "https://picsum.photos/800/600?random=28", "https://picsum.photos/800/600?random=29"],
        },
        {
          title: "Social Media Graphics",
          client: "Pulse Startup",
          images: ["https://picsum.photos/800/600?random=30", "https://picsum.photos/800/600?random=31", "https://picsum.photos/800/600?random=32"],
        },
        {
          title: "Content Strategy",
          client: "TechFlow B2B",
          images: ["https://picsum.photos/800/600?random=33", "https://picsum.photos/800/600?random=34"],
        },
        {
          title: "Ad Campaign",
          client: "Metro Retail",
          images: ["https://picsum.photos/800/600?random=35", "https://picsum.photos/800/600?random=36"],
        },
      ],
    },
    media: {
      title: "Media Production",
      description: "Captivating visual storytelling through photography and video.",
      profileImage: "https://picsum.photos/200/200?random=37",
      clientCount: 4,
      projects: [
        {
          title: "Product Photography",
          client: "Luxe Goods",
          images: ["https://picsum.photos/800/600?random=38", "https://picsum.photos/800/600?random=39", "https://picsum.photos/800/600?random=40"],
        },
        {
          title: "Corporate Documentary",
          client: "Pinnacle Enterprise",
          images: ["https://picsum.photos/800/600?random=41", "https://picsum.photos/800/600?random=42"],
        },
        {
          title: "Event Coverage",
          client: "Catalyst Events",
          images: ["https://picsum.photos/800/600?random=43", "https://picsum.photos/800/600?random=44"],
        },
        {
          title: "Promotional Video",
          client: "Spark Innovations",
          images: ["https://picsum.photos/800/600?random=45", "https://picsum.photos/800/600?random=46"],
        },
      ],
    },
  };

  // Open Category Modal (Level 1)
  portfolioItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const category = item.dataset.category;
      const categoryData = projectDatabase[category];
      if (!categoryData) return;

      // Populate Profile Header
      document.getElementById("categoryProfileImage").src = categoryData.profileImage;
      document.getElementById("categoryProfileTitle").textContent = categoryData.title;
      document.getElementById("categoryProfileDescription").textContent = categoryData.description;
      document.getElementById("projectCount").textContent = categoryData.projects.length;
      document.getElementById("clientCount").textContent = categoryData.clientCount;

      // Generate projects grid
      const projectsList = document.getElementById("projectsList");
      projectsList.innerHTML = "";

      categoryData.projects.forEach((project, index) => {
        const projectCard = document.createElement("a");
        projectCard.className = "project-grid-item";
        // Encode the project title to be URL-safe
        const encodedTitle = encodeURIComponent(project.title);
        const encodedClient = encodeURIComponent(project.client);
        projectCard.href = `pages/project-details.html?category=${category}&title=${encodedTitle}&client=${encodedClient}`;
        
        projectCard.innerHTML = `
          <img src="${project.images[0]}" alt="${project.title}">
          <div class="project-grid-overlay">
            <h3>${project.title}</h3>
            <p>${project.client}</p>
          </div>
        `;
        projectsList.appendChild(projectCard);

        // Animate project cards
        gsap.fromTo(
          projectCard,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.08, ease: "power3.out" }
        );
      });

      // Open category modal
      categoryModal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Animate modal
      gsap.from(".category-profile-header", { opacity: 0, y: -20, duration: 0.5, ease: "power3.out" });
    });
  });

  // Close Category Modal
  function closeCategoryModal() {
    categoryModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  categoryModalClose.addEventListener("click", closeCategoryModal);
  categoryModalBackdrop.addEventListener("click", closeCategoryModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && categoryModal.classList.contains("active")) {
      closeCategoryModal();
    }
  });


  // Portfolio Filter System
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items with smooth animation
      portfolioItems.forEach((item, index) => {
        const category = item.dataset.category;
        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          // Show item
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: index * 0.05,
            onStart: () => {
              item.classList.remove("hidden");
              item.style.position = "relative";
            },
          });
        } else {
          // Hide item
          gsap.to(item, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              item.classList.add("hidden");
              item.style.position = "absolute";
            },
          });
        }
      });

      // Animate grid reorganization
      gsap.from(portfolioGrid, {
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  // Service card hover tilt (also for accessibility keyboard focus)
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      gsap.to(card, { y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.45)", duration: 0.35 }),
    );
    card.addEventListener("mouseleave", () =>
      gsap.to(card, { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.35 }),
    );
    card.addEventListener("focus", () => gsap.to(card, { y: -6, duration: 0.25 }));
    card.addEventListener("blur", () => gsap.to(card, { y: 0, duration: 0.25 }));
  });

  // Testimonial gentle float
  gsap.to(".testimonial-card", { y: 6, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 6 });

  // Contact form - small success animation when clicked (no backend)
  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-submit");
    const btnText = btn.querySelector("span");
    const originalText = btnText.textContent;

    // Animate button
    gsap.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });

    // Change text temporarily
    btnText.textContent = "Sending...";
    gsap.to(btn, { background: "linear-gradient(135deg, #10b981, #059669)", duration: 0.3 });

    // Simulate success after delay
    setTimeout(() => {
      btnText.textContent = "Message Sent!";
      gsap.from(btn, { scale: 1.1, duration: 0.5, ease: "elastic.out(1, 0.5)" });

      // Reset after 2 seconds
      setTimeout(() => {
        btnText.textContent = originalText;
        gsap.to(btn, { background: "linear-gradient(135deg, var(--accent), #ff8a6b)", duration: 0.3 });
        form.reset();
      }, 2000);
    }, 1000);
  });

  // Set footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");

  function toggleBackToTop() {
    if (window.scrollY > 100) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.from(backToTop, { rotate: 360, duration: 0.6, ease: "back.out(1.7)" });
  });

  // Hero image alternating rotation
  const imagePool = [
    "https://picsum.photos/800/600?random=47",
    "https://picsum.photos/800/600?random=48",
    "https://picsum.photos/800/600?random=49",
    "https://picsum.photos/800/600?random=50",
    "https://picsum.photos/800/600?random=51",
    "https://picsum.photos/800/600?random=52",
    "https://picsum.photos/800/600?random=53",
    "https://picsum.photos/800/600?random=54",
    "https://picsum.photos/800/600?random=55",
  ];

  const showcaseFrames = [
    document.querySelector(".showcase-frame-main img"),
    document.querySelector(".showcase-frame-secondary img"),
    document.querySelector(".showcase-frame-tertiary img"),
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
          ease: "power2.in",
          onComplete: () => {
            // Update to next image in pool
            currentIndices[frameIndex] = (currentIndices[frameIndex] + 3) % imagePool.length;
            img.src = imagePool[currentIndices[frameIndex]];

            // Fade in new image
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });
      }
    });
  }

  // Rotate images every 5 seconds
  setInterval(rotateImages, 5000);
});
