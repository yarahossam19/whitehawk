"use client";

import { useState } from "react";
import type { MissionCard } from "../config";
import styles from "./MissionSection.module.scss";
interface MissionSectionProps {
  cards: MissionCard[];
}

function SimulateIcon() {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <path d="M32.0006 5.33398C17.3073 5.33398 5.33398 17.3073 5.33398 32.0006C5.33398 46.694 17.3073 58.6673 32.0006 58.6673C46.694 58.6673 58.6673 46.694 58.6673 32.0006C58.6673 17.3073 46.694 5.33398 32.0006 5.33398ZM34.6673 53.1473V45.334H29.334V53.1473C24.6406 52.5521 20.2782 50.4137 16.9329 47.0684C13.5876 43.7231 11.4492 39.3607 10.854 34.6673H18.6673V29.334H10.854C11.4492 24.6406 13.5876 20.2782 16.9329 16.9329C20.2782 13.5876 24.6406 11.4492 29.334 10.854V18.6673H34.6673V10.854C44.294 12.054 51.9473 19.7073 53.1473 29.334H45.334V34.6673H53.1473C52.5521 39.3607 50.4137 43.7231 47.0684 47.0684C43.7231 50.4137 39.3607 52.5521 34.6673 53.1473Z" fill="currentColor"/>
</svg>
  );
}

function TrackIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <g clipPath="url(#clip0_2310_1929)">
    <mask id="mask0_2310_1929" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
      <path d="M64 0H0V64H64V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_2310_1929)">
      <path d="M31.9987 60.6666C16.1854 60.6666 3.33203 47.8132 3.33203 31.9999C3.33203 26.9866 4.63867 22.0534 7.14534 17.7067C7.70534 16.7467 8.90539 16.4266 9.86539 16.96L32.9854 30.2399C33.9454 30.7999 34.2654 31.9999 33.732 32.9599C33.172 33.9199 31.972 34.2402 31.012 33.7068L9.6787 21.4666C8.13203 24.7466 7.33203 28.3199 7.33203 31.9732C7.33203 45.5732 18.3987 56.6399 31.9987 56.6399C45.5987 56.6399 56.6654 45.5732 56.6654 31.9732C56.6654 18.3733 45.5987 7.30664 31.9987 7.30664C26.612 7.30664 21.4921 9.01333 17.1987 12.24C16.3187 12.9067 15.0653 12.72 14.3987 11.84C13.732 10.96 13.9187 9.70672 14.7987 9.04005C19.7853 5.30672 25.732 3.30664 31.9987 3.30664C47.812 3.30664 60.6654 16.16 60.6654 31.9732C60.6654 47.7866 47.812 60.6666 31.9987 60.6666Z" fill="currentColor"/>
      <path d="M32 50C22.08 50 14 41.92 14 32C14 28.8 14.8533 25.6266 16.48 22.88C17.04 21.92 18.2666 21.6 19.2266 22.16C20.1866 22.72 20.5067 23.9467 19.9467 24.9067C18.6934 27.04 18.0267 29.4933 18.0267 32C18.0267 39.7333 24.32 46 32.0267 46C39.7333 46 46.0267 39.7333 46.0267 32C46.0267 24.2667 39.7333 18 32.0267 18C29.9467 18 27.9467 18.4533 26.0533 19.3333C25.04 19.7867 23.8666 19.36 23.3866 18.3734C22.9066 17.36 23.3333 16.1867 24.3467 15.7067C26.7467 14.5867 29.3333 14 32 14C41.92 14 50 22.08 50 32C50 41.92 41.92 50 32 50Z" fill="currentColor"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_2310_1929">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
  );
}

function GenerateIcon() {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <g clipPath="url(#clip0_2310_1950)">
    <mask id="mask0_2310_1950" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
      <path d="M64 0H0V64H64V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_2310_1950)">
      <path d="M40.0006 60.6673H24.0007C9.52065 60.6673 3.33398 54.4806 3.33398 40.0006V24.0007C3.33398 9.52065 9.52065 3.33398 24.0007 3.33398H37.334C38.4273 3.33398 39.334 4.24065 39.334 5.33398C39.334 6.42732 38.4273 7.33398 37.334 7.33398H24.0007C11.7073 7.33398 7.33398 11.7073 7.33398 24.0007V40.0006C7.33398 52.294 11.7073 56.6673 24.0007 56.6673H40.0006C52.294 56.6673 56.6673 52.294 56.6673 40.0006V26.6673C56.6673 25.574 57.574 24.6673 58.6673 24.6673C59.7606 24.6673 60.6673 25.574 60.6673 26.6673V40.0006C60.6673 54.4806 54.4806 60.6673 40.0006 60.6673Z" fill="currentColor"/>
      <path d="M58.6673 28.6673H48.0007C38.8807 28.6673 35.334 25.1206 35.334 16.0006V5.33395C35.334 4.53395 35.814 3.78729 36.5607 3.49395C37.3073 3.17395 38.1607 3.36062 38.7473 3.92062L60.0807 25.254C60.6407 25.814 60.8273 26.694 60.5073 27.4407C60.1873 28.1873 59.4673 28.6673 58.6673 28.6673ZM39.334 10.1606V16.0006C39.334 22.8806 41.1207 24.6673 48.0007 24.6673H53.8407L39.334 10.1606Z" fill="currentColor"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_2310_1950">
      <rect width="64" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
  );
}

function DetectIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M64 0H0V64H64V0Z" fill="currentColor" />
    </svg>
  );
}


function AssetIcon() {
  return(<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
<g clipPath="url(#clip0_4418_10001)">
<path d="M17.0099 12.7298C17.6009 12.7298 18.0799 12.2507 18.0799 11.6598C18.0799 11.0688 17.6009 10.5898 17.0099 10.5898C16.419 10.5898 15.9399 11.0688 15.9399 11.6598C15.9399 12.2507 16.419 12.7298 17.0099 12.7298Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M20 6V7.78998C19.75 7.75998 19.46 7.73999 19.15 7.73999H14.87C12.73 7.73999 12.02 8.45003 12.02 10.59V15.7H6C2.8 15.7 2 14.9 2 11.7V6C2 2.8 2.8 2 6 2H16C19.2 2 20 2.8 20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M9 15.6992V19.9992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M2 11.9004H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M5.94995 20H11.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M17.0101 12.7298C17.601 12.7298 18.08 12.2507 18.08 11.6598C18.08 11.0688 17.601 10.5898 17.0101 10.5898C16.4191 10.5898 15.9401 11.0688 15.9401 11.6598C15.9401 12.2507 16.4191 12.7298 17.0101 12.7298Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M20 7.79022C19.75 7.76022 19.46 7.74023 19.15 7.74023H14.87C12.73 7.74023 12.02 8.45027 12.02 10.5903V19.1503C12.02 21.2903 12.73 22.0002 14.87 22.0002H19.15C21.29 22.0002 22 21.2903 22 19.1503V10.5903C22 8.76027 21.48 7.98022 20 7.79022ZM17.01 10.5903C17.6 10.5903 18.08 11.0702 18.08 11.6602C18.08 12.2502 17.6 12.7302 17.01 12.7302C16.42 12.7302 15.94 12.2502 15.94 11.6602C15.94 11.0702 16.42 10.5903 17.01 10.5903ZM17.01 19.1503C15.83 19.1503 14.87 18.1903 14.87 17.0103C14.87 16.5203 15.04 16.0603 15.32 15.7003C15.71 15.2003 16.32 14.8702 17.01 14.8702C17.55 14.8702 18.04 15.0703 18.41 15.3903C18.86 15.7903 19.15 16.3703 19.15 17.0103C19.15 18.1903 18.19 19.1503 17.01 19.1503Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M19.15 17.0111C19.15 18.1911 18.19 19.1511 17.01 19.1511C15.83 19.1511 14.87 18.1911 14.87 17.0111C14.87 16.5211 15.04 16.0611 15.32 15.7011C15.71 15.2011 16.32 14.8711 17.01 14.8711C17.55 14.8711 18.04 15.0711 18.41 15.3911C18.86 15.7911 19.15 16.3711 19.15 17.0111Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M17.0101 12.7298C17.601 12.7298 18.08 12.2507 18.08 11.6598C18.08 11.0688 17.601 10.5898 17.0101 10.5898C16.4191 10.5898 15.9401 11.0688 15.9401 11.6598C15.9401 12.2507 16.4191 12.7298 17.0101 12.7298Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
</g>
<defs>
<clipPath id="clip0_4418_10001">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>);
}
function AutomateIcon() {
 return (<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
<g clipPath="url(#clip0_4418_10213)">
<path d="M11 18V21C11 21.5 10.6 22 10 22C9.4 22 9 21.5 9 21V18H11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M15 18V21C15 21.5 14.6 22 14 22C13.4 22 13 21.5 13 21V18H15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M17 11V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V11C7 9.9 7.9 9 9 9H15C16.1 9 17 9.9 17 11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M5 11V15C5 15.6 4.6 16 4 16C3.4 16 3 15.6 3 15V11C3 10.4 3.4 10 4 10C4.6 10 5 10.4 5 11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M21 11V15C21 15.6 20.6 16 20 16C19.4 16 19 15.6 19 15V11C19 10.4 19.4 10 20 10C20.6 10 21 10.4 21 11Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M13 18H11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
<path d="M9.6 7H14.4C15.3 7 16 6.25 16 5.28571C16 2.92857 14.2 1 12 1C9.8 1 8 2.92857 8 5.28571C8 6.25 8.7 7 9.6 7Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
</g>
<defs>
<clipPath id="clip0_4418_10213">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>)
}
function IntegrateIcon() {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
<g clipPath="url(#clip0_4418_9744)">
<path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M20 6C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M18 4H14C12 4 11 5 11 7V17C11 19 12 20 14 20H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</g>
<defs>
<clipPath id="clip0_4418_9744">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>)};
function MonitorIcon() {
  return(<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
<g clipPath="url(#clip0_4418_10023)">
<path d="M6.44 2H17.55C21.11 2 22 2.89 22 6.44V12.77C22 16.33 21.11 17.21 17.56 17.21H6.44C2.89 17.22 2 16.33 2 12.78V6.44C2 2.89 2.89 2 6.44 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M12 17.2207V22.0007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M2 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
<path d="M7.5 22H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</g>
<defs>
<clipPath id="clip0_4418_10023">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>)}
function CardIcon({ icon }: { icon: MissionCard["icon"] }) {
  if (icon === "simulate") return <SimulateIcon />;
  if (icon === "track") return <TrackIcon />;
  if (icon === "detect") return <DetectIcon />;
  if (icon === "devices") return <AssetIcon />;
  if (icon === "integrate") return <IntegrateIcon />;
  if (icon === "automate") return <AutomateIcon />;
  if (icon === "monitor") return <MonitorIcon />;
  return <GenerateIcon />;
}

export function MissionSection({ cards }: MissionSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cards}>
          {cards.map((card, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={card.title}
                type="button"
                className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed}`}
                onClick={() => setOpenIndex(index)}
                aria-expanded={isOpen}
              >
                <div className={styles.cardInner}>
                  <span className={styles.icon}>
                    <CardIcon icon={card.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>
                    {isOpen ? card.title : (card.title.split(/\s+/)[0] ?? card.title)}
                  </h3>
                  <div className={styles.cardContent}>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
