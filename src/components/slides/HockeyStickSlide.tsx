import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Slide from "@/components/Slide";
import { Play, RotateCcw } from "lucide-react";

// Capacity curve: y = 15 + (0.00306 * x²)
// At 70% reduction → ~30 clients (2x baseline of 15)
const generateData = () => {
  const points = [];
  for (let x = 0; x <= 80; x += 2) {
    points.push({
      x,
      y: 15 + 0.00306 * x * x,
      capacityMultiplier: (15 + 0.00306 * x * x) / 15,
    });
  }
  return points;
};

const fullData = generateData();

const HockeyStickSlide = () => {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animatedData, setAnimatedData] = useState<typeof fullData>([]);
  const [showNuminaPoint, setShowNuminaPoint] = useState(false);
  const [showYAxisLine, setShowYAxisLine] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [clientCount, setClientCount] = useState(15);
  const [showClosing, setShowClosing] = useState(false);

  const resetAnimation = useCallback(() => {
    setPhase(0);
    setAnimatedData([]);
    setShowNuminaPoint(false);
    setShowYAxisLine(false);
    setShowMetrics(false);
    setClientCount(15);
    setShowClosing(false);
    setIsPlaying(false);
  }, []);

  const startAnimation = useCallback(() => {
    resetAnimation();
    setIsPlaying(true);
    setPhase(1);
  }, [resetAnimation]);

  const showClosingOverlay = useCallback(() => {
    if (phase === 5 && !showClosing) {
      setShowClosing(true);
    }
  }, [phase, showClosing]);

  useEffect(() => {
    if (!isPlaying) return;

    const timers: NodeJS.Timeout[] = [];

    if (phase === 1) {
      let dataIndex = 0;
      const drawInterval = setInterval(() => {
        if (dataIndex < fullData.length) {
          setAnimatedData(fullData.slice(0, dataIndex + 1));
          dataIndex++;
        } else {
          clearInterval(drawInterval);
          setPhase(2);
        }
      }, 50);
      timers.push(drawInterval as unknown as NodeJS.Timeout);
    }

    if (phase === 2) {
      timers.push(setTimeout(() => setPhase(3), 1500));
    }

    if (phase === 3) {
      timers.push(setTimeout(() => setShowNuminaPoint(true), 500));
      timers.push(setTimeout(() => setShowYAxisLine(true), 1000));
      timers.push(setTimeout(() => setShowMetrics(true), 1500));

      let count = 15;
      const countInterval = setInterval(() => {
        if (count < 30) {
          count++;
          setClientCount(count);
        } else {
          clearInterval(countInterval);
        }
      }, 50);
      timers.push(countInterval as unknown as NodeJS.Timeout);

      timers.push(setTimeout(() => setPhase(4), 2500));
    }

    if (phase === 4) {
      timers.push(setTimeout(() => {
        setIsPlaying(false);
        setPhase(5);
      }, 1200));
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [phase, isPlaying]);

  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        {/* Header with causal chain */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-2"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            The Capacity Equation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-left">
            Structure unlocks sustainable capacity growth
          </h2>
          {/* Causal chain */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="bg-card/60 border border-border/50 rounded px-2 py-1">Structure data</span>
            <span className="text-primary">→</span>
            <span className="bg-card/60 border border-border/50 rounded px-2 py-1">Lower variance</span>
            <span className="text-primary">→</span>
            <span className="bg-card/60 border border-border/50 rounded px-2 py-1">Higher capacity</span>
            <span className="text-primary">→</span>
            <span className="bg-primary/20 border border-primary/30 rounded px-2 py-1 text-foreground font-medium">Higher revenue per accountant</span>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-3">
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Play Animation</span>
          </button>
          {phase === 5 && !showClosing && (
            <button
              onClick={showClosingOverlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-colors animate-pulse"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Show Results</span>
            </button>
          )}
          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 hover:bg-card transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        {/* Chart */}
        <div className="flex-1 relative min-h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={animatedData}
              margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
            >
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{
                  value: "Variance Reduction (%)",
                  position: "bottom",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 16,
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))" }}
                domain={[0, 40]}
                label={{
                  value: "Clients",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 16,
                  dx: -10,
                }}
              />

              {/* Numina impact line */}
              {showNuminaPoint && (
                <ReferenceLine
                  x={70}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              )}

              {showYAxisLine && (
                <ReferenceLine
                  y={30}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              )}

              <Area
                type="monotone"
                dataKey="y"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={6}
                fill="hsl(38, 92%, 50%)"
                fillOpacity={0.2}
                isAnimationActive={false}
                dot={{ fill: "hsl(38, 92%, 50%)", strokeWidth: 0, r: 4 }}
                activeDot={{ fill: "hsl(38, 92%, 60%)", strokeWidth: 0, r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Numina Impact Callout */}
          <AnimatePresence>
            {showNuminaPoint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute right-[2%] top-[1%]"
              >
                <div className="bg-card/80 border-2 border-primary/30 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <div className="font-bold text-foreground text-lg">Numina Target</div>
                  <div className="text-2xl font-bold text-primary">70% Variance Reduction</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Metrics Panel */}
          <AnimatePresence>
            {showMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[10%] bottom-[calc(60%-3.5rem)] md:left-[10%]"
              >
                <div className="bg-card/80 border border-border rounded-xl p-4 backdrop-blur-sm space-y-3">
                  <div className="text-base font-medium text-muted-foreground mb-2">Before → After Numina</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground text-base">Sustainable clients</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">15</span>
                        <span className="text-primary">→</span>
                        <motion.span
                          key={clientCount}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-foreground font-bold"
                        >
                          {clientCount}
                        </motion.span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-base">Task variance</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">±12h</span>
                        <span className="text-primary">→</span>
                        <span className="text-foreground font-bold">±3.6h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-base">Exceptions/week</div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">18</span>
                        <span className="text-primary">→</span>
                        <span className="text-foreground font-bold">5</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-base">Capacity</div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                        className="text-2xl font-bold text-primary"
                      >
                        +100%
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground/70 pt-1 border-t border-border/30">
                    Revenue scales through throughput, not longer hours.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Closing overlay */}
          <AnimatePresence>
            {showClosing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-primary">70%</div>
                    <div className="text-muted-foreground">Variance Reduction</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-green-400">2.0×</div>
                    <div className="text-muted-foreground">Effective Capacity Multiplier</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <div className="text-4xl md:text-6xl font-bold text-blue-400">15 → 30</div>
                    <div className="text-muted-foreground">Sustainable Clients per Accountant</div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="pt-6"
                  >
                    <div className="text-2xl font-bold text-gradient mb-2">
                      More clients. Same hours
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-muted-foreground/60 text-xs mt-2"
        >
          At high utilization, small reductions in process variance unlock outsized capacity gains, a well-documented effect in queueing theory and operations research.
        </motion.div>

        {/* Hint */}
        {!isPlaying && animatedData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-muted-foreground text-sm mt-1"
          >
            Click "Play Animation" to see the capacity curve
          </motion.div>
        )}
      </div>
    </Slide>
  );
};

export default HockeyStickSlide;
