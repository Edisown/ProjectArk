function initializeScrollableTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error("Container not found.");
        return;
    }

    const tabs = container.querySelectorAll("a");
    const rightArrow = container.querySelector(".right-arrow svg");
    const leftArrow = container.querySelector(".left-arrow svg");
    const tabsList = container.querySelector("ul");
    const leftArrowContainer = container.querySelector(".left-arrow");
    const rightArrowContainer = container.querySelector(".right-arrow");

    const removeAllActiveClasses = () => {
        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            removeAllActiveClasses();
            tab.classList.add("active");
        });
    });

    const manageIcons = () => {
        if (tabsList.scrollLeft >= 20) {
            leftArrowContainer.classList.add("active");
        } else {
            leftArrowContainer.classList.remove("active");
        }

        let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;

        if (tabsList.scrollLeft >= maxScrollValue) {
            rightArrowContainer.classList.remove("active");
        } else {
            rightArrowContainer.classList.add("active");
        }
    };

    rightArrow.addEventListener("click", () => {
        tabsList.scrollLeft += 200;
        manageIcons();
    });

    leftArrow.addEventListener("click", () => {
        tabsList.scrollLeft -= 200;
        manageIcons();
    });

    tabsList.addEventListener("scroll", manageIcons);

    let dragging = false;

    const drag = (e) => {
        if (!dragging) return;
        tabsList.classList.add("dragging");
        tabsList.scrollLeft -= e.movementX;
    };

    tabsList.addEventListener("mousedown", () => {
        dragging = true;
    });

    tabsList.addEventListener("mousemove", drag);

    document.addEventListener("mouseup", () => {
        dragging = false;
        tabsList.classList.remove("dragging");
    });
}

// calling the div class
initializeScrollableTabs(".scrollable-tabs-container");
