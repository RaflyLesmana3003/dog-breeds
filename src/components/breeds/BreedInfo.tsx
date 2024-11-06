'use client'

import React, { useEffect, useState, useRef, useCallback } from "react";
import BlurFade from "../../src/components/ui/blur-fade";
import { getBreedImages } from "../../services/breeds/getBreedImages";
import usePagination from "../../hooks/usePagination";
import { genAI } from "../../lib/gemini";
import FlickeringGrid from "../../src/components/ui/flickering-grid";

interface BreedInfoProps {
  breed: string;
  onSelected: (breed: string, imageUrl: string) => void;
  selectButton: React.ReactNode;
}

export function BreedInfo({breed, selectButton, onSelected}: BreedInfoProps) {
    const [allBreedImages, setAllBreedImages] = useState<string[]>([]);
    const [promptResponses, setpromptResponses] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;
  
    const { currentData: visibleImages, currentPage, goToPage, totalPages } = usePagination(allBreedImages, itemsPerPage);
  
    const observer = useRef<IntersectionObserver | null>(null);
    const lastImageRef = useCallback((node: HTMLImageElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          goToPage(currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, [isLoading, currentPage, totalPages, goToPage]);
  
    async function fetchBreedImages() {
      setIsLoading(true);
      try {
        const images = await getBreedImages(breed);
        setAllBreedImages(images);
      } catch (error) {
        console.error('Error fetching breed images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchBreedInfo() {
      setIsLoading(true);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.3
        }, });
        const result = await model.generateContent(`Describe the ${breed} dog breed in detail, including its physical appearance, temperament, typical behavior, and any unique traits. response in plain text html, for example: <section><h3></h3><p></p></section>`);
        const response = await result.response;
        const text = await response.text();
        setpromptResponses(
          text
        );
      } catch (error) {
        console.error('Error fetching breed images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
      fetchBreedImages();
      fetchBreedInfo()
    }, []);
  
    return (
      <section id="photos">
        {promptResponses ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 mt-2" style={{ height: 'fit-content' }}>
            {promptResponses.split('</section>').map((response, index) => {
              if (response.trim()) {
                return (
                  <BlurFade 
                      delay={0.25 * 0.05} 
                      inView
                    >
                  <section
                    key={index}
                    className="p-4 border border-gray-300 rounded-md h-full"
                    dangerouslySetInnerHTML={{ __html: response + '</section>' }}
                  />
                </BlurFade>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="relative h-[250px] rounded-lg w-full bg-background overflow-hidden flex items-center justify-center">
            <FlickeringGrid
              className="z-0 absolute inset-0 size-full"
              squareSize={4}
              gridGap={10}
              color="#c7d0b3"
              maxOpacity={0.8}
              flickerChance={0.3}
              height={250}
              width={9999}
            />
            <h3 className="text-center">Fetching breed information...</h3>
          </div>
        )}
        <h5>
          Select 1 photo of {breed} breed
        </h5>
        <p className="mb-4">
          add to your favorite dog breeds image.
        </p>
        <div className="columns-2 gap-4 sm:columns-3">
          {visibleImages.map((imageUrl, idx) => (
            <BlurFade 
              key={`${imageUrl}-${idx}`}
              delay={0.25 + idx * 0.05} 
              inView
              ref={idx === visibleImages.length - 1 ? lastImageRef : undefined}
            >
              <div className="relative group mb-4 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-contain rounded-lg"
                  src={imageUrl}
                  alt={`Random breed image ${idx + 1}`}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-300">
                  <div onClick={() => {
                    onSelected(breed, imageUrl)
                  }}>
                    {selectButton}
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
          {isLoading && (
            <div className="col-span-full flex justify-center">
              <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>
        {currentPage < totalPages && !isLoading && (
          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('photos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                goToPage(currentPage + 1);
              }}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    );
  }