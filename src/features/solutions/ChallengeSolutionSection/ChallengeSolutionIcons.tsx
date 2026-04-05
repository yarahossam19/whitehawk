"use client";

import type { ChallengeItem, SolutionItem } from "../config";

const CHALLENGE_ICONS: Record<ChallengeItem["icon"], React.ReactNode> = {
  target: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.94417 4.23089C10.8853 3.99956 12.8488 4.4099 14.5349 5.39926C16.2209 6.38862 17.5368 7.90262 18.2817 9.71006C18.3511 9.89715 18.3511 10.103 18.2817 10.2901C17.9754 11.0326 17.5707 11.7305 17.0783 12.3651" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.7367 11.7967C11.2652 12.2521 10.6337 12.5041 9.97817 12.4984C9.32268 12.4927 8.69565 12.2298 8.23213 11.7663C7.76861 11.3027 7.50568 10.6757 7.49999 10.0202C7.49429 9.36473 7.74628 8.73322 8.20167 8.26172" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5658 14.5841C13.4604 15.2389 12.2271 15.6483 10.9495 15.7844C9.67188 15.9206 8.37996 15.7803 7.16136 15.3732C5.94276 14.966 4.82599 14.3015 3.88684 13.4247C2.94769 12.548 2.20813 11.4794 1.71833 10.2916C1.64888 10.1045 1.64888 9.89871 1.71833 9.71162C2.45719 7.91983 3.75723 6.41599 5.42333 5.42578" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.66667 1.66797L18.3333 18.3346" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ),
  lightning: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16.6667 1.66797H3.33334C2.41286 1.66797 1.66667 2.41416 1.66667 3.33464V6.66797C1.66667 7.58844 2.41286 8.33464 3.33334 8.33464H16.6667C17.5871 8.33464 18.3333 7.58844 18.3333 6.66797V3.33464C18.3333 2.41416 17.5871 1.66797 16.6667 1.66797Z" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.6667 11.668H3.33334C2.41286 11.668 1.66667 12.4142 1.66667 13.3346V16.668C1.66667 17.5884 2.41286 18.3346 3.33334 18.3346H16.6667C17.5871 18.3346 18.3333 17.5884 18.3333 16.668V13.3346C18.3333 12.4142 17.5871 11.668 16.6667 11.668Z" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 5H5.00833" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 15H5.00833" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  lock: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.1083 14.9999L11.4417 3.3332C11.2963 3.0767 11.0855 2.86335 10.8308 2.71492C10.576 2.56649 10.2865 2.48828 9.99167 2.48828C9.69685 2.48828 9.4073 2.56649 9.15257 2.71492C8.89783 2.86335 8.68703 3.0767 8.54167 3.3332L1.875 14.9999C1.72807 15.2543 1.65103 15.5431 1.65168 15.837C1.65233 16.1308 1.73065 16.4192 1.87871 16.673C2.02676 16.9269 2.23929 17.137 2.49475 17.2822C2.7502 17.4274 3.03951 17.5025 3.33334 17.4999H16.6667C16.9591 17.4996 17.2463 17.4223 17.4994 17.2759C17.7525 17.1295 17.9627 16.9191 18.1088 16.6658C18.2548 16.4125 18.3317 16.1252 18.3316 15.8328C18.3316 15.5404 18.2545 15.2531 18.1083 14.9999Z" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 7.5V10.8333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 14.168H10.0083" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M12.5 1.66797H4.99999C4.55797 1.66797 4.13404 1.84356 3.82148 2.15612C3.50892 2.46868 3.33333 2.89261 3.33333 3.33464V16.668C3.33333 17.11 3.50892 17.5339 3.82148 17.8465C4.13404 18.159 4.55797 18.3346 4.99999 18.3346H15C15.442 18.3346 15.8659 18.159 16.1785 17.8465C16.4911 17.5339 16.6667 17.11 16.6667 16.668V5.83464L12.5 1.66797Z" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 7.5V10.8333" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 14.168H10.0083" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  documents: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M18.3329 10.0052H16.2663C15.9021 10.0044 15.5476 10.123 15.2572 10.3427C14.9667 10.5624 14.7563 10.8712 14.6579 11.2219L12.6996 18.1885C12.687 18.2318 12.6607 18.2698 12.6246 18.2969C12.5885 18.3239 12.5447 18.3385 12.4996 18.3385C12.4545 18.3385 12.4107 18.3239 12.3746 18.2969C12.3385 18.2698 12.3122 18.2318 12.2996 18.1885L7.69959 1.82188C7.68697 1.7786 7.66065 1.74059 7.62459 1.71354C7.58853 1.6865 7.54467 1.67188 7.49959 1.67188C7.45452 1.67188 7.41066 1.6865 7.37459 1.71354C7.33853 1.74059 7.31222 1.7786 7.29959 1.82188L5.34126 8.78854C5.24331 9.13784 5.03408 9.44564 4.74531 9.66522C4.45655 9.8848 4.10403 10.0042 3.74126 10.0052H1.66626" stroke="#E7000B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
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
    <g clip-path="url(#clip0_1754_1947)">
      <path d="M16.6667 1.66797H3.33335C2.41288 1.66797 1.66669 2.41416 1.66669 3.33464V6.66797C1.66669 7.58844 2.41288 8.33464 3.33335 8.33464H16.6667C17.5872 8.33464 18.3334 7.58844 18.3334 6.66797V3.33464C18.3334 2.41416 17.5872 1.66797 16.6667 1.66797Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.6667 11.668H3.33335C2.41288 11.668 1.66669 12.4142 1.66669 13.3346V16.668C1.66669 17.5884 2.41288 18.3346 3.33335 18.3346H16.6667C17.5872 18.3346 18.3334 17.5884 18.3334 16.668V13.3346C18.3334 12.4142 17.5872 11.668 16.6667 11.668Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 5H5.00833" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 15H5.00833" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1754_1947">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
  ),
  lightning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.0833 14.5833L2.5 5V2.5H5L14.5833 12.0833" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.8333 15.832L15.8333 10.832" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3333 13.332L16.6666 16.6654" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.8333 17.4987L17.5 15.832" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ),
  lock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M16.6666 10.835C16.6666 15.0017 13.75 17.085 10.2833 18.2933C10.1018 18.3549 9.90459 18.3519 9.72498 18.285C6.24998 17.085 3.33331 15.0017 3.33331 10.835V5.00168C3.33331 4.78066 3.42111 4.5687 3.57739 4.41242C3.73367 4.25614 3.94563 4.16834 4.16665 4.16834C5.83331 4.16834 7.91665 3.16834 9.36665 1.90168C9.54319 1.75084 9.76777 1.66797 9.99998 1.66797C10.2322 1.66797 10.4568 1.75084 10.6333 1.90168C12.0916 3.17668 14.1666 4.16834 15.8333 4.16834C16.0543 4.16834 16.2663 4.25614 16.4226 4.41242C16.5788 4.5687 16.6666 4.78066 16.6666 5.00168V10.835Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  report: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M12.4997 1.66406H4.99967C4.55765 1.66406 4.13372 1.83966 3.82116 2.15222C3.5086 2.46478 3.33301 2.8887 3.33301 3.33073V16.6641C3.33301 17.1061 3.5086 17.53 3.82116 17.8426C4.13372 18.1551 4.55765 18.3307 4.99967 18.3307H14.9997C15.4417 18.3307 15.8656 18.1551 16.1782 17.8426C16.4907 17.53 16.6663 17.1061 16.6663 16.6641V5.83073L12.4997 1.66406Z" stroke="#02A1FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.667 1.66406V4.9974C11.667 5.43942 11.8426 5.86335 12.1551 6.17591C12.4677 6.48847 12.8916 6.66406 13.3337 6.66406H16.667" stroke="#02A1FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.33366 7.5H6.66699" stroke="#02A1FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3337 10.8359H6.66699" stroke="#02A1FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3337 14.1641H6.66699" stroke="#02A1FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  ),
  data: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.667 2.5H12.5003C12.0401 2.5 11.667 2.8731 11.667 3.33333V5.83333C11.667 6.29357 12.0401 6.66667 12.5003 6.66667H16.667C17.1272 6.66667 17.5003 6.29357 17.5003 5.83333V3.33333C17.5003 2.8731 17.1272 2.5 16.667 2.5Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.667 10H12.5003C12.0401 10 11.667 10.3731 11.667 10.8333V16.6667C11.667 17.1269 12.0401 17.5 12.5003 17.5H16.667C17.1272 17.5 17.5003 17.1269 17.5003 16.6667V10.8333C17.5003 10.3731 17.1272 10 16.667 10Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 13.3359H3.33333C2.8731 13.3359 2.5 13.709 2.5 14.1693V16.6693C2.5 17.1295 2.8731 17.5026 3.33333 17.5026H7.5C7.96024 17.5026 8.33333 17.1295 8.33333 16.6693V14.1693C8.33333 13.709 7.96024 13.3359 7.5 13.3359Z" stroke="#8EC5FF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
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
