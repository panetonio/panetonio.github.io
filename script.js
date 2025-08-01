document.addEventListener(\'DOMContentLoaded\', () => {
    // Script para o menu mobile
    const mobileMenuButton = document.getElementById(\'mobile-menu-button\');
    const mobileMenu = document.getElementById(\'mobile-menu\');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener(\'click\', () => {
            mobileMenu.classList.toggle(\'hidden\');
        });
        const mobileMenuLinks = mobileMenu.getElementsByTagName(\'a\');
        for (let link of mobileMenuLinks) {
            link.addEventListener(\'click\', () => {
                mobileMenu.classList.add(\'hidden\');
            });
        }
    }

    // Script para o carrossel de depoimentos (Swiper)
    if (typeof Swiper !== \'undefined\') {
        var swiper = new Swiper(\".mySwiper\", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: \".swiper-pagination\",
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                }
            }
        });
    }

    // Script para o acordeão de FAQ
    const faqItems = document.querySelectorAll(\".faq-item\");
    faqItems.forEach(item => {
        const question = item.querySelector(\".faq-question\");
        const answer = item.querySelector(\".faq-answer\");
        const arrow = item.querySelector(\".faq-arrow\");

        if (question && answer && arrow) {
            question.addEventListener(\'click\', () => {
                answer.classList.toggle(\'hidden\');
                arrow.classList.toggle(\'rotate-180\');
            });
        }
    });

    // Script para a seção "Como Funciona" (Abas/Acordeão)
    const serviceToggles = document.querySelectorAll(\".service-toggle\");
    const serviceContents = document.querySelectorAll(\".service-content\");
    const DESKTOP_BREAKPOINT = 768;

    const activateContent = (targetId) => {
        serviceContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.remove(\'hidden\');
            } else {
                content.classList.add(\'hidden\');
            }
        });
    };

    const activateToggle = (targetId) => {
        serviceToggles.forEach(toggle => {
            if (toggle.dataset.target === targetId) {
                toggle.classList.add(\'active\');
                if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                    toggle.classList.add(\'border-accent\');
                    toggle.classList.remove(\'border-transparent\');
                } else {
                    toggle.classList.add(\'bg-light-accent\');
                }
            } else {
                toggle.classList.remove(\'active\', \'border-accent\', \'bg-light-accent\');
                if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                    toggle.classList.add(\'border-transparent\');
                }
            }
        });
    };

    const handleToggleClick = (event) => {
        const targetId = event.currentTarget.dataset.target;
        const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

        if (isDesktop) {
            activateContent(targetId);
            activateToggle(targetId);
        } else {
            // Toggle accordion behavior for mobile
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                const isActive = !targetContent.classList.contains(\'hidden\');
                // Close all other accordions first
                serviceContents.forEach(content => content.classList.add(\'hidden\'));
                serviceToggles.forEach(toggle => toggle.classList.remove(\'active\', \'bg-light-accent\'));

                if (!isActive) {
                    targetContent.classList.remove(\'hidden\');
                    event.currentTarget.classList.add(\'active\', \'bg-light-accent\');
                }
            }
        }
    };

    serviceToggles.forEach(toggle => {
        toggle.addEventListener(\'click\', handleToggleClick);
    });

    // Initial setup based on screen size
    const initialSetup = () => {
        const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
        if (isDesktop) {
            // For desktop, activate the first tab by default
            if (serviceToggles.length > 0) {
                activateContent(serviceToggles[0].dataset.target);
                activateToggle(serviceToggles[0].dataset.target);
            }
        } else {
            // For mobile, hide all content initially
            serviceContents.forEach(content => content.classList.add(\'hidden\'));
            serviceToggles.forEach(toggle => toggle.classList.remove(\'active\', \'bg-light-accent\'));
        }
    };

    initialSetup();

    // Re-run setup on resize
    window.addEventListener(\'resize\', initialSetup);
});


