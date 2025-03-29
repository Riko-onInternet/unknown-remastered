"use client";

import Header from "@/components/Header";
import { Slider, SliderItem } from "@/components/Slider";

export default function Home() {
  return (
    <>
      <Header />
      <Slider>
        <SliderItem
          backgroundImage="/img/carousel/murder_drones.avif"
          name="Murder Drones"
          text="Tutta la serie completa!"
          logo="/img/carousel/logos/murder_drones.png"
          onClick={() => console.log("Murder Drones aperto!")}
          />
        <SliderItem
          backgroundImage="/img/carousel/tadc.jpg"
          name="The Amazing Digital Circus"
          text="Il quarto episodio è uscito!"
          logo="/img/carousel/logos/tadc.png"
          onClick={() => console.log("TADC aperto!")}
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
    </>
  );
}
