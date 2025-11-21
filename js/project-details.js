// project-details.js - Dynamic project details page
// Loads project data from URL parameters and displays a creative collage gallery.

document.addEventListener("DOMContentLoaded", () => {
  // Simplified Project Database (only what's needed for this page)
  const projectDatabase = {
    graphics: {
      title: "Graphics Design",
      projects: [
        {
          title: "Brand Identity System",
          description: "A comprehensive visual identity system that captures the essence of modern branding.",
          images: ["./images/branding/branding-1.png", "./images/branding/branding-14.png", "./images/branding/branding-7.png", "./images/branding/branding-9.png"],
        },
        {
          title: "Logo Design",
          description: "Crafted distinctive and memorable logos that perfectly represent brand values and mission.",
          images: ["./images/branding/branding-3.png", "./images/branding/branding-4.png", "./images/branding/branding-11.png", "./images/branding/branding-13.png"],
        },
        {
          title: "Packaging Design",
          description: "Eye-catching product packaging that stands out on shelves and creates lasting impressions.",
          images: ["./images/branding/branding-4.png", "./images/print-design/print-design-1.png", "./images/print-design/print-design-3.png"],
        },
        {
          title: "Corporate Branding",
          description: "Professional corporate identity that elevates business presence and builds trust with stakeholders.",
          images: ["./images/branding/branding-7.png", "./images/branding/branding-6.png", "./images/print-design/print-design-2.png"],
        },
        {
          title: "Visual Identity",
          description: "A cohesive visual identity system that tells a compelling brand story across all platforms.",
          images: ["./images/branding/branding-9.png", "./images/branding/branding-10.png", "./images/branding/branding-12.png"],
        },
        {
          title: "Brand Guidelines",
          description: "Comprehensive brand standards document that ensures consistent brand application across all media.",
          images: ["./images/branding/branding-10.png", "./images/branding/branding-8.png", "./images/print-design/print-design-4.png"],
        },
        {
          title: "Print Design",
          description: "Professional business stationery and print materials including business cards, letterheads, and brochures.",
          images: ["./images/print-design/print-design-1.png", "./images/print-design/print-design-2.png", "./images/print-design/print-design-3.png", "./images/print-design/print-design-4.png"],
        },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      projects: [
        {
          title: "Instagram Campaign",
          description: "Strategic Instagram campaign featuring curated content, engaging stories, and interactive posts.",
          images: ["./images/social-media-engagement/social-media-eng-1.png", "./images/social-media-engagement/social-media-eng-2.png", "./images/social-media-engagement/social-media-eng-3.png"],
        },
        {
          title: "Social Media Graphics",
          description: "Attention-grabbing social media graphics designed to stop the scroll and drive engagement.",
          images: ["./images/social-media-engagement/social-media-eng-2.png", "./images/social-media-engagement/social-media-eng-1.png", "./images/branding/branding-3.png"],
        },
        {
          title: "Content Strategy",
          description: "Comprehensive content strategy that aligns with business goals and audience needs.",
          images: ["./images/social-media-engagement/social-media-eng-3.png", "./images/branding/branding-14.png"],
        },
        {
          title: "Ad Campaign",
          description: "Multi-platform advertising campaign that delivered exceptional ROI.",
          images: ["./images/branding/branding-13.png", "./images/social-media-engagement/social-media-eng-1.png"],
        },
      ],
    },
    media: {
      title: "Media Production",
      projects: [
        {
          title: "Product Photography",
          description: "High-quality product photography that showcases details and creates desire.",
          images: ["./images/branding/branding-1.png", "./images/branding/branding-4.png", "./images/print-design/print-design-1.png"],
        },
        {
          title: "Corporate Documentary",
          description: "Compelling documentary-style video that tells the authentic story of the brand.",
          images: ["./images/branding/branding-7.png", "./images/branding/branding-14.png"],
        },
        {
          title: "Event Coverage",
          description: "Professional photography and videography services for corporate events, conferences, and product launches.",
          images: ["./images/branding/branding-9.png", "./images/branding/branding-10.png"],
        },
        {
          title: "Promotional Video",
          description: "Cinematic brand films that captivate audiences and drive action.",
          images: ["./images/branding/branding-3.png", "./images/social-media-engagement/social-media-eng-1.png"],
        },
      ],
    },
  };

  // Get data from URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const projectTitle = decodeURIComponent(urlParams.get("title"));

  const categoryData = projectDatabase[category];
  if (!categoryData) {
    handleError("Category not found.");
    return;
  }

  const project = categoryData.projects.find(p => p.title === projectTitle);
  if (!project) {
    handleError("Project not found.");
    return;
  }

  // Populate Header
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectDescription").textContent = project.description;
  document.title = `${project.title} — BS Studio`;

  // Populate Gallery
  const galleryGrid = document.getElementById("projectGalleryGrid");
  galleryGrid.innerHTML = ""; // Clear any existing content

  project.images.forEach((imgSrc, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.innerHTML = `
      <img src="${imgSrc}" alt="${project.title} - Image ${index + 1}" loading="lazy">
      <div class="gallery-overlay">
        <span>View Image</span>
      </div>
    `;
    
    // Add click listener for lightbox
    galleryItem.addEventListener('click', () => openLightbox(project.images, index));
    
    galleryGrid.appendChild(galleryItem);
  });

  // Navbar scroll effect
  const header = document.querySelector(".site-header");
  function checkNav() {
    if (window.scrollY > 50) {
      header.classList.add("solid");
    } else {
      header.classList.remove("solid");
    }
  }
  window.addEventListener("scroll", checkNav, { passive: true });
  checkNav(); // Check on load

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');

  function openLightbox(images, index) {
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateLightboxImage(images, index);
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateLightboxImage(images, index) {
    lightboxImg.src = images[index];
    lightboxCaption.textContent = `${project.title} - Image ${index + 1} of ${images.length}`;
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });

  function handleError(message) {
    console.error(message);
    const galleryGrid = document.getElementById("projectGalleryGrid");
    galleryGrid.innerHTML = `<p class="error-message">Could not load project. Please <a href="index.html#services">return to the portfolio</a>.</p>`;
  }
});
