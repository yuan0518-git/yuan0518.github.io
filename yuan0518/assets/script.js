document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 進度條滾動觸發邏輯 ---
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let animationTriggered = false;

    function startProgressAnimation() {
        if (animationTriggered) return;

        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        animationTriggered = true;
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startProgressAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.7 // 70% 進入視窗時觸發
        });
        observer.observe(skillsSection);
    } else {
        startProgressAnimation();
    }


    // --- 2. 導覽列平滑滾動功能 ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'      
                });
            }
        });
    });


    // --- 3. 模態視窗開關邏輯 (動畫修正) ---

    // 定義關閉視窗的函數
    function closeModal(modalElement) {
        if (modalElement) {
            // 移除 'open' class，CSS 會觸發淡出動畫，並在 0.4s 後徹底隱藏
            modalElement.classList.remove('open');
        }
    }

    const modalTriggers = document.querySelectorAll('.detail-link');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // 1. 確保初始狀態是關閉 (opacity: 0)
                modal.classList.remove('open');
                
                // 2. 關鍵修正：強制瀏覽器重繪 (Reflow)
                // 這樣才能讓瀏覽器識別到從 'close' 到 'open' 的狀態變化，從而執行 transition
                void modal.offsetHeight; 

                // 3. 添加 'open' class，觸發 CSS 淡入動畫
                modal.classList.add('open');
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 點擊背景關閉
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

});