const ShadeWaveLoader = ({
  label = "Loading...",
  cards = 3,
  compact = false,
}) => (
  <div className={compact ? "py-8" : "py-12"}>
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-14 items-end gap-1.5 overflow-hidden rounded-full bg-blue-50 px-5 py-3 shadow-inner">
        <div className="absolute inset-0 animate-[shadeSweep_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className="relative block w-2.5 rounded-full bg-blue-600 animate-[shadeWave_1.05s_ease-in-out_infinite]"
            style={{
              height: `${16 + (index % 3) * 8}px`,
              animationDelay: `${index * 0.09}s`,
            }}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
    </div>

    {cards > 0 && (
      <div className="mx-auto mt-8 grid max-w-6xl gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="relative h-36 overflow-hidden bg-gray-100">
              <div className="absolute inset-0 animate-[shadeSweep_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            </div>
            <div className="space-y-3 p-4">
              <div className="relative h-4 w-4/5 overflow-hidden rounded bg-gray-100">
                <div className="absolute inset-0 animate-[shadeSweep_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded bg-gray-100">
                <div className="absolute inset-0 animate-[shadeSweep_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              </div>
              <div className="relative h-3 w-2/3 overflow-hidden rounded bg-gray-100">
                <div className="absolute inset-0 animate-[shadeSweep_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <style>{`
      @keyframes shadeWave {
        0%, 100% {
          transform: scaleY(0.45);
          opacity: 0.45;
        }
        50% {
          transform: scaleY(1);
          opacity: 1;
        }
      }

      @keyframes shadeSweep {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  </div>
);

export default ShadeWaveLoader;
