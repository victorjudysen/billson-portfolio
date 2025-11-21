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
    .from(".lead", { y: 18, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
    .from(".cta", { scale: 0.95, opacity: 0, duration: 0.6, ease: "back.out(1.4)" }, "-=0.35");

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
      profileImage: "./images/branding/branding-1.png",
      clientCount: 8,
      projects: [
        {
          title: "Brand Identity System",
          client: "ThisUncle Tech",
          images: ["./images/branding/branding-1.png", "./images/branding/branding-14.png", "./images/branding/branding-7.png", "./images/branding/branding-9.png"],
        },
        {
          title: "Logo Design",
          client: "RK Studios",
          images: ["./images/branding/branding-3.png", "./images/branding/branding-4.png", "./images/branding/branding-11.png", "./images/branding/branding-13.png"],
        },
        {
          title: "Packaging Design",
          client: "Apex Brands",
          images: ["./images/branding/branding-4.png", "./images/print-design/print-design-1.png", "./images/print-design/print-design-3.png"],
        },
        {
          title: "Corporate Branding",
          client: "Zenith Finance",
          images: ["./images/branding/branding-7.png", "./images/branding/branding-6.png", "./images/print-design/print-design-2.png"],
        },
        {
          title: "Visual Identity",
          client: "Nova Creative",
          images: ["./images/branding/branding-9.png", "./images/branding/branding-10.png", "./images/branding/branding-12.png"],
        },
        {
          title: "Brand Guidelines",
          client: "Momentum Corp",
          images: ["./images/branding/branding-10.png", "./images/branding/branding-8.png", "./images/print-design/print-design-4.png"],
        },
        {
          title: "Print Design",
          client: "Summit Media",
          images: ["./images/print-design/print-design-1.png", "./images/print-design/print-design-2.png", "./images/print-design/print-design-3.png", "./images/print-design/print-design-4.png"],
        },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      description: "Strategic campaigns that drive engagement and growth.",
      profileImage: "./images/social-media-engagement/social-media-eng-1.png",
      clientCount: 4,
      projects: [
        {
          title: "Instagram Campaign",
          client: "Vibe Commerce",
          images: ["./images/social-media-engagement/social-media-eng-1.png", "./images/social-media-engagement/social-media-eng-2.png", "./images/social-media-engagement/social-media-eng-3.png"],
        },
        {
          title: "Social Media Graphics",
          client: "Pulse Startup",
          images: ["./images/social-media-engagement/social-media-eng-2.png", "./images/social-media-engagement/social-media-eng-1.png", "./images/branding/branding-3.png"],
        },
        {
          title: "Content Strategy",
          client: "TechFlow B2B",
          images: ["./images/social-media-engagement/social-media-eng-3.png", "./images/branding/branding-14.png"],
        },
        {
          title: "Ad Campaign",
          client: "Metro Retail",
          images: ["./images/branding/branding-13.png", "./images/social-media-engagement/social-media-eng-1.png"],
        },
      ],
    },
    media: {
      title: "Media Production",
      description: "Captivating visual storytelling through photography and video.",
      profileImage: "./images/branding/branding-9.png",
      clientCount: 4,
      projects: [
        {
          title: "Product Photography",
          client: "Luxe Goods",
          images: ["./images/branding/branding-1.png", "./images/branding/branding-4.png", "./images/print-design/print-design-1.png"],
        },
        {
          title: "Corporate Documentary",
          client: "Pinnacle Enterprise",
          images: ["./images/branding/branding-7.png", "./images/branding/branding-14.png"],
        },
        {
          title: "Event Coverage",
          client: "Catalyst Events",
          images: ["./images/branding/branding-9.png", "./images/branding/branding-10.png"],
        },
        {
          title: "Promotional Video",
          client: "Spark Innovations",
          images: ["./images/branding/branding-3.png", "./images/social-media-engagement/social-media-eng-1.png"],
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
    "./images/branding/branding-14.png",
    "./images/branding/branding-7.png",
    "./images/branding/branding-1.png",
    "./images/branding/branding-4.png",
    "./images/branding/branding-9.png",
    "./images/print-design/print-design-1.png",
    "./images/social-media-engagement/social-media-eng-1.png",
    "./images/social-media-engagement/social-media-eng-2.png",
    "./images/branding/branding-3.png",
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
