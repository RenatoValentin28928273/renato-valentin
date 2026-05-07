document.addEventListener('DOMContentLoaded', () => {
  const brandItems = document.querySelectorAll('.brand-item');
  brandItems.forEach((item) => item.classList.add('no-selection'));

  if (window.innerWidth > 768) {
    brandItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        brandItems.forEach((other) => other.classList.remove('no-selection'));
      });
      item.addEventListener('mouseleave', () => {
        brandItems.forEach((other) => other.classList.add('no-selection'));
      });
    });
  }

  const postDataElement = document.getElementById('blog-post-data');
  const postGrid = document.querySelector('.post-grid');
  const sentinel = document.querySelector('.infinite-scroll-sentinel');

  if (postDataElement && postGrid && sentinel) {
    let posts = [];
    try {
      posts = JSON.parse(postDataElement.textContent || '[]');
    } catch (error) {
      console.error('Erro ao ler dados dos posts do blog:', error);
    }

    const pageSize = 2;
    let loadedCount = postGrid.querySelectorAll('.post-card').length;
    const totalPosts = posts.length;

    const createPostCard = ({ tag, title, description, url, meta }) => {
      const article = document.createElement('article');
      article.className = 'post-card';
      article.innerHTML = `
        <a href="${url}">
          <span class="post-card-tag">${tag}</span>
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="post-card-meta">${meta}</div>
        </a>
      `;
      return article;
    };

    const loadMorePosts = () => {
      if (loadedCount >= totalPosts) {
        observer.disconnect();
        sentinel.style.display = 'none';
        return;
      }

      const nextItems = posts.slice(loadedCount, loadedCount + pageSize);
      nextItems.forEach((post) => postGrid.appendChild(createPostCard(post)));
      loadedCount += nextItems.length;

      if (loadedCount >= totalPosts) {
        observer.disconnect();
        sentinel.style.display = 'none';
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMorePosts();
        }
      });
    }, {
      rootMargin: '200px',
      threshold: 0.1,
    });

    if (loadedCount < totalPosts) {
      observer.observe(sentinel);
    } else {
      sentinel.style.display = 'none';
    }
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.site-nav-left .nav');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
});
