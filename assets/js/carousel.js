$(document).ready(function() {
    const pages = $('.carousel-page');
    // show only the first page
    pages.addClass('hidden');
    pages.first().removeClass('hidden');
    
    const bar = $('#pagination-bar');
    if (pages.length > 1) {
        // remove any elements in it right now
        bar.empty()
        // For each element add in an appropriate pagination button
        for (let i = 1; i <= pages.length; i++) {
            let listItem = $('<li class="page-item"></li>');
            let button = $(`<a class="page-link" href="javascript:void(0)">${i}</a>`);
            listItem.append(button);
            bar.append(listItem);
        }
        // Mark the first pagination button as active
        bar.children().first().addClass('active');
        
        // Add the onclick listeners
        bar.children().click(createOnClick());
    } else {
        // Remove the pagination bar if there is only 1 page
        bar.remove();
    }
});

function createOnClick() {
    return function() {
        let index = parseInt($(this).text()) - 1;
        let currIndex = parseInt($('#pagination-bar .active').first().text()) - 1;
        if (index != currIndex) {
            const pages = $('.carousel-page');
            // hide the old page
            pages.addClass('hidden');

            const newPage = pages.eq(index);
            // Decide if the new page comes from the left or right
            const newPageClass = index > currIndex ? 'offscreen-r' : 'offscreen-l';
            newPage.removeClass('hidden'); // unhide the new page
            newPage.addClass(newPageClass); // move it offscreen
            // once the DOM updates, start the animation to move back onscreen
            waitNFrames(2, ()=>newPage.removeClass(newPageClass));

            // deactivate all buttons and activate the selected button
            $('#pagination-bar').children().removeClass('active');
            $(this).addClass('active');

            // Shamelessly stolen off of SO, scroll to the top of the project grid
            // $([document.documentElement, document.body]).animate({
            //     scrollTop: newPage.children().first().offset().top
            // }, 100);
        }
    }
}

function waitNFrames(n, func) {
    if (n > 0) {
        requestAnimationFrame(() => waitNFrames(n-1, func));
    } else {
        func();
    }
}