import React from "react";
import ComparisonView from "./comparison.tsx";
import { Button } from "@heroui/button"
import { Card } from "@heroui/card";
import { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { title, subtitle } from "@/components/primitives";
import type { Selection } from "@heroui/react"
import { Select, SelectItem } from "@heroui/select";
import type { Ship } from "@/types/ships";
import { ThemeSwitch } from "@/components/theme-switch";

export default function IndexPage() {

  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [showComparison, setShowComparison] = useState(false);

  const handleCompareClick = () => {
    setShowComparison(true);
  };

  const handleReturnClick = () => {
    setShowComparison(false);
  };

  useEffect(() => {
    async function fetchShips() {
      try {
        const response = await fetch('/data/ships.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Ship[] = await response.json();
        setShips(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShips();
  }, []);

  if (loading) return <p>Loading ships...</p>;
  if (error) return <p>Error: {error}</p>;
  if (ships.length === 0) return <p>No ships found.</p>;

  const maxLength = Math.max(...ships.map((s) => s.length));

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {!showComparison ? (
        <>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="inline-block max-w-xl text-center justify-center">
            <span className={title({ size: "lg" })}>⚓️ </span>
            <span className={title({ color: "blue", size: "lg" })}>Ship Comparator&nbsp;</span>
            <br />
            <div className={subtitle({ class: "mt-4" })}>
              A neat way to visualize ship sizes.
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
          >
            <ThemeSwitch />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
          >
            <Card>
              <span className="flex w-full flex-wrap md:flex-nowrap gap-4 p-4 justify-center">
                <Select
                  color="primary"
                  className="flex w-64"
                  isClearable={true}
                  label="Select a Ship"
                  selectedKeys={value}
                  selectionMode="multiple"
                  onSelectionChange={setValue}
                >
                  {
                    ships.map((ship) => (
                      <SelectItem
                        key={ship.id}
                      >{ship.name}</SelectItem>
                    ))
                  }
                </Select>
              </span>
            </Card>

            {value instanceof Set && value.size >= 2 && (
              <div className="flex justify-center mt-8">
                <Button
                  color="primary"
                  onPress={handleCompareClick}
                >Compare</Button>
              </div>
            )}
          </motion.div>
        </>
      ) : (

        <>
          <ComparisonView ships={
            ships.filter(ship => value instanceof Set && value.has(ship.id))
          } />

          <Button onPress={handleReturnClick}>Return</Button>
        </>
      )
      }
    </section>
  );
}
