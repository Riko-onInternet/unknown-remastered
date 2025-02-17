import { Avatar } from "@heroui/react";

// HeroUI
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";

function isChromeDesktop() {
  return (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor) &&
    !/Mobile/.test(navigator.userAgent)
  );
}

export default function User() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Funzione per mettere il padding a destra all'header
  function PaddingOpen() {
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

    onOpen();
  }

  // Funzione per rimuovere il padding a destra all'header
  function PaddingClose() {
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

    onOpenChange();
  }

  return (
    <>
      <button onClick={PaddingOpen}>
        <Avatar
          name="Utente"
          isBordered
          className="ring-[rgb(var(--unknown-primary))]"
          size="sm"
        />
      </button>
      <Drawer isOpen={isOpen} onOpenChange={PaddingClose}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Drawer Title
          </DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
