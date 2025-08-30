/**
* Template Name: Folio
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/folio-bootstrap-portfolio-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.services-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
    touchNavigation: true,
    keyboardNavigation: true,
    closeButton: true,
    prevButton: true,
    nextButton: true,
    autoplay: false,
    loop: true,
    slideEffect: 'slide',
    startAt: 0, // 첫 번째 이미지부터 시작
    // 이미지가 잘리지 않도록 설정
    width: '95vw',
    height: '95vh',
    zoomable: true,
    draggable: true,
    preload: true,
    showTitle: false, // 제목 표시 비활성화
    showDescription: false, // 설명 표시 비활성화
    lightboxHTML: `
      <div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">
        <div class="gloader visible"></div>
        <div class="goverlay"></div>
        <div class="gcontainer">
          <div id="glightbox-slider" class="gslider"></div>
          <button class="gclose gbtn" aria-label="Close" data-taborder="3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="gprev gbtn" aria-label="Previous" data-taborder="2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="gnext gbtn" aria-label="Next" data-taborder="4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `,
    onOpen: () => {
      // 라이트박스 열릴 때 추가 기능
      console.log('Portfolio lightbox opened');
    },
    onSlideBeforeLoad: (data) => {
      // 슬라이드 로드 전 추가 기능
      console.log('Loading slide:', data.index);
    },
    onSlideAfterLoad: (data) => {
      // 슬라이드 로드 후 이미지 크기 조정
      if (data.slideType === 'image') {
        const img = data.slide.querySelector('img');
        if (img) {
          img.style.maxWidth = '100%';
          img.style.maxHeight = '90vh';
          img.style.objectFit = 'contain';
          img.style.width = 'auto';
          img.style.height = 'auto';
          img.style.display = 'block';
          img.style.cursor = 'zoom-in';
          img.style.transition = 'all 0.3s ease';
          
          // 이미지 로드 완료 후 크기 재조정
          if (img.complete) {
            adjustImageSize(img);
            // 이미지가 완전히 로드된 후 클릭 이벤트 다시 설정
            setTimeout(() => {
              setupImageClickEvent(img);
            }, 100);
          } else {
            img.onload = () => {
              adjustImageSize(img);
              // 이미지가 완전히 로드된 후 클릭 이벤트 다시 설정
              setTimeout(() => {
                setupImageClickEvent(img);
              }, 100);
            };
          }
          
          // 이미지 클릭 시 확대/축소 기능 추가
          setupImageClickEvent(img);
        }
      }
    },
    onOpen: () => {
      // 라이트박스 열릴 때 추가 기능
      console.log('Portfolio lightbox opened');
      
      // 라이트박스 컨테이너 크기 조정
      setTimeout(() => {
        const container = document.querySelector('.glightbox-container');
        if (container) {
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
          container.style.minHeight = '100vh';
        }
      }, 100);
      
      // ESC 키 이벤트 리스너 추가
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const zoomedImages = document.querySelectorAll('.gslide-media img.zoomed');
          zoomedImages.forEach(img => {
            img.classList.remove('zoomed');
            img.style.transform = 'scale(1)';
            img.style.cursor = 'zoom-in';
            img.style.zIndex = '1';
          });
        }
      });
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * 이미지 크기 조정 함수
   */
  function adjustImageSize(img) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 이미지 원본 크기
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    
    // 뷰포트 크기에 맞게 조정
    let newWidth = imgWidth;
    let newHeight = imgHeight;
    
    // 너무 크면 축소
    if (imgWidth > viewportWidth * 0.9) {
      newWidth = viewportWidth * 0.9;
      newHeight = (imgHeight * newWidth) / imgWidth;
    }
    
    if (newHeight > viewportHeight * 0.9) {
      newHeight = viewportHeight * 0.9;
      newWidth = (imgWidth * newHeight) / imgHeight;
    }
    
    // 스타일 적용
    img.style.width = newWidth + 'px';
    img.style.height = newHeight + 'px';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.objectFit = 'contain';
  }

  /**
   * 이미지 클릭 이벤트 설정 함수
   */
  function setupImageClickEvent(img) {
    // 기존 이벤트 리스너 제거
    if (img.clickHandler) {
      img.removeEventListener('click', img.clickHandler);
    }
    
    // 새로운 클릭 핸들러 생성
    img.clickHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Image clicked!'); // 디버깅용
      
      if (this.classList.contains('zoomed')) {
        // 축소
        this.classList.remove('zoomed');
        this.style.transform = 'scale(1)';
        this.style.cursor = 'zoom-in';
        this.style.zIndex = '1';
        this.style.position = 'relative';
        this.style.left = '0';
        this.style.top = '0';
        this.style.margin = '0 auto';
        this.style.float = 'none';
        this.style.clear = 'both';
        console.log('Image unzoomed'); // 디버깅용
      } else {
        // 확대
        this.classList.add('zoomed');
        this.style.transform = 'scale(1.5)';
        this.style.cursor = 'zoom-out';
        this.style.zIndex = '1000';
        this.style.position = 'relative';
        this.style.left = '0';
        this.style.top = '0';
        this.style.margin = '0 auto';
        this.style.float = 'none';
        this.style.clear = 'both';
        console.log('Image zoomed'); // 디버깅용
      }
    };
    
    // 클릭 이벤트 리스너 추가
    img.addEventListener('click', img.clickHandler);
    
    // 이미지가 클릭 가능한지 확인
    console.log('Image click event setup complete for:', img.src);
  }

  /**
   * 원형 애니메이션 한 번만 실행
   */
  window.addEventListener('load', () => {
    const rollingCircle = select('.rolling-circle');
    if (rollingCircle) {
      // 페이지 로드 시 애니메이션 실행
      rollingCircle.style.animation = 'rollFromLeft 6s ease-out forwards';
      
      // 애니메이션 완료 후 우측에 정지
      rollingCircle.addEventListener('animationend', () => {
        // 애니메이션이 끝나면 우측에 고정
        rollingCircle.style.left = 'calc(100% - 220px)';
        rollingCircle.style.transform = 'translateY(-50%) rotate(360deg)';
      });
    }
  });

  /**
   * 스킬 그래프 애니메이션 (스크롤 시 한 번만 실행)
   */
  let skillAnimationTriggered = false;
  
  const animateSkills = () => {
    if (skillAnimationTriggered) return;
    
    const skillFills = select('.skill-fill', true);
    const skillPercents = select('.skill-percent', true);
    
    skillFills.forEach((fill, index) => {
      const percent = parseInt(fill.getAttribute('data-percent'));
      const percentElement = skillPercents[index];
      
      // 애니메이션 시작
      fill.style.width = percent + '%';
      
      // 퍼센트 숫자 애니메이션
      let currentPercent = 0;
      const increment = percent / 50; // 50단계로 나누어 부드럽게 증가
      
      const updatePercent = () => {
        if (currentPercent < percent) {
          currentPercent += increment;
          if (currentPercent > percent) currentPercent = percent;
          percentElement.textContent = Math.round(currentPercent) + '%';
          requestAnimationFrame(updatePercent);
        }
      };
      
      updatePercent();
    });
    
    skillAnimationTriggered = true;
  };
  
  // Intersection Observer로 services 섹션이 화면에 보일 때 애니메이션 실행
  const skillSection = select('#services');
  if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillAnimationTriggered) {
          // 약간의 지연을 두어 사용자가 섹션을 명확히 볼 수 있도록 함
          setTimeout(() => {
            animateSkills();
          }, 300);
        }
      });
    }, { 
      threshold: 0.2, // 20% 이상 보일 때 트리거
      rootMargin: '0px 0px -50px 0px' // 하단에서 50px 전에 트리거
    });
    
    observer.observe(skillSection);
  }

})()