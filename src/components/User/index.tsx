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
  ModalFooter,

  // Button
  Button,

  // Select
  Select,
  SelectItem,

  // Tooltip
  Tooltip,

  // Switch
  Switch,
} from "@heroui/react";

// NextJS
import Image from "next/image";
import profilePics from "@/db/db_pic_profile.json";

// Icons
import {
  User,
  CheckCheck,
  CircleHelp,
  Settings2,
  Info,
  Trash2,
} from "lucide-react";

const menu_account = [
  {
    name: "Profilo",
    icon: User,
    href: "/account",
  },
  {
    name: "Lista",
    icon: CheckCheck,
    href: "/account/list",
  },
  {
    name: "F.A.Q",
    icon: CircleHelp,
    href: "/faq",
  },
];

const menu_class =
  "w-full inline-flex gap-2 justify-start items-center min-h-10 text-sm px-2 rounded-md menu_link";

const account_class_container = "p-4 bg-neutral-700/40 rounded-md";
const account_class_content = "w-full flex items-center justify-between";

const linguage = [
  {
    code: "it",
    name: "Italiano",
    native: "Italiano",
  },
  {
    code: "en",
    name: "Inglese",
    native: "English",
  },
  {
    code: "es",
    name: "Spagnolo",
    native: "Español",
  },
  {
    code: "de",
    name: "Tedesco",
    native: "Deutsch",
  },
  {
    code: "fr",
    name: "Francese",
    native: "Français",
  },
  {
    code: "jp",
    name: "Giapponese",
    native: "日本語",
  },
  {
    code: "kr",
    name: "Coreano",
    native: "한국어",
  },
  {
    code: "cn",
    name: "Cinese",
    native: "中文",
  },
];

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
  const {
    isOpen: isOpenDelateCookie,
    onOpen: onOpenDelateCookie,
    onOpenChange: onOpenChangeDelateCookie,
  } = useDisclosure();

  const [selectedAvatar, setSelectedAvatar] = useState(
    "/img/profile/default.png"
  );

  const [openTooltip, setOpenTooltip] = useState(false);

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
                size="lg"
              >
                <ModalContent className="bg-[rgb(var(--unknown-background-secondary))]">
                  <ModalHeader className="justify-center">
                    Impostazioni
                  </ModalHeader>
                  <ModalBody className="flex flex-col items-start">
                    {/* Account */}
                    <div className="w-full">
                      <div className="w-full flex items-baseline justify-between leading-none">
                        <p className="text-xl font-bold">Account</p>
                        <a
                          href="/accont_modify"
                          className="hover:underline text-xs opacity-50"
                        >
                          Modifica
                        </a>
                      </div>
                      <Divider className="mt-1 mb-3" />

                      <div className="flex flex-col gap-2 w-full relative">
                        {/* Email */}
                        <div className={account_class_container}>
                          <div className={account_class_content}>
                            <span className="opacity-70">Email:</span>
                            <span>and***.com</span>
                          </div>
                        </div>

                        {/* Username */}
                        <div className={account_class_container}>
                          <div className={account_class_content}>
                            <span className="opacity-70">Username:</span>
                            <span>riko_oninternet</span>
                          </div>
                        </div>

                        {/* Display Name */}
                        <div className={account_class_container}>
                          <div className={account_class_content}>
                            <span className="opacity-70">Nome schermo:</span>
                            <span>Riko</span>
                          </div>
                        </div>

                        {/* censura dei dati */}
                        <div className="absolute inset-0">
                          <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur">
                            <p className="font-medium mb-2 text-center">
                              Accedi o registrati per vedere i dettagli
                            </p>
                            <div className="flex items-center justify-center gap-2 w-full">
                              <Button
                                className="border-[rgb(var(--unknown-primary))] text-[rgb(var(--unknown-primary))] button_login"
                                variant="ghost"
                                radius="full"
                                size="sm"
                              >
                                Accedi
                              </Button>
                              <Button
                                size="sm"
                                className="bg-[rgb(var(--unknown-primary))]"
                                radius="full"
                              >
                                Registrati
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stream */}
                    <div className="w-full mt-2">
                      {/* Title */}
                      <div className="w-full flex items-baseline justify-start leading-none">
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold">Stream</p>

                          {/* Flare Beta */}
                          <span className="text-xs bg-[rgb(var(--unknown-background))] py-1 px-2 rounded-md text-[rgb(var(--unknown-primary))] select-none">
                            Beta
                          </span>

                          <Tooltip
                            content={
                              <div className="max-w-[200px] p-1">
                                Questa funzione ti permette di selezionare due
                                lingue, che appariranno in primo piano tra le
                                opzioni disponibili.
                              </div>
                            }
                            className="bg-[rgb(var(--unknown-background))]"
                            placement="right"
                            delay={0}
                            closeDelay={0}
                            showArrow={true}
                            isOpen={openTooltip}
                            onOpenChange={setOpenTooltip}
                          >
                            <button
                              onClick={() => setOpenTooltip(!openTooltip)}
                              className="cursor-default"
                            >
                              <Info className="opacity-50" size={16} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                      <Divider className="mt-1 mb-3" />

                      {/* Impostazioni */}
                      <div className="w-full flex flex-col items-center">
                        {/* Audio */}
                        <div className="px-4 w-full mt-2">
                          {/* Subtitle */}
                          <p className="text-lg leading-none">Audio</p>
                          <Divider className="my-2" />

                          {/* Select */}
                          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
                            <div className="w-full">
                              <label
                                htmlFor="audio_primario"
                                className="text-sm"
                              >
                                Primario
                              </label>
                              <Select
                                className="w-full"
                                id="audio_primario"
                                defaultSelectedKeys={["it"]}
                              >
                                {linguage.map((lang) => (
                                  <SelectItem
                                    key={lang.code}
                                    value={lang.code}
                                    textValue={lang.name + ` (${lang.native})`}
                                  >
                                    {lang.name} ({lang.native})
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                            <div className="w-full">
                              <label
                                htmlFor="audio_secondario"
                                className="text-sm"
                              >
                                Secondario
                              </label>
                              <Select
                                className="w-full"
                                id="audio_secondario"
                                defaultSelectedKeys={["none"]}
                              >
                                <SelectItem
                                  key={"none"}
                                  value={"none"}
                                  textValue={"Nessuno"}
                                >
                                  Nessuno
                                </SelectItem>
                                <>
                                  {linguage.map((lang) => (
                                    <SelectItem
                                      key={lang.code}
                                      value={lang.code}
                                      textValue={
                                        lang.name + ` (${lang.native})`
                                      }
                                    >
                                      {lang.name} ({lang.native})
                                    </SelectItem>
                                  ))}
                                </>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Sotttitoli */}
                        <div className="px-4 w-full mt-6">
                          {/* Subtitle */}
                          <p className="text-lg leading-none">Sottotitoli</p>
                          <Divider className="my-2" />

                          {/* Select */}
                          <div className="flex flex-col sm:flex-row items-center w-full gap-4">
                            <div className="w-full">
                              <label
                                htmlFor="audio_primario"
                                className="text-sm"
                              >
                                Primario
                              </label>
                              <Select
                                className="w-full"
                                id="audio_primario"
                                defaultSelectedKeys={["it"]}
                              >
                                {linguage.map((lang) => (
                                  <SelectItem
                                    key={lang.code}
                                    value={lang.code}
                                    textValue={lang.name + ` (${lang.native})`}
                                  >
                                    {lang.name} ({lang.native})
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                            <div className="w-full">
                              <label
                                htmlFor="audio_secondario"
                                className="text-sm"
                              >
                                Secondario
                              </label>
                              <Select
                                className="w-full"
                                id="audio_secondario"
                                defaultSelectedKeys={["none"]}
                              >
                                <SelectItem
                                  key={"none"}
                                  value={"none"}
                                  textValue={"Nessuno"}
                                >
                                  Nessuno
                                </SelectItem>
                                <>
                                  {linguage.map((lang) => (
                                    <SelectItem
                                      key={lang.code}
                                      value={lang.code}
                                      textValue={
                                        lang.name + ` (${lang.native})`
                                      }
                                    >
                                      {lang.name} ({lang.native})
                                    </SelectItem>
                                  ))}
                                </>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-4 w-full flex items-center justify-between"></div>

                          <div className={account_class_container}>
                            <div className={account_class_content}>
                              <span>Attivazione automatica</span>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cookie */}
                    <div className="w-full mt-2">
                      <p className="text-xl font-bold">Cookies</p>
                      <Divider className="mt-1 mb-3" />

                      {/* -- Da sistemare -- */}
                      <div className="hidden">
                        <div className={account_class_container}>
                          <div className={account_class_content}>
                            <span>Accettazione Cookie</span>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button
                          fullWidth
                          variant="ghost"
                          startContent={<Trash2 size={20} />}
                          className="justify-start border-0 bg-danger/20 data-[hover=true]:!bg-danger/50"
                          onPress={onOpenDelateCookie}
                        >
                          Elimina i dati dei cookie
                        </Button>
                        <Modal
                          isOpen={isOpenDelateCookie}
                          onOpenChange={onOpenChangeDelateCookie}
                        >
                          <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">
                              Vuoi eliminare tutti i cookie?
                            </ModalHeader>
                            <ModalBody>
                              <p>Questa azione è irreversibile</p>
                            </ModalBody>
                            <ModalFooter>
                              <Button variant="ghost" onPress={onOpenChangeDelateCookie}>Annulla</Button>
                              <Button color="danger">Elimina</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
