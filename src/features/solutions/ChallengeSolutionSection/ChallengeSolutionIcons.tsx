"use client";

import type { ChallengeItem, SolutionItem } from "../config";

const CHALLENGE_ICONS: Record<ChallengeItem["icon"], React.ReactNode> = {
  target: (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M1.71833 10.2869C1.64888 10.0998 1.64888 9.89398 1.71833 9.70688C2.39475 8.06676 3.54293 6.66442 5.01731 5.67763C6.49169 4.69085 8.22587 4.16406 10 4.16406C11.7741 4.16406 13.5083 4.69085 14.9827 5.67763C16.4571 6.66442 17.6052 8.06676 18.2817 9.70688C18.3511 9.89398 18.3511 10.0998 18.2817 10.2869C17.6052 11.927 16.4571 13.3293 14.9827 14.3161C13.5083 15.3029 11.7741 15.8297 10 15.8297C8.22587 15.8297 6.49169 15.3029 5.01731 14.3161C3.54293 13.3293 2.39475 11.927 1.71833 10.2869Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  lightning: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16.6667 1.66797H3.33334C2.41286 1.66797 1.66667 2.41416 1.66667 3.33464V6.66797C1.66667 7.58844 2.41286 8.33464 3.33334 8.33464H16.6667C17.5871 8.33464 18.3333 7.58844 18.3333 6.66797V3.33464C18.3333 2.41416 17.5871 1.66797 16.6667 1.66797Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16.6667 11.668H3.33334C2.41286 11.668 1.66667 12.4142 1.66667 13.3346V16.668C1.66667 17.5884 2.41286 18.3346 3.33334 18.3346H16.6667C17.5871 18.3346 18.3333 17.5884 18.3333 16.668V13.3346C18.3333 12.4142 17.5871 11.668 16.6667 11.668Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M5 5H5.00833" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M5 15H5.00833" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  
  lock: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.1083 14.9999L11.4417 3.3332C11.2963 3.0767 11.0855 2.86335 10.8308 2.71492C10.576 2.56649 10.2865 2.48828 9.99167 2.48828C9.69685 2.48828 9.4073 2.56649 9.15257 2.71492C8.89783 2.86335 8.68703 3.0767 8.54167 3.3332L1.875 14.9999C1.72807 15.2543 1.65103 15.5431 1.65168 15.837C1.65233 16.1308 1.73065 16.4192 1.87871 16.673C2.02676 16.9269 2.23929 17.137 2.49475 17.2822C2.7502 17.4274 3.03951 17.5025 3.33334 17.4999H16.6667C16.9591 17.4996 17.2463 17.4223 17.4994 17.2759C17.7525 17.1295 17.9627 16.9191 18.1088 16.6658C18.2548 16.4125 18.3317 16.1252 18.3316 15.8328C18.3316 15.5404 18.2545 15.2531 18.1083 14.9999Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 7.5V10.8333" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 14.168H10.0083" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  clock: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M9.99959 18.3385C14.602 18.3385 18.3329 14.6076 18.3329 10.0052C18.3329 5.40284 14.602 1.67188 9.99959 1.67188C5.39722 1.67188 1.66626 5.40284 1.66626 10.0052C1.66626 14.6076 5.39722 18.3385 9.99959 18.3385Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 5V10L13.3333 11.6667" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  stroke: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.3329 10.0052H16.2663C15.9021 10.0044 15.5476 10.123 15.2572 10.3427C14.9667 10.5624 14.7563 10.8712 14.6579 11.2219L12.6996 18.1885C12.687 18.2318 12.6607 18.2698 12.6246 18.2969C12.5885 18.3239 12.5447 18.3385 12.4996 18.3385C12.4545 18.3385 12.4107 18.3239 12.3746 18.2969C12.3385 18.2698 12.3122 18.2318 12.2996 18.1885L7.69959 1.82188C7.68697 1.7786 7.66065 1.74059 7.62459 1.71354C7.58853 1.6865 7.54467 1.67188 7.49959 1.67188C7.45452 1.67188 7.41066 1.6865 7.37459 1.71354C7.33853 1.74059 7.31222 1.7786 7.29959 1.82188L5.34126 8.78854C5.24331 9.13784 5.03408 9.44564 4.74531 9.66522C4.45655 9.8848 4.10403 10.0042 3.74126 10.0052H1.66626" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  documents: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M12.5004 1.67188H5.00041C4.55838 1.67188 4.13446 1.84747 3.8219 2.16003C3.50933 2.47259 3.33374 2.89651 3.33374 3.33854V16.6719C3.33374 17.1139 3.50933 17.5378 3.8219 17.8504C4.13446 18.1629 4.55838 18.3385 5.00041 18.3385H15.0004C15.4424 18.3385 15.8664 18.1629 16.1789 17.8504C16.4915 17.5378 16.6671 17.1139 16.6671 16.6719V5.83854L12.5004 1.67188Z" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M11.6663 1.67188V5.00521C11.6663 5.44724 11.8419 5.87116 12.1544 6.18372C12.467 6.49628 12.8909 6.67187 13.3329 6.67187H16.6663" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M8.33293 7.5H6.66626" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M13.3329 10.8281H6.66626" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M13.3329 14.1719H6.66626" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  data: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clipPath="url(#clip0_2256_1579)">
    <path d="M16.6665 1.66797H3.33317C2.4127 1.66797 1.6665 2.41416 1.6665 3.33464V6.66797C1.6665 7.58844 2.4127 8.33464 3.33317 8.33464H16.6665C17.587 8.33464 18.3332 7.58844 18.3332 6.66797V3.33464C18.3332 2.41416 17.587 1.66797 16.6665 1.66797Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.6665 11.668H3.33317C2.4127 11.668 1.6665 12.4142 1.6665 13.3346V16.668C1.6665 17.5884 2.4127 18.3346 3.33317 18.3346H16.6665C17.587 18.3346 18.3332 17.5884 18.3332 16.668V13.3346C18.3332 12.4142 17.587 11.668 16.6665 11.668Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 5H5.00833" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H5.00833" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2256_1579">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
};

function ChallengeTitleIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

const SOLUTION_ICONS: Record<SolutionItem["icon"], React.ReactNode> = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16.667 2.5H12.5003C12.0401 2.5 11.667 2.8731 11.667 3.33333V5.83333C11.667 6.29357 12.0401 6.66667 12.5003 6.66667H16.667C17.1272 6.66667 17.5003 6.29357 17.5003 5.83333V3.33333C17.5003 2.8731 17.1272 2.5 16.667 2.5Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M16.667 10H12.5003C12.0401 10 11.667 10.3731 11.667 10.8333V16.6667C11.667 17.1269 12.0401 17.5 12.5003 17.5H16.667C17.1272 17.5 17.5003 17.1269 17.5003 16.6667V10.8333C17.5003 10.3731 17.1272 10 16.667 10Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7.5 13.3359H3.33333C2.8731 13.3359 2.5 13.709 2.5 14.1693V16.6693C2.5 17.1295 2.8731 17.5026 3.33333 17.5026H7.5C7.96024 17.5026 8.33333 17.1295 8.33333 16.6693V14.1693C8.33333 13.709 7.96024 13.3359 7.5 13.3359Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  lightning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
  <path d="M1.66949 10.8342C1.51179 10.8347 1.35718 10.7905 1.22362 10.7067C1.09005 10.6228 0.983016 10.5028 0.914946 10.3606C0.846876 10.2183 0.820566 10.0597 0.839071 9.90308C0.857576 9.74648 0.920138 9.59833 1.01949 9.47587L9.26949 0.975868C9.33137 0.904436 9.4157 0.856165 9.50864 0.838979C9.60157 0.821793 9.69759 0.836712 9.78093 0.881288C9.86427 0.925865 9.92998 0.997449 9.96727 1.08429C10.0046 1.17113 10.0112 1.26808 9.98615 1.3592L8.38616 6.37587C8.33898 6.50214 8.32313 6.63797 8.33998 6.77171C8.35683 6.90545 8.40587 7.0331 8.4829 7.14372C8.55992 7.25434 8.66263 7.34463 8.78222 7.40684C8.9018 7.46904 9.03469 7.50131 9.16949 7.50087H15.0028C15.1605 7.50033 15.3151 7.54455 15.4487 7.62839C15.5823 7.71222 15.6893 7.83224 15.7574 7.97449C15.8254 8.11674 15.8517 8.27538 15.8332 8.43199C15.8147 8.58859 15.7522 8.73674 15.6528 8.8592L7.40282 17.3592C7.34094 17.4306 7.25661 17.4789 7.16367 17.4961C7.07074 17.5133 6.97472 17.4984 6.89138 17.4538C6.80804 17.4092 6.74233 17.3376 6.70504 17.2508C6.66775 17.1639 6.66109 17.067 6.68616 16.9759L8.28615 11.9592C8.33333 11.8329 8.34918 11.6971 8.33233 11.5634C8.31548 11.4296 8.26644 11.302 8.18941 11.1913C8.11239 11.0807 8.00968 10.9904 7.89009 10.9282C7.77051 10.866 7.63762 10.8338 7.50282 10.8342H1.66949Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  lock: (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M15.8333 9.16406H4.16667C3.24619 9.16406 2.5 9.91025 2.5 10.8307V16.6641C2.5 17.5845 3.24619 18.3307 4.16667 18.3307H15.8333C16.7538 18.3307 17.5 17.5845 17.5 16.6641V10.8307C17.5 9.91025 16.7538 9.16406 15.8333 9.16406Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M5.83301 9.16406V5.83073C5.83301 4.72566 6.27199 3.66585 7.0534 2.88445C7.8348 2.10305 8.89461 1.66406 9.99967 1.66406C11.1047 1.66406 12.1646 2.10305 12.946 2.88445C13.7274 3.66585 14.1663 4.72566 14.1663 5.83073V9.16406" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  report: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M12.4997 1.66406H4.99967C4.55765 1.66406 4.13372 1.83966 3.82116 2.15222C3.5086 2.46478 3.33301 2.8887 3.33301 3.33073V16.6641C3.33301 17.1061 3.5086 17.53 3.82116 17.8426C4.13372 18.1551 4.55765 18.3307 4.99967 18.3307H14.9997C15.4417 18.3307 15.8656 18.1551 16.1782 17.8426C16.4907 17.53 16.6663 17.1061 16.6663 16.6641V5.83073L12.4997 1.66406Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M11.667 1.66406V4.9974C11.667 5.43942 11.8426 5.86335 12.1551 6.17591C12.4677 6.48847 12.8916 6.66406 13.3337 6.66406H16.667" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M8.33366 7.5H6.66699" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M13.3337 10.8359H6.66699" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M13.3337 14.1641H6.66699" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  ),
  data: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clipPath="url(#clip0_2256_1579)">
    <path d="M16.6665 1.66797H3.33317C2.4127 1.66797 1.6665 2.41416 1.6665 3.33464V6.66797C1.6665 7.58844 2.4127 8.33464 3.33317 8.33464H16.6665C17.587 8.33464 18.3332 7.58844 18.3332 6.66797V3.33464C18.3332 2.41416 17.587 1.66797 16.6665 1.66797Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.6665 11.668H3.33317C2.4127 11.668 1.6665 12.4142 1.6665 13.3346V16.668C1.6665 17.5884 2.4127 18.3346 3.33317 18.3346H16.6665C17.587 18.3346 18.3332 17.5884 18.3332 16.668V13.3346C18.3332 12.4142 17.587 11.668 16.6665 11.668Z" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 5H5.00833" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H5.00833" stroke="#02A1FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2256_1579">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
  ),
};

export function ChallengeIcon({ icon }: { icon: ChallengeItem["icon"] }) {
  return <>{CHALLENGE_ICONS[icon]}</>;
}

export function ChallengeTitleIcon() {
  return <ChallengeTitleIconSvg />;
}

export function SolutionIcon({ icon }: { icon: SolutionItem["icon"] }) {
  return <>{SOLUTION_ICONS[icon]}</>;
}
