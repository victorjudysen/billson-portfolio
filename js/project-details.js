// project-details.js - Dynamic project details page
// Loads project data from URL parameters and displays a creative collage gallery.

document.addEventListener("DOMContentLoaded", () => {
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
  checkNav();

  // Simplified Project Database (only what's needed for this page)
  const projectDatabase = {
    graphics: {
      title: "Graphics Design",
      projects: [
        {
          title: "Brand Identity System",
          description: "A comprehensive visual identity system that captures the essence of modern branding.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=110", "https://loremflickr.com/1200/800/architecture,minimal?random=111", "https://loremflickr.com/1200/800/architecture,minimal?random=112", "https://loremflickr.com/1200/800/architecture,minimal?random=113"],
        },
        {
          title: "Logo Design",
          description: "Crafted distinctive and memorable logos that perfectly represent brand values and mission.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=114", "https://loremflickr.com/1200/800/architecture,minimal?random=115", "https://loremflickr.com/1200/800/architecture,minimal?random=116", "https://loremflickr.com/1200/800/architecture,minimal?random=117"],
        },
        {
          title: "Packaging Design",
          description: "Eye-catching product packaging that stands out on shelves and creates lasting impressions.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=118", "https://loremflickr.com/1200/800/architecture,minimal?random=119", "https://loremflickr.com/1200/800/architecture,minimal?random=120"],
        },
        {
          title: "Corporate Branding",
          description: "Professional corporate identity that elevates business presence and builds trust with stakeholders.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=121", "https://loremflickr.com/1200/800/architecture,minimal?random=122", "https://loremflickr.com/1200/800/architecture,minimal?random=123"],
        },
        {
          title: "Visual Identity",
          description: "A cohesive visual identity system that tells a compelling brand story across all platforms.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=124", "https://loremflickr.com/1200/800/architecture,minimal?random=125", "https://loremflickr.com/1200/800/architecture,minimal?random=126"],
        },
        {
          title: "Brand Guidelines",
          description: "Comprehensive brand standards document that ensures consistent brand application across all media.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=127", "https://loremflickr.com/1200/800/architecture,minimal?random=128", "https://loremflickr.com/1200/800/architecture,minimal?random=129"],
        },
        {
          title: "Print Design",
          description: "Professional business stationery and print materials including business cards, letterheads, and brochures.",
          images: ["https://loremflickr.com/1200/800/architecture,minimal?random=130", "https://loremflickr.com/1200/800/architecture,minimal?random=131", "https://loremflickr.com/1200/800/architecture,minimal?random=132", "https://loremflickr.com/1200/800/architecture,minimal?random=133"],
        },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      projects: [
        {
          title: "Instagram Campaign",
          description: "Strategic Instagram campaign featuring curated content, engaging stories, and interactive posts.",
          images: ["https://loremflickr.com/1200/800/street,urban?random=134", "https://loremflickr.com/1200/800/street,urban?random=135", "https://loremflickr.com/1200/800/street,urban?random=136"],
        },
        {
          title: "Social Media Graphics",
          description: "Attention-grabbing social media graphics designed to stop the scroll and drive engagement.",
          images: ["https://loremflickr.com/1200/800/street,urban?random=137", "https://loremflickr.com/1200/800/street,urban?random=138", "https://loremflickr.com/1200/800/street,urban?random=139"],
        },
        {
          title: "Content Strategy",
          description: "Comprehensive content strategy that aligns with business goals and audience needs.",
          images: ["https://loremflickr.com/1200/800/street,urban?random=140", "https://loremflickr.com/1200/800/street,urban?random=141"],
        },
        {
          title: "Ad Campaign",
          description: "Multi-platform advertising campaign that delivered exceptional ROI.",
          images: ["https://loremflickr.com/1200/800/street,urban?random=142", "https://loremflickr.com/1200/800/street,urban?random=143"],
        },
      ],
    },
    media: {
      title: "Media Production",
      projects: [
        {
          title: "Product Photography",
          description: "High-quality product photography that showcases details and creates desire.",
          images: ["https://loremflickr.com/1200/800/concert,event?random=144", "https://loremflickr.com/1200/800/concert,event?random=145", "https://loremflickr.com/1200/800/concert,event?random=146", "https://loremflickr.com/1200/800/concert,event?random=147"],
        },
        {
          title: "Corporate Documentary",
          description: "Compelling documentary-style video that tells the authentic story of the brand.",
          images: ["https://loremflickr.com/1200/800/concert,event?random=148", "https://loremflickr.com/1200/800/concert,event?random=149"],
        },
        {
          title: "Event Coverage",
          description: "Professional photography and videography services for corporate events, conferences, and product launches.",
          images: ["https://loremflickr.com/1200/800/concert,event?random=150", "https://loremflickr.com/1200/800/concert,event?random=151"],
        },
        {
          title: "Promotional Video",
          description: "Cinematic brand films that captivate audiences and drive action.",
          images: ["https://loremflickr.com/1200/800/concert,event?random=152", "https://loremflickr.com/1200/800/concert,event?random=153"],
        },
      ],
    },
  };

  // Get data from URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const projectTitle = decodeURIComponent(urlParams.get("title"));
  const clientName = decodeURIComponent(urlParams.get("client") || "Client");

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
  document.getElementById("projectTitle").innerHTML = `${clientName} <span class="project-type">${project.title}</span>`;
  document.getElementById("projectDescription").style.display = "none"; // Hide description to save space as requested
  document.title = `${clientName} - ${project.title}`;

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

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');

  function openLightbox(images, index) {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxImage(images, index);
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
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
    galleryGrid.innerHTML = `<p class="error-message">Could not load project. Please <a href="../index.html#services">return to the portfolio</a>.</p>`;
  }
});
