const missileData = {
  USA: [
    { name: "Snark", range: 10000, cep: 5000, yield: 3 },
    { name: "Thor", range: 2500, cep: 1500, yield: 1.4 },
    { name: "Jupiter", range: 2400, cep: 1000, yield: 1.45 },
    { name: "Atlas", range: 15000, cep: 1800, yield: 4 },
    { name: "Pershing I", range: 740, cep: 250, yield: 0.4 },
    { name: "Titan I", range: 10000, cep: 1500, yield: 4 },
    { name: "Polaris A-1", range: 2200, cep: 1800, yield: 0.6 },
    { name: "Polaris A-2", range: 2800, cep: 1400, yield: 0.8 },
    { name: "Polaris A-3", range: 4600, cep: 900, yield: 0.2 },
    { name: "Minuteman I", range: 10000, cep: 1000, yield: 1 },
    { name: "Sergeant", range: 140, cep: 200, yield: 0.2 },
    { name: "Minuteman II", range: 12000, cep: 800, yield: 1.2 },
    { name: "Titan II", range: 15000, cep: 600, yield: 9 },
    { name: "Minuteman III", range: 13000, cep: 240, yield: 0.3 },
    { name: "Poseidon C-3", range: 7400, cep: 400, yield: 0.4 },
    { name: "Trident C-4", range: 7400, cep: 300, yield: 0.1 },
    { name: "Pershing II", range: 1770, cep: 30, yield: 0.3 },
    { name: "Peacekeeper", range: 9600, cep: 90, yield: 0.3 }
  ],
  Russia: [
    { name: "R-1", range: 270, cep: 1000, yield: 0.02 },
    { name: "R-5 (SS-3)", range: 1200, cep: 1500, yield: 1 },
    { name: "R-7 (SS-6)", range: 8000, cep: 3000, yield: 3 },
    { name: "R-12 (SS-4)", range: 2000, cep: 2000, yield: 2.3 },
    { name: "R-13 (SS-N-4)", range: 600, cep: 1500, yield: 1 },
    { name: "R-14 (SS-5)", range: 4500, cep: 1800, yield: 1.6 },
    { name: "D-1 (SS-1b)", range: 270, cep: 900, yield: 0.3 },
    { name: "R-29 (SS-N-8)", range: 7700, cep: 1000, yield: 1 },
    { name: "R-29R (SS-N-18)", range: 6500, cep: 500, yield: 0.5 },
    { name: "R-36 (SS-9 Mod 2)", range: 15000, cep: 1000, yield: 18 },
    { name: "R-36M (SS-18 Mod 1)", range: 16000, cep: 400, yield: 20 },
    { name: "R-39 (SS-N-20)", range: 8300, cep: 500, yield: 0.55 },
    { name: "RT-2PM (SS-25)", range: 10500, cep: 350, yield: 0.55 },
    { name: "RS-28 (Sarmat)", range: 18000, cep: 200, yield: 50 }
  ],
  India: [
    { name: "Agni-I", range: 1200, cep: 500, yield: 0.2 },
    { name: "Agni-II", range: 3500, cep: 1500, yield: 0.25 },
    { name: "Agni-III", range: 5000, cep: 3000, yield: 0.2 },
    { name: "Agni-V", range: 8000, cep: 10000, yield: 1 },
    { name: "Prithvi-II", range: 350, cep: 1000, yield: 0.25 },
    { name: "BrahMos", range: 290, cep: 50, yield: 0.3 },
    { name: "Shaurya", range: 750, cep: 200, yield: 0.3 }
  ]
};

export default missileData;
