import { motion } from "motion/react";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import type { Ship } from "@/types/ships";
import { useState } from "react"

interface ComparisonViewProps {
  ships: Ship[];
}

function ComparisonView({ ships }: ComparisonViewProps) {

  const [showStats, setShowStats] = useState(false);

  const handleStatsClick = () => {
    if (showStats) {
      setShowStats(false);
    } else {
      setShowStats(true);
    }
  }

  const maxLengthInMeters = Math.max(...ships.map(p => p.length));
  const maxImageWidth = 800;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <Card>
        <div className="p-12 flex flex-col gap-y-4">
          <div className="flex self-end">
            <Button className="tracking-tighter" variant="bordered" color="primary" onPress={handleStatsClick}>View Length</Button>
          </div>
          {ships.map((ship) => (
            <>
              <span className="font-semibold tracking-tighter text-lg lg:text-4xl
               bg-gradient-to-r from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent leading-12 -mb-2">{ship.name}</span>
              <Card className="p-8 pb-2 brightness-90">
                <div className='brightness-0 dark:brightness-100 max-w-300'>

                  <Image
                    src={`/images/${ship.pngFileName}`}
                    width={`${(ship.length / maxLengthInMeters) * maxImageWidth}px`}
                  />
                  {showStats && (<div className="w-full md:w-1/2 text-lg lg:text-xl 
                  text-default-600 block max-w-full !w-full tracking-tighter text-center">
                    Length: {ship.length} meters ( {(ship.length * 3.281).toFixed(2)} feet )
                  </div>)}
                </div>
              </Card>
            </>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
export default ComparisonView;