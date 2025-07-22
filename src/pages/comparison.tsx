import { motion } from "motion/react";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import type { Ship } from "@/types/ships";

interface ComparisonViewProps {
  ships: Ship[];
}

function ComparisonView({ ships }: ComparisonViewProps) {

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <Card>
        <div className="p-12 flex flex-col gap-y-4">
          {ships.map((ship) => (
            <>
              <span className="font-semibold tracking-tighter text-lg lg:text-4xl ">{ship.name}</span>
              <div className='brightness-0 dark:brightness-100'>
                <Image
                  src={`/images/${ship.pngFileName}`}
                  width={`${(ship.length / Math.max(...ships.map(p => p.length))) * 90}%`}
                />
              </div>
            </>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
export default ComparisonView;