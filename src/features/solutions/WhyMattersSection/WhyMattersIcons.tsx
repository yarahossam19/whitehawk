"use client";

/**
 * Each named slot below maps to a single inline SVG that's swapped in by the
 * grid in WhyMattersSection. Paste your real SVG markup in place of the
 * placeholder. Use `currentColor` for stroke/fill so the color follows
 * `color` set by the section's CSS (light blue / white on the dark panel).
 *
 * To add a new icon:
 *   1. Add a key to the `WhyMattersIconName` union below.
 *   2. Add a JSX entry to `WHY_MATTERS_ICONS`.
 *   3. Reference it in config.ts as `icon: "<your-key>"`.
 */

export type WhyMattersIconName =
  | "sovereign-crisis"
  | "data-exposure"
  | "service-disruption"
  | "unified-security"
  | "customer-trust"
  | "regulatory-pressure"
  | "transaction-integrity"
  | "continuous-assurance"
  | "patient-safety"
  | "phi-risk"
  | "hipaa-pressure"
  | "iomt-exposure";

const WHY_MATTERS_ICONS: Record<WhyMattersIconName, React.ReactNode> = {
  /* --- Public sector ---------------------------------------------------- */
  "sovereign-crisis": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 3l11 4v6c0 6.6-4.7 12.2-11 13-6.3-.8-11-6.4-11-13V7l11-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 14l3.5 3.5L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "data-exposure": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 11h20M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "service-disruption": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M3 17c4.5-6 7-6 11-2s7 4 11-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="22" r="1.5" fill="currentColor" />
    </svg>
  ),
  "unified-security": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 3l9 4v6c0 6.5-4 11.4-9 12-5-.6-9-5.5-9-12V7l9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 14h8M14 10v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  /* --- Fintech ---------------------------------------------------------- */
  "customer-trust": (
    // TODO: replace with the final Figma SVG.
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.96811 0.000848994C6.09823 -0.00143098 6.23092 0.000290317 6.36042 0.0133702C6.82794 0.060913 7.27751 0.216991 7.67259 0.468882C8.02847 0.69814 8.33391 1.03601 8.63355 1.33638L9.59754 2.29651L10.3343 3.02489C10.4579 3.14825 10.5836 3.26979 10.6964 3.39798C10.8652 3.58941 10.885 3.86651 10.765 4.08835C10.7152 4.18785 10.6363 4.26622 10.5569 4.34337C9.93552 4.94724 9.32327 5.56076 8.70296 6.16579C8.5825 6.28328 8.46118 6.40005 8.34155 6.51817C8.17169 6.68589 7.98741 6.84568 7.85457 7.04504C7.68471 7.30442 7.57871 7.59963 7.54512 7.90692C7.43449 8.91566 8.14891 9.43996 8.79484 10.0686L10.5479 11.7709L13.4799 14.6302C13.6168 14.7646 13.7529 14.9067 13.8993 15.0303C14.2082 15.2909 14.632 15.3005 14.943 15.034C15.1018 14.8977 15.1975 14.7029 15.2074 14.4951C15.2132 14.3548 15.1603 14.141 15.0701 14.03C14.9016 13.823 14.6643 13.6122 14.475 13.4239C13.9688 12.9211 13.4598 12.4248 12.9548 11.9212C12.8249 11.7917 12.7543 11.6421 12.763 11.4566C12.7686 11.3157 12.834 11.1835 12.9432 11.0929C13.1107 10.9514 13.382 10.9319 13.5634 11.0241C13.7079 11.0974 13.9643 11.3736 14.089 11.4973L15.2943 12.6896C15.4941 12.8901 15.6928 13.0982 15.8988 13.2924C16.02 13.4067 16.2057 13.4839 16.3734 13.4964C16.579 13.5106 16.7816 13.441 16.934 13.3039C17.0953 13.157 17.1885 12.951 17.1917 12.7342C17.1963 12.2971 16.8358 12.053 16.5335 11.7563L15.3265 10.5621C15.146 10.3834 14.8852 10.1554 14.738 9.9562C14.3929 9.46535 14.9095 8.90556 15.4329 9.16525C15.5856 9.24103 15.8134 9.50084 15.9423 9.62769L17.2528 10.9126C17.3339 10.9918 17.416 11.0738 17.4962 11.1505C17.7455 11.3894 17.9547 11.6585 18.3336 11.6633C18.5387 11.6658 18.7263 11.5889 18.8763 11.4506C19.0321 11.3075 19.1217 11.1072 19.1237 10.8968C19.1264 10.5156 18.8476 10.2967 18.5987 10.0527L17.9662 9.43148C17.2692 8.74171 16.5753 8.04972 15.8759 7.3613C15.4518 6.94379 14.894 6.98314 14.5015 7.42323C14.4354 7.49746 14.3448 7.58183 14.273 7.65297L13.256 8.65978C13.0254 8.88793 12.732 9.21467 12.461 9.38083C11.2199 10.1416 9.55853 9.32635 9.55145 7.83856C9.54705 6.91648 10.083 6.51818 10.6813 5.92625L11.6849 4.93394C12.7039 3.95242 13.7195 2.9212 14.7311 1.92662L15.5128 1.15716C16.0033 0.674659 16.3069 0.371752 16.9949 0.148012C17.7298 -0.0939103 18.5319 -0.0349979 19.2228 0.311637C19.4509 0.427624 19.6635 0.571303 19.8556 0.739363C20.0557 0.910852 20.2928 1.15962 20.4839 1.34909L22.4832 3.32858C22.7042 3.54848 22.9581 3.78691 23.147 4.03117C23.4317 4.39965 23.652 4.81272 23.7989 5.2532C24.1433 6.2938 24.0384 7.53514 23.5378 8.51083C23.398 8.78117 23.2281 9.03512 23.0314 9.26819C22.9077 9.41346 22.7417 9.56913 22.6031 9.7058L21.9358 10.3629L21.2741 11.0168C20.9254 11.3621 20.6759 11.726 20.1312 11.433C19.7914 12.2981 19.2387 12.7237 18.2889 12.747C18.2802 13.2407 18.0767 13.7115 17.7217 14.0587C17.3112 14.4615 16.8574 14.5889 16.2983 14.5852C16.283 14.9697 16.121 15.3503 15.8735 15.6447C15.5587 16.0237 15.1024 16.2606 14.6083 16.3013C13.9968 16.354 13.5292 16.1489 13.0733 15.7707C12.9575 15.8956 12.8369 16.0196 12.7092 16.1316C11.3949 17.2831 9.27617 17.2897 7.95305 16.1498C7.80092 16.0187 7.65512 15.8678 7.51059 15.7263L6.74627 14.9747L4.42939 12.6888L2.1198 10.4165C1.73013 10.0331 1.04885 9.41305 0.758792 8.99415C0.326843 8.37196 0.0694618 7.64754 0.012915 6.89477C-0.0808173 5.70785 0.337683 4.48658 1.20226 3.64693C1.29683 3.55509 1.3901 3.46029 1.48376 3.36741L3.4838 1.38583C3.88122 0.991545 4.23096 0.59358 4.74029 0.337072C5.15075 0.130359 5.51193 0.0335906 5.96811 0.000848994ZM7.07033 1.39019C6.79461 1.2119 6.27318 1.05677 5.94324 1.11433C5.13875 1.2068 4.87159 1.56944 4.33833 2.10011L2.28945 4.12766C2.11137 4.30358 1.89498 4.49233 1.73903 4.6878C0.807885 5.8549 0.884217 7.68991 1.97008 8.73334C2.03569 8.79642 2.10165 8.86141 2.16687 8.92558L2.83438 9.58137L7.44613 14.1209L8.21626 14.8813C8.40102 15.0637 8.60344 15.2712 8.80637 15.4292C9.23016 15.7591 9.99214 15.981 10.5269 15.9181C11.3449 15.8252 11.7311 15.5909 12.2829 15.0256L8.62397 11.4518L7.71476 10.5677C7.45039 10.3108 7.16649 10.0603 6.96144 9.75532C6.62351 9.26201 6.44161 8.68023 6.43892 8.08431C6.43373 7.27869 6.76532 6.54394 7.33552 5.97684L9.54547 3.80252L8.18453 2.44903L7.60839 1.87139C7.44818 1.71173 7.26006 1.51288 7.07033 1.39019ZM18.9059 1.38681C18.5779 1.17899 18.1431 1.06983 17.7551 1.10616C17.0937 1.19169 16.8425 1.39134 16.3915 1.83982L15.8724 2.35548L11.7681 6.39886L11.1402 7.02246C10.8654 7.29616 10.5916 7.52102 10.6702 7.95511C10.7048 8.15587 10.8211 8.33379 10.9921 8.44725C11.2958 8.64604 11.6683 8.62775 11.9409 8.38745C12.0699 8.27372 12.1929 8.14558 12.3151 8.02427L13.2615 7.08923C13.4748 6.87839 13.7955 6.54042 14.0242 6.36789C14.6451 5.89922 15.58 5.8485 16.2462 6.25819C16.5183 6.42561 16.6977 6.62496 16.924 6.8496L18.82 8.71882L19.4159 9.29965C19.8389 9.71254 20.0753 9.93386 20.1683 10.5487C20.5766 10.1587 20.9805 9.76442 21.3798 9.36546C21.6111 9.13744 21.8428 8.90969 22.0746 8.68195C22.6129 8.15337 22.8945 7.38258 22.9075 6.63966C22.9207 5.88485 22.6634 5.10195 22.1426 4.54225C21.4786 3.87949 20.803 3.21756 20.1353 2.55588L19.4926 1.91756C19.3186 1.74379 19.1119 1.51731 18.9059 1.38681Z" fill="#81D0FF"/>
</svg>
  ),
  "regulatory-pressure": (
    // TODO: replace with the final Figma SVG.
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7 11.2H17M8.3 8V0M14.3 8V0M7 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H7C4.79086 5 3 6.79086 3 9V15C3 17.2091 4.79086 19 7 19Z" stroke="#81D0FF" stroke-width="1.4"/>
</svg>
  ),
  "transaction-integrity": (
    // TODO: replace with the final Figma SVG.
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M7 11.2H17M8.3 8V0M14.3 8V0M7 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H7C4.79086 5 3 6.79086 3 9V15C3 17.2091 4.79086 19 7 19Z" stroke="#81D0FF" stroke-width="1.4"/>
</svg>
  ),
  "continuous-assurance": (
    // TODO: replace with the final Figma SVG.
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
  <path d="M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8Z" fill="#81D0FF"/>
  <path d="M25 8C25 9.65685 23.6569 11 22 11C20.3431 11 19 9.65685 19 8C19 6.34315 20.3431 5 22 5C23.6569 5 25 6.34315 25 8Z" fill="#81D0FF"/>
  <path d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z" fill="#81D0FF"/>
  <path d="M11 8.4H21M10.5483 9.75632L14.5483 18.7563M22.5245 9.29139L17.5245 18.2914M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM25 8C25 9.65685 23.6569 11 22 11C20.3431 11 19 9.65685 19 8C19 6.34315 20.3431 5 22 5C23.6569 5 25 6.34315 25 8ZM19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z" stroke="#81D0FF" stroke-width="1.2"/>
</svg>
  ),

  /* --- Healthcare ------------------------------------------------------- */
  "patient-safety": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M14 24s-9-5.6-9-12a5 5 0 019-3 5 5 0 019 3c0 6.4-9 12-9 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 13h6M14 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "phi-risk": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="4" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9h10M9 13h10M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "hipaa-pressure": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="10" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 10V7a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  "iomt-exposure": (
    // TODO: replace with the final Figma SVG.
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M14 4v4M14 20v4M4 14h4M20 14h4M7 7l3 3M18 18l3 3M21 7l-3 3M10 18l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export function WhyMattersIcon({ icon }: { icon: WhyMattersIconName }) {
  return <>{WHY_MATTERS_ICONS[icon]}</>;
}
