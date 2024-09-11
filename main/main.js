document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.href_scroll');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the leading '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});
