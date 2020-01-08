function onReady() {
    let isActive = false;
    document.getElementById("burger").onclick = () => {
        if (!isActive) {
            document.getElementById("burger").className = "hamburger hamburger--collapse is-active";
        } else {
            document.getElementById("burger").className = "hamburger hamburger--collapse";
        }
        isActive = !isActive;
        document.getElementById("burger-modal").style.display = (isActive ? "flex" : "none");
    };
}

onReady();
