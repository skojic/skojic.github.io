// Command menu: ⌘K / Ctrl+K opens it, arrows move, Enter runs, Esc closes.
(() => {
  const dialog = document.querySelector(".palette");
  const input = dialog.querySelector("input");
  const list = dialog.querySelector("#palette-list");
  const status = dialog.querySelector(".status");
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  if (!isMac) document.querySelectorAll("[data-mod]").forEach((el) => { el.textContent = "Ctrl"; });

  const go = (hash) => () => {
    dialog.close();
    document.querySelector(hash).scrollIntoView();
    history.replaceState(null, "", hash);
  };
  const open = (url) => () => { dialog.close(); window.open(url, "_blank", "noopener"); };

  const commands = [
    { group: "Go to", label: "About", run: go("#about") },
    { group: "Go to", label: "Work", run: go("#work") },
    { group: "Go to", label: "Projects", run: go("#projects") },
    { group: "Go to", label: "Talks", run: go("#talks") },
    { group: "Go to", label: "Contact", run: go("#contact") },
    {
      group: "Do", label: "Copy email",
      run: async () => {
        try {
          await navigator.clipboard.writeText("srdjan.m.kojic@gmail.com");
          status.textContent = "Email copied";
          setTimeout(() => dialog.close(), 700);
        } catch {
          dialog.close();
          location.href = "mailto:srdjan.m.kojic@gmail.com";
        }
      },
    },
    { group: "Do", label: "Download CV", run: () => { dialog.close(); location.href = "/Srdjan_Kojic_CV.pdf"; } },
    { group: "Do", label: "Open GitHub", run: open("https://github.com/skojic") },
    { group: "Do", label: "Open LinkedIn", run: open("https://www.linkedin.com/in/srkki") },
  ];

  let shown = [];
  let active = 0;
  let lastFocus = null;

  function render() {
    const q = input.value.trim().toLowerCase();
    shown = commands.filter((c) => c.label.toLowerCase().includes(q));
    active = Math.min(active, Math.max(shown.length - 1, 0));
    list.replaceChildren();

    if (!shown.length) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "Nothing matches. Try “work” or “email”.";
      list.append(li);
      input.removeAttribute("aria-activedescendant");
      return;
    }

    let group = "";
    shown.forEach((c, i) => {
      if (c.group !== group) {
        group = c.group;
        const g = document.createElement("li");
        g.className = "group";
        g.setAttribute("role", "presentation");
        g.textContent = group;
        list.append(g);
      }
      const li = document.createElement("li");
      li.id = `cmd-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === active));
      li.textContent = c.label;
      li.addEventListener("mousemove", () => { if (active !== i) { active = i; render(); } });
      li.addEventListener("click", () => c.run());
      list.append(li);
    });
    input.setAttribute("aria-activedescendant", `cmd-${active}`);
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: "nearest" });
  }

  function show() {
    if (dialog.open) return;
    lastFocus = document.activeElement;
    input.value = "";
    status.textContent = "";
    active = 0;
    render();
    dialog.showModal();
    input.focus();
  }

  document.querySelectorAll("[data-open-palette]").forEach((b) => b.addEventListener("click", show));

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      dialog.open ? dialog.close() : show();
    }
  });

  input.addEventListener("input", () => { active = 0; render(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % (shown.length || 1); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + shown.length) % (shown.length || 1); render(); }
    else if (e.key === "Enter") { e.preventDefault(); shown[active]?.run(); }
  });

  // Return focus to where it was, or off the hidden input.
  dialog.addEventListener("close", () => {
    if (lastFocus && lastFocus !== document.body && document.contains(lastFocus)) lastFocus.focus();
    else document.activeElement?.blur();
  });

  // Clicking the backdrop closes the menu.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
})();
