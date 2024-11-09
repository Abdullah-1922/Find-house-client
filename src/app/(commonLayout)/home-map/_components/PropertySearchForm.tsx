import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

type FormValues = {
  status: string;
  type: string;
  location: string;
  priceRange: [number, number];
  beds: number;
  baths: number;
  areaMin: number;
  areaMax: number;
};

const PropertySearchForm: React.FC = () => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    5000, 2000000,
  ]);

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      status: "any",
      type: "any",
      location: "americas",
      priceRange: [5000, 2000000],
      beds: 0,
      baths: 0,
      areaMin: 0,
      areaMax: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    console.log("Range value:", rangeValue);
  };

  return (
    <div className="bg-[#274ABB] px-6 py-7 rounded-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-white">
          Property Status
          <select
            {...register("status")}
            className="block w-full mt-2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
          >
            <option value="any">Any Status</option>
            <option value="for sell">For Sell</option>
            <option value="for rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </label>

        <label className="block text-white">
          Property Type
          <select
            {...register("type")}
            className="block w-full mt-2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
          >
            <option value="any">Any Type</option>
            <option value="family">Family House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </label>

        <label className="block text-white">
          Location
          <select
            {...register("location")}
            className="block w-full mt-2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
          >
            <option value="americas">Any Location</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="san-francisco">San Francisco</option>
          </select>
        </label>

        <label className="block text-white">
          Price
          <div className="flex space-x-2 border-none rounded items-center mt-2 text-black bg-white w-full h-[38px] px-3">
            <span>${rangeValue[0]}</span>
            <span>-</span>
            <span>${rangeValue[1]}</span>
          </div>
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <div className="mt-6">
                <Slider
                  min={5000}
                  max={2000000}
                  step={80}
                  value={rangeValue}
                  onValueChange={(value: [number, number]) => {
                    field.onChange(value);
                    setRangeValue(value);
                  }}
                  className="w-full bg-white rounded"
                />
              </div>
            )}
          />
        </label>

        <div className="flex items-center space-x-2">
          <div className="w-full">
            <label className="block text-white">
              Beds
              <select
                {...register("beds")}
                className="block w-full mt-2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
              >
                <option value={0}>Any</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4+</option>
              </select>
            </label>
          </div>
          <div className="w-full">
            <label className="block text-white">
              Baths
              <select
                {...register("baths")}
                className="block w-full mt-2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
              >
                <option value={0}>Any</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4+</option>
              </select>
            </label>
          </div>
        </div>

        <label className="block text-white">
          Area
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min Area"
              {...register("areaMin")}
              className="w-1/2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
            />
            <input
              type="number"
              placeholder="Max Area"
              {...register("areaMax")}
              className="w-1/2 h-[38px] px-3 bg-white text-gray-700 border-none outline-none rounded"
            />
          </div>
        </label>

        <button
          type="submit"
          className="w-full py-3 font-medium uppercase mt-4 bg-black text-white rounded hover:bg-white hover:text-black transition-colors"
        >
          Search Property
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
