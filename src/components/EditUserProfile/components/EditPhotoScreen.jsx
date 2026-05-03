import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import ZoomControls from './ZoomControls'

async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve(img))
        img.addEventListener('error', reject)
        img.src = imageSrc
    })

    const size = Math.min(pixelCrop.width, pixelCrop.height)
    const canvas = document.createElement('canvas')
    canvas.width  = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, size, size
    )

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
            resolve({
                previewUrl: URL.createObjectURL(blob),
                blob, 
            })
        }, 'image/jpeg', 0.92)
    })
}

/**
 * @param {string}   imageSrc
 * @param {function} onCancel
 * @param {function} onDone 
 */
function EditPhotoScreen({ imageSrc, onCancel, onDone }) {
    const [crop, setCrop]                   = useState({ x: 0, y: 0 })
    const [zoom, setZoom]                   = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [processing, setProcessing]       = useState(false)

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])

    const handleDone = async () => {
        if (!croppedAreaPixels) return
        setProcessing(true)
        try {
            const result = await getCroppedImg(imageSrc, croppedAreaPixels)
            onDone(result)
        } catch (e) {
            console.error('Crop failed:', e)
            onCancel()
        } finally {
            setProcessing(false)
        }
    }

    const handleReset = () => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
    }

    return (
        <div className="edit-screen">
            <div className="edit-screen__header">
                <button
                    className="edit-screen__text-btn"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Cancel
                </button>
                <span className="edit-screen__title">Edit photo</span>
                <button
                    className="edit-screen__text-btn edit-screen__text-btn--done"
                    onClick={handleDone}
                    disabled={processing}
                >
                    {processing ? '...' : 'Done'}
                </button>
            </div>

            <div className="edit-screen__crop-area">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        height: '100%',
                        containerStyle: { background: '#111' },
                        cropAreaStyle: {
                            border: '2px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.75)'
                        }
                    }}
                />
            </div>

            <div className="edit-screen__controls">
                <ZoomControls
                    zoom={zoom}
                    onZoomChange={setZoom}
                    onReset={handleReset}
                    minZoom={1}
                    maxZoom={3}
                />
            </div>
        </div>
    )
}

export default EditPhotoScreen