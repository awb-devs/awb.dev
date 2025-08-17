// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('catppuccin-theme') || 'dark';
    setTheme(savedTheme);
    
    // Add event listener to checkbox
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('catppuccin-theme', newTheme);
        });
    }
    
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeToggle) {
            // Set checkbox state: checked = light theme, unchecked = dark theme
            themeToggle.checked = (theme === 'light');
        }
    }
    
    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
