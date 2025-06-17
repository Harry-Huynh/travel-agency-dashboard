/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { comboBoxItems, selectItems } from "@/constants";
import { world_map } from "@/constants/world_map";
import { cn, formatKey } from "@/lib/utils";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddTripForm = ({ user }: { user: UserData }) => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState<TripFormData>({
    country: (countries[0] as any)?.value || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flag,latlng,maps")
      .then((res) => res.json())
      .then((data) => {
        const countryData = data.map((country: any) => ({
          name: country.flag + " " + country.name.common,
          coordinates: country.latlng,
          value: country.name.common,
          openStreetMap: country.maps?.openStreetMaps,
        }));

        setCountries(countryData);
      });
  });

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        (countries.find((c: any) => c.value === formData.country) as any)
          ?.coordinates || [],
    },
  ];

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.duration ||
      !formData.groupType
    ) {
      setError("Please provide values for all fields");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }

    if (!user.accountId) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: formData.country,
          duration: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.accountId,
        }),
      });

      const result = await response.json();

      if (result?.id) {
        router.push(`/trips/${result.id}`);
      } else {
        console.error("Failed to generate a trip");
      }
    } catch (error) {
      console.error("Error generating trip", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="country">Country</label>

        <ComboBoxComponent
          id="country"
          dataSource={countries}
          fields={{ text: "name", value: "value" }}
          placeholder="Select a Country"
          className="combo-box"
          change={(e: { value: string | undefined }) => {
            if (e.value) {
              handleChange("country", e.value);
            }
          }}
          allowFiltering
          filtering={(e) => {
            const query = e.text.toLowerCase();

            e.updateData(
              countries.filter((country: any) =>
                country.name.toLowerCase().includes(query)
              )
            );
          }}
        />
      </div>

      <div>
        <label htmlFor="duration">Duration</label>

        <input
          id="duration"
          name="duration"
          type="number"
          min={0}
          placeholder="Enter a number of days"
          className="form-input placeholder:text-gray-100"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("duration", Number(e.target.value))
          }
        />
      </div>

      {selectItems.map((key) => (
        <div key={key}>
          <label htmlFor={key}>{formatKey(key)}</label>

          <ComboBoxComponent
            id={key}
            dataSource={comboBoxItems[key].map((item) => ({
              text: item,
              value: item,
            }))}
            fields={{ text: "text", value: "value" }}
            placeholder={`Select ${formatKey(key)}`}
            className="combo-box"
            change={(e: { value: string | undefined }) => {
              if (e.value) {
                handleChange(key, e.value);
              }
            }}
            allowFiltering
            filtering={(e) => {
              const query = e.text.toLowerCase();

              e.updateData(
                comboBoxItems[key]
                  .filter((item) => item.toLowerCase().includes(query))
                  .map((item) => ({ text: item, value: item }))
              );
            }}
          />
        </div>
      ))}

      <div>
        <label htmlFor="location">Location on the world map</label>
        <MapsComponent>
          <LayersDirective>
            <LayerDirective
              shapeData={world_map}
              dataSource={mapData}
              shapePropertyPath="name"
              shapeDataPath="country"
              shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
            />
          </LayersDirective>
        </MapsComponent>
      </div>

      <div className="bg-gray-200 h-px w-full" />

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <footer className="px-6 w-full">
        <ButtonComponent type="submit" className="button-class !h-12 !w-full">
          <Image
            src={`/icons/${loading ? "loader.svg" : "magic-star.svg"}`}
            alt="loader"
            width="20"
            height="20"
            className={cn({ "animate-spin": loading })}
          />

          <span className="p-16-semibold text-white">
            {loading ? "Generating ..." : "Generate Trip"}
          </span>
        </ButtonComponent>
      </footer>
    </form>
  );
};

export default AddTripForm;
