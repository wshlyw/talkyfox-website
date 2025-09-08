// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const captureBtn = document.getElementById('capture-btn');
    const screenshotResult = document.getElementById('screenshot-result');
    const screenshotImg = document.getElementById('screenshot-img');
    const downloadBtn = document.getElementById('download-btn');
    
    // 移动端菜单切换
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 如果是移动端菜单，点击后关闭菜单
                if (window.innerWidth <= 992) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 截图功能
    if (captureBtn) {
        captureBtn.addEventListener('click', function() {
            const originalText = captureBtn.textContent;
            
            // 显示加载状态
            captureBtn.textContent = '生成中...';
            captureBtn.disabled = true;
            
            // 使用html2canvas捕获页面
            html2canvas(document.body, {
                scale: 1, // 控制截图质量，1是标准，更高更清晰但文件更大
                logging: false,
                useCORS: true,
                scrollY: -window.scrollY // 捕获当前可视区域
            }).then(canvas => {
                // 将canvas转换为图片
                const imgData = canvas.toDataURL('image/png');
                
                // 显示截图
                screenshotImg.src = imgData;
                screenshotResult.style.display = 'block';
                
                // 设置下载链接
                downloadBtn.href = imgData;
                downloadBtn.download = 'talky-fox-screenshot.png';
                
                // 恢复按钮状态
                captureBtn.textContent = originalText;
                captureBtn.disabled = false;
                
                // 滚动到截图结果
                screenshotResult.scrollIntoView({ behavior: 'smooth' });
            }).catch(error => {
                console.error('截图生成失败:', error);
                alert('截图生成失败，请重试');
                captureBtn.textContent = originalText;
                captureBtn.disabled = false;
            });
        });
    }
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // 添加动画效果
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.feature, .scenario, .user');
        
        function checkIfInView() {
            animatedElements.forEach(element => {
                const position = element.getBoundingClientRect();
                
                // 如果元素在视口中
                if (position.top < window.innerHeight - 50 && position.bottom >= 0) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // 初始化元素状态
        animatedElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // 监听滚动事件
        window.addEventListener('scroll', checkIfInView);
        // 初始检查
        checkIfInView();
    }
    
    // 初始化动画
    initAnimations();
});