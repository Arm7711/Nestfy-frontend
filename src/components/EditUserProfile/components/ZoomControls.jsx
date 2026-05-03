
function ZoomControls({ zoom, onZoomChange, onReset, minZoom = 1, maxZoom = 3 }) {
    const handleMinus = () => {
        onZoomChange(Math.max(minZoom, zoom - 0.1))
    }

    const handlePlus = () => {
        onZoomChange(Math.min(maxZoom, zoom + 0.1))
    }

    return (
        <div className="zoom-controls">
            <div className="zoom-controls__group">
                <button
                    className="zoom-controls__btn"
                    onClick={handleMinus}
                    aria-label="Zoom out"
                    disabled={zoom <= minZoom}
                >
                    −
                </button>
                <button
                    className="zoom-controls__btn"
                    onClick={handlePlus}
                    aria-label="Zoom in"
                    disabled={zoom >= maxZoom}
                >
                    +
                </button>
            </div>
            <div className="zoom-controls__divider" />
            <button className="zoom-controls__reset" onClick={onReset}>
                Reset
            </button>
        </div>
    )
}

export default ZoomControls