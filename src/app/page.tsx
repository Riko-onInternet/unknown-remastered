"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Slider, SliderItem } from "@/components/Slider";
import ContentModal from "@/components/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState("");

  const handleOpenModal = (id: string) => {
    setSelectedContentId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <Slider>
        <SliderItem
          backgroundImage="/img/carousel/murder_drones.avif"
          name="Murder Drones"
          text="Tutta la serie completa!"
          logo="/img/carousel/logos/murder_drones.png"
          onClick={() => handleOpenModal("murderdrones")}
        />
        <SliderItem
          backgroundImage="/img/carousel/tadc.jpg"
          name="The Amazing Digital Circus"
          text="Il quarto episodio è uscito!"
          logo="/img/carousel/logos/tadc.png"
          onClick={() => handleOpenModal("tadc")}
        />
        <SliderItem
          backgroundImage="/img/carousel/midnight_gospel.avif"
          name="The Midnight Gospel"
          text="Tutta la serie completa!"
          logo="/img/carousel/logos/midnight_gospel.png"
          onClick={() => console.log("The Midnight Gospel aperto!")}
        />
        <SliderItem
          backgroundImage="/img/carousel/arcane.avif"
          name="Arcane: League of Legends"
          text="Tutta la serie completa!"
          logo="/img/carousel/logos/arcane.webp"
          onClick={() => console.log("Arcane aperto!")}
        />
        <SliderItem
          backgroundImage="/img/carousel/shera.avif"
          name="Arcane: League of Legends"
          text="Tutta la serie completa!"
          logo="/img/carousel/logos/shera.png"
          onClick={() => console.log("She-Ra aperto!")}
        />
      </Slider>
      
      <ContentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        contentId={selectedContentId} 
      />
    </>
  );
}
