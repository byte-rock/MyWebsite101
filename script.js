const icons = document.querySelectorAll('.quick-nav > i');

const sizeOrder = ['fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6'];

function getNextSize(current) {
    const index = sizeOrder.indexOf(current);
    return index > 0 ? sizeOrder[index - 1] : current; // make it 1 step larger
}

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        icons.forEach(i => {
            // Reset size to original
            const originalSize = i.getAttribute('data-original-size');
            sizeOrder.forEach(cls => i.classList.remove(cls)); // remove all size classes
            i.classList.remove('active-icon');
            i.classList.add(originalSize); // restore original size
        });

        // Enlarge clicked icon
        const currentSize = icon.getAttribute('data-original-size');
        const largerSize = getNextSize(currentSize);
        icon.classList.remove(currentSize);
        icon.classList.add(largerSize, 'active-icon');

        collapseColumnThree();
        setTimeout(() => {
            expandColumnThree();
        }, 400);
        var sectionName = icon.getAttribute('data-section');
        handleTabClick(sectionName);
    });
});

function expandColumnThree() {
    var column3 = document.querySelector('.col3');
    column3.classList.add('expanded');
}

function collapseColumnThree() {
    var column3 = document.querySelector('.col3');
    column3.classList.remove('expanded');
}

function horizontalScrollDirection(event, iconsRect, mainRect) {
    const iconsCenterY = (iconsRect.y + iconsRect.bottom) / 2;
    const isWithinMain = iconsCenterY >= mainRect.y && iconsCenterY <= mainRect.bottom;
    if (!isWithinMain) return 0;

    if (event.deltaY > 0) {
        return 1; // Scroll right
    } else if (event.deltaY < 0) {
        return -1; // Scroll left
    }
    return 0; // No horizontal scroll
}

function autoScrollIconsHorizontally() {
    const mainScroll = document.getElementById('mazharScroll');
    const skillScrollSection = document.getElementById('skillScrollSection');
    if (mainScroll) {
        mainScroll.addEventListener('wheel', function (e) {
            const mainRectangle = mainScroll.getBoundingClientRect();
            const iconsRectangle = skillScrollSection.getBoundingClientRect();
            const direction = horizontalScrollDirection(e, iconsRectangle, mainRectangle);

            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                const iconsCenterY = iconsRectangle.top + iconsRectangle.height / 2;
                const distanceToTop = iconsCenterY - mainRectangle.top;

                // Clamp the distance to range [0, mainRectangle.height]
                const progress = Math.min(Math.max(1 - (distanceToTop / mainRectangle.height), 0), 1);
                if (direction === 1) {
                    const maxScrollLeft = skillScrollSection.scrollWidth - skillScrollSection.clientWidth;
                    const targetScrollLeft = progress * maxScrollLeft;
                    skillScrollSection.scrollTo({
                        left: targetScrollLeft,
                        behavior: 'smooth'
                    });
                } else if (direction === -1) {
                    const maxScrollRight = skillScrollSection.scrollWidth - skillScrollSection.clientWidth;
                    const targetScrollLeft = (1 - progress) * maxScrollRight;
                    skillScrollSection.scrollTo({
                        left: ((maxScrollRight - targetScrollLeft)),
                        behavior: 'smooth'
                    });
                }
            }
        }, { passive: false });
    }
}

function handleTabClick(templateId) {
    const mainScrollSection = document.getElementById('scrollable-section');
    mainScrollSection.innerHTML = '';
    const template = document.getElementById(templateId).innerHTML;

    setTimeout(() => {
        mainScrollSection.innerHTML = template;

        //Scroll the Skills icons horizontally

        autoScrollIconsHorizontally();
    }, 600);
}
