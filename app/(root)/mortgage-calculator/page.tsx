"use client";

import { useState } from "react";

const MortgageCalculator = () => {
  // Base State
  const [homePrice, setHomePrice] = useState(1227000);
  const [downPayment, setDownPayment] = useState(365000);
  const [interestRate, setInterestRate] = useState(6.715);
  const [loanTerm, setLoanTerm] = useState(30); // Fixed 30-Year Loan Term
  const loanAmount = homePrice - downPayment;

  // Advanced Modal State
  const [hoaDues, setHoaDues] = useState(0);
  const [propertyTax, setPropertyTax] = useState(285);
  const [homeInsurance, setHomeInsurance] = useState(233);
  const [loanType, setLoanType] = useState("Conventional");
  const [creditScore, setCreditScore] = useState("740+");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    return (
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalPayments))
    ).toFixed(2);
  };

  const principalAndInterest = calculateMonthlyPayment();
  const totalMonthlyPayment =
    Number(principalAndInterest) + hoaDues + propertyTax + homeInsurance;

  return (
    <div className="pt-[136px] bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Base Header */}
        <h1 className="text-4xl font-serif text-center text-gold mb-8">
          Mortgage Calculator
        </h1>

        {/* Base Result Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700">
              ${totalMonthlyPayment.toLocaleString("en-US")}/mo
            </p>
            <p className="text-sm text-gray-600">
              30-Year Fixed, {interestRate}% APR
            </p>
          </div>

          {/* Breakdown Bar */}
          <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-gray-200">
            <div
              className="bg-red-500"
              style={{
                width: `${
                  (Number(principalAndInterest) / totalMonthlyPayment) * 100
                }%`,
              }}
            ></div>
            <div
              className="bg-yellow-400"
              style={{
                width: `${(propertyTax / totalMonthlyPayment) * 100}%`,
              }}
            ></div>
            <div
              className="bg-blue-500"
              style={{
                width: `${(homeInsurance / totalMonthlyPayment) * 100}%`,
              }}
            ></div>
            <div
              className="bg-gray-400"
              style={{
                width: `${(hoaDues / totalMonthlyPayment) * 100}%`,
              }}
            ></div>
          </div>

          {/* Breakdown Labels */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="text-center">
              <p>Principal & Interest</p>
              <p className="font-bold text-gray-900">
                ${Number(principalAndInterest).toLocaleString("en-US")}
              </p>
            </div>
            <div className="text-center">
              <p>Property Tax</p>
              <p className="font-bold text-gray-900">
                ${propertyTax.toLocaleString("en-US")}
              </p>
            </div>
            <div className="text-center">
              <p>Home Insurance</p>
              <p className="font-bold text-gray-900">
                ${homeInsurance.toLocaleString("en-US")}
              </p>
            </div>
            <div className="text-center">
              <p>HOA Fees</p>
              <p className="font-bold text-gray-900">
                ${hoaDues.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>

        {/* Base Sliders Section */}
        <div className="mt-10">
          {/* Home Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Home Price
            </label>
            <input
              type="range"
              className="w-full mt-2"
              min={50000}
              max={2000000}
              step={1000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
            />
            <input
              type="text"
              className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
              value={`$${homePrice.toLocaleString()}`}
              readOnly
            />
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Down Payment
            </label>
            <input
              type="range"
              className="w-full mt-2"
              min={0}
              max={homePrice}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2">
              <input
                type="text"
                className="w-full mr-2 text-right bg-transparent border border-gray-300 p-2 rounded text-brown-500 text-lg"
                value={`$${downPayment.toLocaleString()}`}
                readOnly
              />
              <input
                type="text"
                className="w-20 text-center bg-transparent border border-gray-300 p-2 rounded text-brown-500 text-lg"
                value={`${((downPayment / homePrice) * 100).toFixed(2)}%`}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 bg-gold text-white rounded shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Advanced
          </button>
          <a
            href="https://www.usamortgage.com/mortgage-loan-originator/loran-trigger/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gold text-white rounded shadow"
          >
            Get a custom quote
          </a>
        </div>

        {/* Advanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-4xl rounded-lg p-6 relative overflow-y-auto max-h-[80vh]">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-center mb-4">
                Advanced Mortgage Calculator
              </h2>

              {/* Advanced Modal Content */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">
                    ${totalMonthlyPayment.toLocaleString()}/mo
                  </p>
                  <p className="text-sm text-gray-600">
                    {loanTerm}-Year Fixed, {interestRate}% APR
                  </p>
                </div>

                {/* Breakdown Bar */}
                <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="bg-red-500"
                    style={{
                      width: `${
                        (Number(principalAndInterest) / totalMonthlyPayment) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-yellow-400"
                    style={{
                      width: `${(propertyTax / totalMonthlyPayment) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${(homeInsurance / totalMonthlyPayment) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="bg-gray-400"
                    style={{
                      width: `${(hoaDues / totalMonthlyPayment) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* Breakdown Labels */}
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                    <p>Principal & Interest</p>
                    <p className="font-bold text-gray-900">
                      ${Number(principalAndInterest).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-1"></div>
                    <p>Property Tax</p>
                    <p className="font-bold text-gray-900">
                      ${propertyTax.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                    <p>Home Insurance</p>
                    <p className="font-bold text-gray-900">
                      ${homeInsurance.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mx-auto mb-1"></div>
                    <p>HOA Fees</p>
                    <p className="font-bold text-gray-900">
                      ${hoaDues.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Modal Content */}
              <div className="grid grid-cols-1 overflow-y-auto  gap-6">
                {/* Home Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-6">
                    Home Price
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min={50000}
                    max={2000000}
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
                    value={`$${homePrice.toLocaleString()}`}
                    readOnly
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Down Payment
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min={0}
                    max={homePrice}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
                    value={`$${downPayment.toLocaleString()}`}
                    readOnly
                  />
                </div>

                {/* HOA Dues */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    HOA Dues
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min={0}
                    max={1000}
                    value={hoaDues}
                    onChange={(e) => setHoaDues(Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
                    value={`$${hoaDues.toLocaleString()}/mo`}
                    readOnly
                  />
                </div>

                {/* Property Tax */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Property Tax
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min={0}
                    max={1000}
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
                    value={`$${propertyTax.toLocaleString()}/mo`}
                    readOnly
                  />
                </div>

                {/* Home Insurance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Home Insurance
                  </label>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min={0}
                    max={1000}
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-full mt-2 text-right bg-transparent border-none text-brown-500 text-lg"
                    value={`$${homeInsurance.toLocaleString()}/mo`}
                    readOnly
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Interest Rate
                  </label>
                  <input
                    type="number"
                    className="w-full mt-2 text-right bg-transparent border border-gray-300 p-2 rounded"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>

                {/* Loan Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Type
                  </label>
                  <select
                    className="w-full mt-2 text-right bg-transparent border border-gray-300 p-2 rounded"
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                  >
                    <option value="Conventional">Conventional</option>
                    <option value="FHA">FHA</option>
                    <option value="VA">VA</option>
                  </select>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loan Term
                  </label>
                  <select
                    className="w-full mt-2 text-right bg-transparent border border-gray-300 p-2 rounded"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  >
                    <option value={30}>30 Years</option>
                    <option value={15}>15 Years</option>
                  </select>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Credit Score
                  </label>
                  <select
                    className="w-full mt-2 text-right bg-transparent border border-gray-300 p-2 rounded"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                  >
                    <option value="740+">740+</option>
                    <option value="700-739">700-739</option>
                    <option value="660-699">660-699</option>
                    <option value="620-659">620-659</option>
                    <option value="580-619">580-619</option>
                  </select>
                </div>
              </div>

              {/* Add more Advanced Fields if needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
