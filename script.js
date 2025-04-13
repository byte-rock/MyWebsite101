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

function handleTabClick(templateId) {
    // console.log("Function to select col3 content reached");
    const col3 = document.querySelector('.col3');
    col3.innerHTML = '';
    const template = document.getElementById(templateId).innerHTML;
    // console.log("contt template : "+ template);
    // console.log("col3 inner html : "+ col3.innerHTML);
    setTimeout(() => {
        col3.innerHTML = template;
    }, 600);
}

// Run on load to show "About" section
// window.addEventListener('DOMContentLoaded', () => {
//     handleTabClick(null, 'about');
// });