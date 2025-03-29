"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import Image from "next/image";

import "./style.css";

interface SliderProps {
  children: ReactNode;
}

export function Slider({ children }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Stato per gestire gli eventi touch
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Stato per gestire gli eventi mouse
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  // Soglia minima per considerare un swipe valido (in pixel)
  const minSwipeDistance = 50;

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? childrenArray.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Gestione eventi touch
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Gestione eventi mouse
  const onMouseDown = (e: React.MouseEvent) => {
    // Rimuovi e.preventDefault() qui perché può interferire con alcuni browser
    setIsDragging(true);
    setStartX(e.clientX);
    setEndX(e.clientX); // Inizializza endX con lo stesso valore di startX
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      // Rimuovi e.preventDefault() qui
      setEndX(e.clientX);
    }
  };

  const onMouseUp = (/* e: React.MouseEvent */) => {
    if (isDragging) {
      // Rimuovi e.preventDefault() qui
      const distance = startX - endX;

      // Verifica che ci sia stato un movimento significativo
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }

      setIsDragging(false);
    }
  };

  // Aggiungi un gestore per il click per evitare conflitti con il drag
  const handleClick = (index: number) => {
    if (Math.abs(startX - endX) < minSwipeDistance) {
      setActiveIndex(index);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  // Aggiungi un effetto per il debug
  useEffect(() => {
    console.log("Active Index:", activeIndex);
  }, [activeIndex]);

  return (
    <div className="py-6">
      {/* Slider */}
      <div
        className="relative touch-pan-y w-full px-4 overflow-x-clip z-0 h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px]"
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {React.Children.map(children, (child, index) => {
            // Calcola la posizione relativa rispetto all'elemento attivo
            let position = index - activeIndex;

            // Gestisci il wrapping per creare un effetto circolare
            if (position < -Math.floor(childrenArray.length / 2))
              position += childrenArray.length;
            if (position > Math.floor(childrenArray.length / 2))
              position -= childrenArray.length;

            // Determina la visibilità in base alla posizione
            let visibility = "hidden";
            if (position >= -1 && position <= 1) {
              visibility = "visible";
            }

            // Assegna la classe in base alla posizione
            const className = `slider-item-wrapper absolute max-w-[1400px] w-full max-h-[500px] h-full z-0 opacity-0 pointer-events-none position-${position} visibility-${visibility}`;

            return (
              <div
                className={className}
                onClick={() => handleClick(index)}
                key={index}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
      {/* Indicatori di navigazione */}
      <div className="flex items-center justify-center gap-2 mt-4 h-2.5">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            className={`slider-indicator w-2.5 h-2.5 rounded-full bg-[rgba(var(--unknown-primary-hover),0.5)] border-0 p-0 cursor-pointer transition-all duration-300 ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Vai alla slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SliderItem({
  backgroundImage,
  logo,
  text,
  name,
  onClick,
}: {
  backgroundImage: string;
  logo: string;
  text: string;
  name?: string;
  onClick?: () => void;
}) {
  // Aggiungiamo stato per tracciare il movimento del mouse/touch
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  
  // Soglia per considerare un movimento come drag invece di click
  const moveThreshold = 10; // pixel
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setIsMoving(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.abs(e.clientX - startPos.x) > moveThreshold || 
        Math.abs(e.clientY - startPos.y) > moveThreshold) {
      setIsMoving(true);
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMoving && onClick) {
      e.stopPropagation();
      onClick();
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setIsMoving(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (Math.abs(touch.clientX - startPos.x) > moveThreshold || 
        Math.abs(touch.clientY - startPos.y) > moveThreshold) {
      setIsMoving(true);
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMoving && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div 
      className="slider-item w-full h-max overflow-hidden flex flex-col"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute z-10 inset-0 h-full">
        <div className="flex flex-col items-start justify-end h-full p-4 sm:p-6 md:p-8 xl:p-10 gradient">
          <div className="w-[40%] h-full">
            <div className="w-full h-full flex items-center justify-start">
              <Image
                width={400}
                height={300}
                src={logo}
                alt={name || ""}
                className="!object-contain"
              />
            </div>
          </div>
          <p className="line-clamp-1 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl w-full md:w-1/2">
            {text}
          </p>
        </div>
      </div>
      <Image
        src={backgroundImage}
        alt={name || ""}
        fill
        className="background-slider"
      />
    </div>
  );
}
