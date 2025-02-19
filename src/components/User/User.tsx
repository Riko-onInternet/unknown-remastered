import "./style.css";

import { useState } from "react";

// ----- HeroUI
import {
  // Altro
  useDisclosure,

  // Drawer
  Drawer,
  DrawerContent,
  DrawerBody,

  // Avatar
  Avatar,

  // Divider
  Divider,

  // Modal
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,

  // Button
  Button,
} from "@heroui/react";

// NextJS
import Image from "next/image";
import profilePics from "@/db/db_pic_profile.json";

// Icons
import { User, CheckCheck, CircleHelp, Settings2 } from "lucide-react";

const menu_account = [
  {
    name: "Profilo",
    icon: User,
    href: "/account",
  },
  {
    name: "Lista",
    icon: CheckCheck,
    href: "/list",
  },
  {
    name: "F.A.Q",
    icon: CircleHelp,
    href: "/faq",
  },
];

const menu_class =
  "w-full inline-flex gap-2 justify-start items-center min-h-10 text-sm px-2 rounded-md menu_link";

// Funzione per vedere se il sito viene caricato su Chrome Desktop
function isChromeDesktop() {
  return (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor) &&
    !/Mobile/.test(navigator.userAgent)
  );
}

export default function UserComponent() {
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenPicProfile,
    onOpen: onOpenPicProfile,
    onOpenChange: onOpenChangePicProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenOptions,
    onOpen: onOpenOptions,
    onOpenChange: onOpenChangeOptions,
  } = useDisclosure();

  const [selectedAvatar, setSelectedAvatar] = useState(
    "/img/profile/default.png"
  );

  // Funzione per mettere il padding a destra all'header
  function PaddingOpen() {
    if (isChromeDesktop()) {
      const header = document.querySelector("header");

      if (header) {
        header.classList.add("pr-[17px]");
      } else {
        console.warn("Elemento 'header' non trovato");
      }
    }

    onOpenProfile();
  }

  // Funzione per rimuovere il padding a destra all'header
  function PaddingClose() {
    if (isChromeDesktop()) {
      const header = document.querySelector("header");

      if (header) {
        header.classList.remove("pr-[17px]");
      } else {
        console.warn("Elemento 'header' non trovato");
      }
    }

    onCloseProfile();
  }

  // Funzione per gestire la selezione dell'avatar
  const handleAvatarSelect = (src: string) => {
    setSelectedAvatar(src);
    onOpenChangePicProfile();
  };

  return (
    <>
      <button
        onClick={PaddingOpen}
        className="flex items-center gap-3 p-2 rounded-full md:rounded-md"
      >
        <Avatar
          name="Utente"
          isBordered
          className="ring-[rgb(var(--unknown-primary))]"
          size="sm"
          src={selectedAvatar}
        />
        <span className="hidden md:block">Utente</span>
      </button>
      <Drawer
        size="xs"
        backdrop="blur"
        isOpen={isOpenProfile}
        onOpenChange={isOpenProfile ? PaddingClose : PaddingOpen}
      >
        <DrawerContent className="bg-[rgb(var(--unknown-background-secondary))] outline-1 outline-offset-0 outline-zinc-500/50 rounded-none">
          <DrawerBody className="pt-4">
            {/* Cambio immagine */}
            <>
              <button
                onClick={onOpenPicProfile}
                title="Cambia l'avatar"
                className="pt-4 pb-1 px-4 rounded-xl w-max mx-auto"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative size-20">
                    <Image
                      fill
                      src={selectedAvatar}
                      alt="img_pic"
                      className="rounded-full outline-4 outline outline-primary outline-offset-2"
                    />
                  </div>
                  <p>Benvenuto utente!</p>
                </div>
              </button>
              <Modal
                isOpen={isOpenPicProfile}
                onOpenChange={onOpenChangePicProfile}
                backdrop="blur"
                placement="top-center"
                size="xl"
              >
                <ModalContent className="bg-[rgb(var(--unknown-background-secondary))]">
                  <ModalHeader className="flex justify-center">
                    Cambia l&apos;avatar
                  </ModalHeader>
                  <ModalBody className="p-0 max-h-full h-full overflow-y-auto">
                    <div className="flex flex-col gap-6 max-w-full w-full select-none">
                      {profilePics.pic.map((category) => (
                        <div key={category.id} className="flex flex-col w-full">
                          <p className="text-lg font-semibold mb-2 px-6">
                            {category.name}
                          </p>
                          <div className="flex items-start px-4 overflow-x-auto scroll-unknown">
                            {category.data.map((pic) => (
                              <button
                                key={pic.name}
                                onClick={() => handleAvatarSelect(pic.src)}
                                className="p-2 rounded-lg flex flex-col items-center justify-center gap-2"
                              >
                                <div className="relative size-24 mx-auto">
                                  <Image
                                    fill
                                    src={pic.src}
                                    alt={pic.name}
                                    className={`rounded-full transition-all duration-200 ${
                                      selectedAvatar === pic.src
                                        ? "outline-4 outline outline-primary outline-offset-2"
                                        : ""
                                    }`}
                                  />
                                </div>
                                <p className="text-sm">{pic.name}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>

            <Divider className="my-2" />

            {/* Tasti iscrizione e registrazione */}
            <div className="flex items-center gap-2 w-full">
              <Button
                className="w-full border-[rgb(var(--unknown-primary))] text-[rgb(var(--unknown-primary))] button_login"
                variant="ghost"
                radius="full"
              >
                Login
              </Button>
              <Button
                className="w-full bg-[rgb(var(--unknown-primary))] rounded-full"
                radius="full"
              >
                Registrati
              </Button>
            </div>

            <Divider className="my-2" />

            {/* Menu utente */}
            <div className="w-full flex flex-col items-center">
              <ul className="w-full flex flex-col items-center">
                {menu_account.map((menu, index) => (
                  <li key={index} className="w-full">
                    <a href={menu.href} className={menu_class}>
                      <menu.icon />
                      <span>{menu.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <button className={menu_class} onClick={onOpenOptions}>
                <Settings2 />
                <span>Impostazioni</span>
              </button>
              <Modal
                isOpen={isOpenOptions}
                onOpenChange={onOpenChangeOptions}
                backdrop="blur"
                placement="top-center"
                size="xl"
              >
                <ModalContent>
                  <ModalHeader>Impostazioni</ModalHeader>
                  <ModalBody></ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
