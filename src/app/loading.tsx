export default function Loading() {
  return (
    <div className="drift-loading">
      <div className="drift-stage">
        <div className="drift-mark">Driftspace</div>

        <div className="drift-bar-track">
          <div className="drift-bar-fill" />
        </div>

        <p className="drift-status">Loading your canvas</p>
      </div>

      <style>{`
        .drift-loading {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .drift-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 220px;
        }

        .drift-mark {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #18181b;
        }

        .drift-bar-track {
          width: 100%;
          height: 3px;
          border-radius: 999px;
          background: #efeff1;
          overflow: hidden;
        }

        .drift-bar-fill {
          height: 100%;
          width: 40%;
          border-radius: 999px;
          background: #18181b;
          animation: drift-bar 1.3s ease-in-out infinite;
        }

        .drift-status {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          font-size: 12px;
          color: #a1a1aa;
        }

        @keyframes drift-bar {
          0% { transform: translateX(-100%); width: 40%; }
          50% { width: 55%; }
          100% { transform: translateX(250%); width: 40%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .drift-bar-fill {
            animation: none;
            width: 60%;
          }
        }
      `}</style>
    </div>
  );
}
