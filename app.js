document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".refactor-dashboard .agent-card");

  cards.forEach((card) => {
    // 1. Dynamically insert Domi background illustration at the bottom layer of the card
    let domiBg = card.querySelector(".domi-bg");
    if (!domiBg) {
      domiBg = document.createElement("div");
      domiBg.className = "domi-bg";
      card.insertBefore(domiBg, card.firstChild);
    }

    // 2. Dynamically insert Card Glare overlay
    let glare = card.querySelector(".card-glare");
    if (!glare) {
      glare = document.createElement("div");
      glare.className = "card-glare";
      card.appendChild(glare);
    }

    // 3. Dynamically insert Card Holographic overlay
    let holo = card.querySelector(".card-holo");
    if (!holo) {
      holo = document.createElement("div");
      holo.className = "card-holo";
      card.appendChild(holo);
    }

    // 4. Tab switching logic (internal content toggle SOBRE MÍ vs COMENTARIOS)
    const aboutTab = card.querySelector(".button-2");
    const commentsTab = card.querySelector(".button-3");
    
    // Select description and comments containers
    // DocuMentor/Epicron uses .container-6, Leonardo uses .container-14
    const descContainer = card.querySelector(".container-6:not(.comments-content), .container-14:not(.comments-content)");
    const commentsContainer = card.querySelector(".comments-content");

    if (aboutTab && commentsTab && descContainer && commentsContainer) {
      aboutTab.addEventListener("click", () => {
        aboutTab.setAttribute("aria-selected", "true");
        commentsTab.setAttribute("aria-selected", "false");
        descContainer.style.display = "flex";
        commentsContainer.style.display = "none";
      });

      commentsTab.addEventListener("click", () => {
        aboutTab.setAttribute("aria-selected", "false");
        commentsTab.setAttribute("aria-selected", "true");
        descContainer.style.display = "none";
        commentsContainer.style.display = "flex";
      });
    }

    let ticking = false;

    // Smooth hover physics tracking the mouse position
    card.addEventListener("pointermove", (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Convert mouse coordinate offsets to percentage positions
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;

          // Calculate offset from center (-50% to +50%)
          const deltaX = percentX - 50;
          const deltaY = percentY - 50;

          // Subtle tilt rotation multipliers (keeps effect premium and soft)
          const rotateFactor = 0.25;
          const rX = -(deltaX / 3.5) * rotateFactor;
          const rY = (deltaY / 2.0) * rotateFactor;

          // Update CSS custom properties on the card element
          card.style.setProperty("--r-x", `${rX}deg`);
          card.style.setProperty("--r-y", `${rY}deg`);
          card.style.setProperty("--m-x", `${percentX}%`);
          card.style.setProperty("--m-y", `${percentY}%`);

          ticking = false;
        });
        ticking = true;
      }
    });

    // Reset card transition properties to instant follow on pointer enter
    card.addEventListener("pointerenter", () => {
      card.style.setProperty("--duration", "0s");
    });

    // Smoothly animate back to center state on pointer leave
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--duration");
      card.style.setProperty("--r-x", "0deg");
      card.style.setProperty("--r-y", "0deg");
    });
  });
});
