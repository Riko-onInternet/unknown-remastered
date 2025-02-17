import { Avatar } from "@heroui/react";

/* function isChromeDesktop() {
  return (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor) &&
    !/Mobile/.test(navigator.userAgent)
  );
} */

export default function User() {
  // Funzione per mettere il padding a destra all'header
  /* function PaddingOpen() {
    if (!isChromeDesktop()) {
      console.warn("Funzione disponibile solo per Chrome desktop e derivati");
      return;
    }

    const header = document.querySelector("header");

    if (header) {
      header.classList.add("pr-[17px]");
    } else {
      console.warn("Elemento 'header' non trovato");
    }
  } */

  // Funzione per rimuovere il padding a destra all'header
  /* function PaddingClose() {
    if (!isChromeDesktop()) {
      console.warn("Funzione disponibile solo per Chrome desktop e derivati");
      return;
    }

    const header = document.querySelector("header");

    if (header) {
      header.classList.remove("pr-[17px]");
    } else {
      console.warn("Elemento 'header' non trovato");
    }
  } */

  return (
    <Avatar
      name="Utente"
      isBordered
      className="ring-[rgb(var(--unknown-primary))]"
      size="sm"
    />
  );
}
