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
          images: ["https://picsum.photos/800/600?random=2", "https://picsum.photos/800/600?random=3", "https://picsum.photos/800/600?random=4", "https://picsum.photos/800/600?random=5"],
        },
        {
          title: "Logo Design",
          description: "Crafted distinctive and memorable logos that perfectly represent brand values and mission.",
          images: ["https://picsum.photos/800/600?random=6", "https://picsum.photos/800/600?random=7", "https://picsum.photos/800/600?random=8", "https://picsum.photos/800/600?random=9"],
        },
        {
          title: "Packaging Design",
          description: "Eye-catching product packaging that stands out on shelves and creates lasting impressions.",
          images: ["https://picsum.photos/800/600?random=10", "https://picsum.photos/800/600?random=11", "https://picsum.photos/800/600?random=12"],
        },
        {
          title: "Corporate Branding",
          description: "Professional corporate identity that elevates business presence and builds trust with stakeholders.",
          images: ["https://picsum.photos/800/600?random=13", "https://picsum.photos/800/600?random=14", "https://picsum.photos/800/600?random=15"],
        },
        {
          title: "Visual Identity",
          description: "A cohesive visual identity system that tells a compelling brand story across all platforms.",
          images: ["https://picsum.photos/800/600?random=16", "https://picsum.photos/800/600?random=17", "https://picsum.photos/800/600?random=18"],
        },
        {
          title: "Brand Guidelines",
          description: "Comprehensive brand standards document that ensures consistent brand application across all media.",
          images: ["https://picsum.photos/800/600?random=19", "https://picsum.photos/800/600?random=20", "https://picsum.photos/800/600?random=21"],
        },
        {
          title: "Print Design",
          description: "Professional business stationery and print materials including business cards, letterheads, and brochures.",
          images: ["https://picsum.photos/800/600?random=22", "https://picsum.photos/800/600?random=23", "https://picsum.photos/800/600?random=24", "https://picsum.photos/800/600?random=25"],
        },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      projects: [
        {
          title: "Instagram Campaign",
          description: "Strategic Instagram campaign featuring curated content, engaging stories, and interactive posts.",
          images: ["https://picsum.photos/800/600?random=27", "https://picsum.photos/800/600?random=28", "https://picsum.photos/800/600?random=29"],
        },
        {
          title: "Social Media Graphics",
          description: "Attention-grabbing social media graphics designed to stop the scroll and drive engagement.",
          images: ["https://picsum.photos/800/600?random=30", "https://picsum.photos/800/600?random=31", "https://picsum.photos/800/600?random=32"],
        },
        {
          title: "Content Strategy",
          description: "Comprehensive content strategy that aligns with business goals and audience needs.",
          images: ["https://picsum.photos/800/600?random=33", "https://picsum.photos/800/600?random=34"],
        },
        {
          title: "Ad Campaign",
          description: "Multi-platform advertising campaign that delivered exceptional ROI.",
          images: ["https://picsum.photos/800/600?random=35", "https://picsum.photos/800/600?random=36"],
        },
      ],
    },
    media: {
      title: "Media Production",
      projects: [
        {
          title: "Product Photography",
          description: "High-quality product photography that showcases details and creates desire.",
          images: ["https://picsum.photos/800/600?random=38", "https://picsum.photos/800/600?random=39", "https://picsum.photos/800/600?random=40"],
        },
        {
          title: "Corporate Documentary",
          description: "Compelling documentary-style video that tells the authentic story of the brand.",
          images: ["https://picsum.photos/800/600?random=41", "https://picsum.photos/800/600?random=42"],
        },
        {
          title: "Event Coverage",
          description: "Professional photography and videography services for corporate events, conferences, and product launches.",
          images: ["https://picsum.photos/800/600?random=43", "https://picsum.photos/800/600?random=44"],
        },
        {
          title: "Promotional Video",
          description: "Cinematic brand films that captivate audiences and drive action.",
          images: ["https://picsum.photos/800/600?random=45", "https://picsum.photos/800/600?random=46"],
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
