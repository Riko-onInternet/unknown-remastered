/* eslint-disable @next/next/no-img-element */
import "./style.css";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@heroui/react";
import { databaseContent } from "@/db/databse_content";
import { Star, Play, ChevronDown } from "lucide-react";
import { ContentItem } from "@/types/content";

// Classi personalizzate
const titlePanoramica =
  "text-xl font-bold mb-1 text-[rgb(var(--unknown-primary))]";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

// Funzione per vedere se il sito viene caricato su Chrome Desktop
function isChromeDesktop() {
  return (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor) &&
    !/Mobile/.test(navigator.userAgent)
  );
}

// Funzione per calcolare la larghezza della scrollbar
function getScrollbarWidth() {
  // Crea un div con scrollbar
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  // Crea un div interno
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calcola la differenza di larghezza
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Rimuovi i div creati
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

// Hook personalizzato per rilevare la dimensione della finestra
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler per aggiornare lo stato
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Aggiungi event listener
    window.addEventListener("resize", handleResize);

    // Chiama handler subito per impostare lo stato iniziale
    handleResize();

    // Rimuovi event listener al cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array vuoto significa che questo useEffect viene eseguito solo una volta

  return windowSize;
}

export default function ContentModal({
  isOpen,
  onClose,
  contentId,
}: ModalProps) {
  // Ottieni la dimensione della finestra (deve essere chiamato prima di qualsiasi return)
  const windowSize = useWindowSize();

  // Stato per memorizzare il contenuto selezionato
  const [content, setContent] = useState<ContentItem | null>(null);
  // Stato per memorizzare la stagione selezionata
  const [selectedSeason, setSelectedSeason] = useState<number | null>(0);

  // useState per gestire i loaded delle immagini
  const [imageBackgroundModal, setImageBackgroundModal] = useState<boolean[]>([
    false,
  ]);
  const [imageAutorsModal, setImageAutorsModal] = useState<boolean[]>([false]);
  const [imageEpisodesModal, setImageEpisodesModal] = useState<boolean[]>([
    false,
  ]);

  // Effetto per caricare il contenuto quando cambia contentId
  useEffect(() => {
    if (contentId) {
      const selectedContent = databaseContent.find(
        (item) => item.id === contentId
      );
      setContent(
        selectedContent
          ? {
              ...selectedContent,
              year: selectedContent.year.map((y) => ({
                start: Number(y.start),
                end: y.end ? Number(y.end) : undefined,
                status: y.status as "finished" | "ongoing",
              })),
              rate: Number(selectedContent.rate),
              content: selectedContent.content?.map((season) => ({
                season: season.season,
                episodes: season.episodes.map((episode) => ({
                  numberEP: episode.numberEP,
                  title: episode.title,
                  id: episode.id,
                  desc: episode.desc,
                  minutes: episode.minutes,
                  img: episode.img,
                  status: episode.status as "Online" | "Offline",
                })),
              })),
            }
          : null
      );
    }
  }, [contentId]);

  // Effetto per gestire il padding dell'header quando il modale è aperto
  useEffect(() => {
    if (isOpen && isChromeDesktop()) {
      const header = document.querySelector("header");
      if (header) {
        const scrollbarWidth = getScrollbarWidth();
        header.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else if (isChromeDesktop()) {
      const header = document.querySelector("header");
      if (header) {
        header.style.paddingRight = "0px";
      }
    }
  }, [isOpen]);

  // Effetto per inizializzare l'array imageEpisodesModal quando cambia il contenuto o la stagione
  useEffect(() => {
    if (content && content.content && selectedSeason !== null) {
      const episodesCount =
        content.content[selectedSeason]?.episodes?.length || 0;
      // Inizializza l'array con tutti i valori a false
      setImageEpisodesModal(new Array(episodesCount).fill(false));
      console.log(`Inizializzato array imageEpisodesModal per stagione ${selectedSeason + 1} con ${episodesCount} episodi`);
    }
  }, [content, selectedSeason]);

  // Effetto per inizializzare l'array imageBackgroundModal quando cambia il contenuto:
  useEffect(() => {
    if (content) {
      setImageBackgroundModal([false]);
    }
  }, [content]);

  // Determina la dimensione dei tab in base alla larghezza della finestra
  const getTabSize = () => {
    if (windowSize.width < 640) {
      return "sm";
    } else {
      return "md";
    }
  };

  if (!content) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        placement="top"
        backdrop="blur"
        scrollBehavior="outside"
        className="focus-visible:!outline-none bg-[rgb(var(--unknown-background))] overflow-hidden mt-1"
      >
        <ModalContent>
          <ModalBody className="p-0">
            {/* Top (Background, Title IMG, Rateing) */}
            <div className="w-full h-[400px] relative z-0">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 opacity-50">
                <Skeleton isLoaded={imageBackgroundModal[0]} className="bg">
                  <img
                    src={content.backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      console.log("Immagine di sfondo caricata");
                      setImageBackgroundModal([true]);
                    }}
                  />
                </Skeleton>
              </div>

              {/* Infos */}
              <div className="absolute bottom-0 w-full pl-6">
                <div className="flex flex-col gap-4 mb-6">
                  {/* Logo */}
                  <div className="w-[200px] md:w-[250px]">
                    <img
                      src={"/img/logo/" + content.id + ".png"}
                      alt={content.name}
                    />
                  </div>

                  {/* Rating */}
                  <a
                    className="flex items-center gap-2 w-max"
                    href={`https://www.imdb.com/title/${content.imdbID}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${content.name} su IMDb`}
                  >
                    <Star className="fill-[rgb(var(--unknown-imdb))] text-[rgb(var(--unknown-imdb))]" />
                    <p>{content.rate.toFixed(1)}/10</p>
                    <div className="w-[40px] h-max">
                      <img src="/img/imdb.png" alt="IMDb" />
                    </div>
                  </a>

                  {/* Autori/e */}
                  <div className="flex flex-wrap gap-3">
                    {content.autors.map((autor, index) => (
                      <a
                        key={index}
                        /* href={`/autore/${autor.name}`} */
                        className="flex flex-row items-center gap-2 w-max"
                      >
                        <Skeleton
                          isLoaded={imageAutorsModal[index]}
                          className="size-10 rounded-full"
                        >
                          <img
                            src={autor.img}
                            alt={autor.name}
                            className="size-10 rounded-full"
                            onLoad={() => {
                              console.log(
                                `Immagine autore ${autor.name} caricata`
                              );
                              setImageAutorsModal((prev) => {
                                const newState = [...prev];
                                newState[index] = true;
                                return newState;
                              });
                            }}
                          />
                        </Skeleton>
                        <p>{autor.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom (Synopsis, Genres, Year, etc.) */}
            <div className="w-full relative z-0 flex flex-col items-center">
              {/* Tabs */}
              <Tabs
                aria-label="Tab"
                className="mx-auto px-2"
                size={getTabSize()}
              >
                {content.tabs.map((item) => (
                  <Tab
                    key={item.title.toLocaleLowerCase()}
                    title={item.title}
                    className="w-full"
                  >
                    {/* Panoramica */}
                    {item.title === "Panoramica" && (
                      <div className="p-2 sm:p-4 flex flex-col gap-4">
                        {/* Stagioni */}
                        <div>
                          <p className={titlePanoramica}>Stagioni</p>
                          <p className="text-sm md:text-base">
                            {content.seasons <= 1 ? (
                              <>{content.seasons} Stagione</>
                            ) : (
                              <>{content.seasons} Stagioni</>
                            )}
                          </p>
                        </div>

                        {/* Anno */}
                        <div>
                          <p className={titlePanoramica}>Anno</p>
                          <p className="text-sm md:text-base">
                            {content.year.map((year, idx) => (
                              <span key={idx}>
                                {year.start}
                                {year.end ? ` - ${year.end}` : ""}
                              </span>
                            ))}
                          </p>
                        </div>

                        {/* Sinossi */}
                        <div>
                          <p className={titlePanoramica}>Sinossi</p>
                          <p className="text-sm md:text-base">
                            {content.synopsis}
                          </p>
                        </div>

                        {/* Generi */}
                        <div>
                          <p className={titlePanoramica}>Generi</p>
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {content.genres.map((genre, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-[rgba(var(--unknown-primary),0.2)] rounded-full text-sm"
                              >
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Cast */}
                        <div>
                          <p className={titlePanoramica}>Cast</p>
                          <div className="flex flex-wrap gap-2 mt-2.5">
                            {content.cast.map((cast, idx) => (
                              <a
                                href={`https://www.imdb.com/name/${cast.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={idx}
                                className="px-3 py-1 bg-[rgba(var(--unknown-primary),0.2)] rounded-full text-sm"
                              >
                                {cast.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Episodi */}
                    {item.title === "Episodi" && (
                      <div className="p-4 pt-0">
                        {/* Dropdown delle season */}
                        {content.content &&
                        selectedSeason !== null &&
                        selectedSeason <= 1 ? (
                          <div className="w-full flex justify-end items-center my-2">
                            <Dropdown
                              showArrow
                              classNames={{
                                content:
                                  "max-w-[150px] min-w-[130px] rounded-lg",
                              }}
                            >
                              <DropdownTrigger>
                                <button className="px-4 py-2 bg-[rgba(var(--unknown-primary),0.2)] rounded-lg flex items-center gap-2">
                                  Stagione{" "}
                                  {content.content && content.content.length > 0
                                    ? selectedSeason !== null
                                      ? selectedSeason + 1
                                      : 1
                                    : 1}
                                  <ChevronDown size={16} />
                                </button>
                              </DropdownTrigger>
                              <DropdownMenu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={
                                  selectedSeason !== null
                                    ? [`${selectedSeason}`]
                                    : []
                                }
                                onSelectionChange={(keys) => {
                                  const selected = Array.from(keys)[0];
                                  if (selected) {
                                    const newSeason = Number(selected);
                                    // Resetta lo stato delle immagini prima di cambiare stagione
                                    if (content && content.content) {
                                      const episodesCount = content.content[newSeason]?.episodes?.length || 0;
                                      setImageEpisodesModal(new Array(episodesCount).fill(false));
                                    }
                                    setSelectedSeason(newSeason);
                                  }
                                }}
                              >
                                {content.content?.map((season, idx) => (
                                  <DropdownItem
                                    key={idx}
                                    className={
                                      selectedSeason === idx
                                        ? "text-[rgb(var(--unknown-primary))]"
                                        : ""
                                    }
                                  >
                                    Stagione {season.season}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        ) : null}

                        {/* Lista degli episodi */}
                        {content.content &&
                          (selectedSeason !== null ? (
                            <div className="flex flex-col w-full mt-4 gap-4">
                              {content.content[selectedSeason].episodes.map(
                                (episode, episodeIdx) => (
                                  <div
                                    key={episodeIdx}
                                    className="p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg bg-[rgba(var(--unknown-background-secondary),0.5)]"
                                  >
                                    <p className="hidden sm:block text-3xl">
                                      {episode.numberEP}
                                    </p>
                                    <div className="aspect-video relative rounded-md overflow-hidden">
                                      <Skeleton
                                        isLoaded={
                                          imageEpisodesModal[episodeIdx]
                                        }
                                      >
                                        <img
                                          src={episode.img}
                                          alt={episode.title}
                                          className="w-full max-w-[567px] sm:w-[150px] h-full object-cover sm:object-contain"
                                          onLoad={() => {
                                            console.log(
                                              `Immagine episodio ${
                                                episodeIdx + 1
                                              } caricata`
                                            );
                                            setImageEpisodesModal((prev) => {
                                              const newState = [...prev];
                                              newState[episodeIdx] = true;
                                              return newState;
                                            });
                                          }}
                                        />
                                      </Skeleton>
                                    </div>
                                    <div className="flex flex-col gap-1 sm:gap-2 sm:w-[calc(100%-150px)]">
                                      <p className="font-medium sm:flex sm:items-center sm:justify-between">
                                        <span>
                                          <span className="sm:hidden">
                                            {episode.numberEP}.{" "}
                                          </span>
                                          <span>{episode.title}</span>
                                        </span>
                                        <span className="text-sm opacity-60">
                                          {episode.minutes}min
                                        </span>
                                      </p>
                                      <p className="text-sm opacity-60 sm:hidden">
                                        {episode.minutes}min
                                      </p>
                                      <p className="text-xs sm:line-clamp-2 opacity-70">
                                        {episode.desc}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : null)}
                      </div>
                    )}

                    {/* Trailer */}
                    {item.title === "Trailer" && (
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-3">Trailer</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.trailer?.map((trailer, idx) => (
                            <a
                              key={idx}
                              href={trailer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative aspect-video rounded-lg overflow-hidden group"
                            >
                              <img
                                src={trailer.img}
                                alt={trailer.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Play size={48} className="text-white" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                <p className="text-white">{trailer.title}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Audio e Sottotitoli */}
                    {item.title === "Audio" && (
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-3">
                          Audio disponibili
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {content.audio?.map((audio, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-[rgba(var(--unknown-background-secondary),0.5)] rounded-lg"
                            >
                              {audio.name}
                            </div>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold mb-3 mt-6">
                          Sottotitoli disponibili
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {content.subtitle?.map((sub, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-[rgba(var(--unknown-background-secondary),0.5)] rounded-lg"
                            >
                              {sub.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
