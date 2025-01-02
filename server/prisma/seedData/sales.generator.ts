import * as fs from 'fs';

type Sale = {
  saleId: string;
  productId: string;
  timestamp: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  latitude: string;
  longitude: string;
};

const productIds = [
  "d35623ee-bef6-42b2-8776-2f99f8bb4782",
  "8ac1ac77-7358-425e-be16-0bdde9f02e59",
  "1afc136b-4d9f-4e8e-aace-8e1df908a404",
  "af84cc12-4fea-4f58-aece-f2ce92ca9580",
  "86e3bb1c-2f5d-4774-98f3-4df7cddd0a0f",
  "26b017c6-06d8-443f-9b4a-d6b1cee6f4c0",
  "440c9e80-6bf8-4eb3-b2d2-f81936d67de3",
  "98255f4e-40a6-470f-89a5-0792729f8947",
  "2a339fb2-f9f3-43bc-a85a-b217a0a38f12",
  "8a8391b2-b4ac-4847-b652-66ffd8d65875",
  "be2157fb-7454-405e-9511-bf7ba81b7726",
  "fdf1ba3d-fa06-4ce5-90ff-d081c5d37176",
  "afded6df-058f-477d-9878-e0e0b1d3dff3",
  "daa29167-82a7-474b-9687-b8b903e7ec69",
  "ccb83982-71f3-4497-bad8-7e64c6920dc6",
  "1936d406-e89e-40e4-bff7-1827532269d4",
  "c849a535-5f8b-47e3-889c-015693a644ac",
  "0c3e80ee-59b3-4fc4-b760-8b07acc2d3ae",
  "d8f5bee3-f3eb-4071-a124-6b857e0fd798",
  "8d15de86-0e4a-4414-9166-7a33610202d3",
  "ea8fd0b9-c2d9-4d43-9c23-44cb99d079bb",
  "25d01c80-bca1-4a00-b1d0-0fbd39ff9e89",
  "1d6df6e3-b7ea-4507-9d66-87c6ee8ed5b9",
  "000a8c23-5bca-436c-a216-4e747a94c511",
  "c5b600dc-6bfb-492a-b335-c3cc8c707959",
  "9d5fafbc-312b-47e8-ada1-283918f0c3b5",
  "0114d5d4-ae48-46fa-b0ca-afe60eb88add",
  "e5b0da8c-148d-4680-b262-8609fb8a10da",
  "2be5b024-2c96-4f29-912c-c6f36353f799",
  "fcf2e432-62a3-4b6f-a34d-36e42a12272e",
  "fc4c81e5-f1ac-40f5-8c6f-da3fbad5599d",
  "07238d8e-0037-4972-87ca-0df206ee3e42",
  "154b7860-23a2-4564-ad99-1745ab7122ef",
  "8d4bf814-65d4-4df4-84cc-68911d925fdf",
  "a52bf1bd-3d35-4cd2-849a-354e3952e2d2",
];
 
type City = {
  name: string;
  minLat: number;
  maxLat: number;
  minLong: number;
  maxLong: number;
};
  
const cities: City[] = [
  { name: "New York", minLat: 40.4774, maxLat: 40.9176, minLong: -74.2591, maxLong: -73.7004 },
  { name: "London", minLat: 51.2868, maxLat: 51.6919, minLong: -0.5104, maxLong: 0.3340 },
  { name: "Paris", minLat: 48.8156, maxLat: 48.9022, minLong: 2.2242, maxLong: 2.4699 },
  { name: "Barcelona", minLat: 41.3200, maxLat: 41.4700, minLong: 2.0690, maxLong: 2.2290 },
  { name: "Shanghai", minLat: 31.1123, maxLat: 31.4118, minLong: 121.3798, maxLong: 121.6519 },
  { name: "Hong Kong", minLat: 22.1497, maxLat: 22.6140, minLong: 113.8378, maxLong: 114.4517 },
  { name: "Ciudad de México", minLat: 19.0728, maxLat: 19.5437, minLong: -99.3643, maxLong: -98.9482 },
  { name: "San José (CR)", minLat: 9.8580, maxLat: 10.0124, minLong: -84.1526, maxLong: -83.9734 },
  { name: "San Francisco (USA)", minLat: 37.6398, maxLat: 37.9298, minLong: -123.1738, maxLong: -122.2818 },
  { name: "Brasilia", minLat: -15.8697, maxLat: -15.5989, minLong: -48.1376, maxLong: -47.6969 },
  { name: "Medellín", minLat: 6.1390, maxLat: 6.3677, minLong: -75.6587, maxLong: -75.4511 },
];
 

function generateSales(numSales: number): Sale[] {
  const sales: Sale[] = [];

  for (let i = 0; i < numSales; i++) { 
    const city = cities[Math.floor(Math.random() * cities.length)];
 
    const latitude = (Math.random() * (city.maxLat - city.minLat) + city.minLat).toFixed(6);
    const longitude = (Math.random() * (city.maxLong - city.minLong) + city.minLong).toFixed(6);

    const sale: Sale = {
      saleId: generateUUID(),
      productId: productIds[Math.floor(Math.random() * productIds.length)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      quantity: Math.floor(Math.random() * 500) + 1,
      unitPrice: parseFloat((Math.random() * (500 - 10) + 10).toFixed(2)),
      totalAmount: 0.0,
      latitude: latitude,
      longitude: longitude
    };

    sale.totalAmount = parseFloat((sale.quantity * sale.unitPrice).toFixed(2));
    sales.push(sale);
  }

  return sales;
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
 
const salesData = generateSales(100);
const outputFile = 'sales.json';
fs.writeFileSync(outputFile, JSON.stringify(salesData, null, 2));

console.log(`File '${outputFile}' generated with ${salesData.length} sales.`);
