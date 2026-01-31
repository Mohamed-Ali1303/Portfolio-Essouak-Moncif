// Menu mobile
const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Fermer le menu quand on clique un lien
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Animation "reveal" au scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// Filtre expériences (petit côté dynamique, sans faire “tech”)
const chips = document.querySelectorAll(".chip");
const expCards = document.querySelectorAll("#expCards .card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    expCards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "" : "none";
    });
  });
});

// Form "copier message" (utile sur GitHub Pages)
const fakeForm = document.getElementById("fakeForm");
if (fakeForm) {
  fakeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = fakeForm.querySelector('input[type="text"]').value.trim();
    const msg = fakeForm.querySelector("textarea").value.trim();

    const content = `Nom: ${name || "(non renseigné)"}\n\nMessage:\n${msg || "(vide)"}`;
    try {
      await navigator.clipboard.writeText(content);
      alert("Message copié ! Vous pouvez le coller dans un email.");
    } catch {
      alert("Impossible de copier automatiquement. Sélectionnez et copiez manuellement.");
    }
  });
}

// Année footer
document.getElementById("year").textContent = new Date().getFullYear();
