import React from "react";

const SpecTable500E = () => {
  return (
    <div className="flex w-full flex-col gap-8 lg:max-w-[1320px]">
      <div className="flex w-full flex-col gap-4 overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm lg:text-base [&_td]:border-2 [&_td]:p-2">
          <tbody>
            <tr className="bg-gray-100 text-gray-800">
              <td colSpan={2}>
                <span>Product Name</span>
              </td>
              <td colSpan={2}>
                <span>Air Quality Monitor</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Model Number (Model Name)</span>
              </td>
              <td colSpan={2}>
                <span>SAP-500E</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Color</span>
              </td>
              <td colSpan={2}>
                <span>Black+Gray, White+Rosegold</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Connector, Power Supply</span>
              </td>
              <td colSpan={2}>
                <span>
                  - USB C type (5Vdc±10% / 1.5A)
                  <br />- Terminal Block (24V±5%): Power &amp; RS485
                </span>
              </td>
            </tr>
            <tr>
              <td rowSpan={8}>
                <span>
                  Sensor Measurement Range
                  <br />
                  &amp; Accuracy
                </span>
              </td>
              <td className="bg-gray-100">
                <span>Category</span>
              </td>
              <td className="bg-gray-100">
                <span>Measurement Range</span>
              </td>
              <td className="bg-gray-100">
                <span>Accuracy</span>
              </td>
            </tr>
            <tr>
              <td>Ultra-Fine Dust (PM1.0)</td>
              <td>0~5,000 μg/m³ (Resolution 1 μg/m³)</td>
              <td>
                0~100μg/m³: ±10μg/m³
                <br />
                101~500μg/m³: ±10%reading¹
              </td>
            </tr>
            <tr>
              <td>Fine Dust (PM2.5)</td>
              <td>0~5,000 μg/m³ (Resolution 1 μg/m³)</td>
              <td>
                0~100μg/m³: ±10μg/m³
                <br />
                101~500μg/m³: ±10%reading
              </td>
            </tr>
            <tr>
              <td>Coarse Dust (PM10)</td>
              <td>0~5,000 μg/m³ (Resolution 1 μg/m³)</td>
              <td>
                0~100μg/m³: ±25μg/m³
                <br />
                101~500μg/m³: ±25%reading
              </td>
            </tr>
            <tr>
              <td>Carbon Dioxide (CO₂)</td>
              <td>0~5000ppm</td>
              <td>±(50ppm + 5% of reading)</td>
            </tr>
            <tr>
              <td>Total Volatile Organic Compounds (TVOC)</td>
              <td>0~100 Level (based on 0~10,000ppb)</td>
              <td>±15%</td>
            </tr>
            <tr>
              <td>Temperature</td>
              <td>-10℃ ~60℃ (Resolution 0.1℃)</td>
              <td>±2℃</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>0~99%RH (Resolution 0.1%)</td>
              <td>±5% (@25℃)</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Operating Temperature &amp; Humidity</span>
              </td>
              <td colSpan={2}>
                <span>-10℃~60℃, 0~95%RH</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Communication</span>
              </td>
              <td colSpan={2}>
                <span>
                  - Wired: RS485
                  <br />- Wireless: Wi-Fi (2.4GHz &amp; 5GHz supported), BLE
                  (Ver5.0)
                </span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Weight</span>
              </td>
              <td colSpan={2}>
                <span>204g</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Dimensions (W * H * D)</span>
              </td>
              <td colSpan={2}>
                <span>133 x 80 x 24(mm)</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Certification</span>
              </td>
              <td colSpan={2}>
                <span>
                  - Standard Certification (KC Certification)
                  <br />- Grade 1 Fine Dust Performance Certification
                </span>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={2}>
                <span>Battery Charging &amp; Usage Time</span>
              </td>
              <td colSpan={2}>
                <span>
                  - Charging Time: About 2 hours 20 mins when power OFF
                  <br />
                  - Usage Time: Up to about 2 hours
                  <br />
                  - Battery: Li-ion, 1300mAh 3.7V
                  <br />
                  (*Battery sold separately.)
                </span>
              </td>
            </tr> */}
            <tr>
              <td colSpan={2}>
                <span>Manufacturer &amp; Seller</span>
              </td>
              <td colSpan={2}>
                <span>Airvent Co., Ltd.</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Country of Manufacture</span>
              </td>
              <td colSpan={2}>
                <span>Republic of Korea</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <span>Components</span>
              </td>
              <td colSpan={2}>
                <span>
                  Product, Manual, Stand Bracket + Straight Cable
                  <br />
                  * Optional: Battery, Wall-mounted Bracket + L-shaped Cable
                  <br />* Straight Cable (2m): USB A to C Type, L-shaped Cable
                  (2m): USB A to C Angle Type
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm lg:text-base">
          1) % means accuracy to full scale. %reading refers to accuracy based
          on reading value, which provides more precise results.
        </p>
      </div>
    </div>
  );
};

export default SpecTable500E;
