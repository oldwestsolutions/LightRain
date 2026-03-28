export type Merchant = {
  id: string;
  name: string;
  federationAddress: string;
  description: string;
  type: "dispensary" | "cultivator" | "processor";
  region: string;
  established: string;
  notes: string;
};

export const MERCHANTS: Merchant[] = [
  {
    id: "1",
    name: "GreenLeaf Dispensary",
    federationAddress: "greenleaf*lightra.in",
    description: "Licensed THC retailer in Wyoming",
    type: "dispensary",
    region: "Cheyenne, WY",
    established: "2019",
    notes: "Full-spectrum products, medical and adult-use. Accepts XLM settlements via LightRain.",
  },
  {
    id: "2",
    name: "Alpine Cultivation Co.",
    federationAddress: "alpinecult*lightra.in",
    description: "Indoor craft cannabis grower",
    type: "cultivator",
    region: "Boulder, CO",
    established: "2017",
    notes: "Small-batch flower and concentrates. B2B wholesale with instant federation payouts.",
  },
  {
    id: "3",
    name: "Pacific Extracts Lab",
    federationAddress: "pacificextracts*lightra.in",
    description: "CO₂ extraction and edible manufacturing",
    type: "processor",
    region: "Portland, OR",
    established: "2020",
    notes: "GMP-style processing. Ships to licensed retailers nationwide where permitted.",
  },
  {
    id: "4",
    name: "Riverbend Dispensary",
    federationAddress: "riverbend*lightra.in",
    description: "Boutique dispensary & delivery hub",
    type: "dispensary",
    region: "Missoula, MT",
    established: "2021",
    notes: "Curated menu, loyalty program, and same-day crypto settlement reporting.",
  },
  {
    id: "5",
    name: "Sunstone Growers",
    federationAddress: "sunstone*lightra.in",
    description: "Greenhouse cultivator — sustainable ops",
    type: "cultivator",
    region: "Santa Rosa, CA",
    established: "2016",
    notes: "Sun-grown and light-dep flower. Volume contracts with tiered pricing.",
  },
  {
    id: "6",
    name: "North Star Processing",
    federationAddress: "northstar*lightra.in",
    description: "Infused products & packaging",
    type: "processor",
    region: "Anchorage, AK",
    established: "2018",
    notes: "Gummies, tinctures, and topicals. Batch traceability on every invoice.",
  },
  {
    id: "7",
    name: "Emerald City Collective",
    federationAddress: "emeraldcity*lightra.in",
    description: "Medical & recreational storefront",
    type: "dispensary",
    region: "Seattle, WA",
    established: "2014",
    notes: "One of the region’s oldest licensed shops. Strong compliance track record.",
  },
  {
    id: "8",
    name: "High Plains Hemp & THC",
    federationAddress: "highplains*lightra.in",
    description: "Dual-license retailer & micro-cultivation",
    type: "dispensary",
    region: "Denver, CO",
    established: "2022",
    notes: "Hemp CBD plus state-legal THC lines. Federation address for all vendor remittances.",
  },
];
